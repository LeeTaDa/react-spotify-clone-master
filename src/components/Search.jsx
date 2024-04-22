import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import { useState, useEffect } from "react";

const CLIENT_ID = "64122993727a452a9d65bfee1c3347f7";
const CLIENT_SECRET = "e005c808fa994305ba3c54020949e19a";


function App() {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [album, SetAlbum] = useState("");

    useEffect(() => {
        // API access token
        var authParameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET) // Replace CLIENT_ID và CLIENT_SECRET bằng thông tin xác thực của bạn
        },
        body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret='+ CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token', authParameters)
        .then(result => result.json())
        .then(data => setAccessToken(data.accessToken))
    }, [])

  // Search function
  async function Search() {
    console.log("Search for " + searchInput);

    // GET REQUEST ARTIST ID

    var artistParameters = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q='+ searchInput + '&type=artist' , artistParameters)
        .then(responese => responese.json())
        .then(data => { return data.artists.items[0].id })

    // GET ALL THE ALBUM FROM ARTIST ID
    var ablums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=ablum&market=US&limit=50')
        .then(response => response.json())
        .then(data => {
            SetAlbum(data.items);
        });
    // DISPLAY IT

}
  return (
    <div>
      <Container navBackground={navBackground}>
          <InputGroup>
          <FaSearch />
            <FormControl
                placeholder="Search For Artist"
                type="input"
                onKeyDown = {event => {
                    if (event.key === "Enter") {
                       Search();
                    }
                }}
                onChange={event => setSearchInput(event.target.value)}
            />
            <Button onClick={console.log("Clicked Button")}>
                Search
            </Button>
          <div className="avatar">
          <a href={userInfo?.userUrl}>
            <CgProfile />
            <span>{userInfo?.name}</span>
          </a>
        </div>
        </InputGroup>
      </Container>
      <Container>
        <Row className="mx-2 row row-cols-4">
          {ablums.map( (ablum, i) => {
            return (
                <Card>
                    <Card.Img src={album.images[0].url}/>
                    <Card.Body> 
                        <Card.Title>{album.name}</Card.Title>
                    </Card.Body>
                </Card>
            )
          })}
        </Row>
      </Container>
    </div>
    )
}

export default App;
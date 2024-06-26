import React from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import {InputGroup, FormControl, Button, Card, Row} from 'react-bootstrap';
import { useState, useEffect } from "react";

const CLIENT_ID = "64122993727a452a9d65bfee1c3347f7";
const CLIENT_SECRET = "e005c808fa994305ba3c54020949e19a";

export default function Navbar({ navBackground }) {
  const [{ userInfo }] = useStateProvider();
  const [searchInput, setSearchInput] = useState("");

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
      .then(data => console.log(data))
  }, [])
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
                        console.log("Pressed Enter");
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

        </Row>
          <Card.Img src="#"/>
          <Card.Body> 
            <Card.Title>album name</Card.Title>
          </Card.Body>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) =>
    navBackground ? "rgba(0,0,0,0.7)" : "none"};
  .search__bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;

import { useEffect, useState } from "react";
import React from "react";

import { getCurrentUser, getTrips, User } from "../Storage/LocalStorage";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Image,
  Row,
  Col,
  Container,
  Form,
} from "react-bootstrap";
import one from "../images/1.jpg";
import Header from "./MemberHeader";
import ImageGrid from "./ImageGrid";
import Navigation from "./Navigation";
import {
  removeFollower,
  saveFollower,
  getFollowing,
  getFollowers,
  getMembers,
} from "../Storage/LocalStorage";

export default function Members() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user === undefined) {
      navigate("/login"); // move to the login page
    }
  }, []);

  const handleFollowing = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const element = document.getElementById("userName") as HTMLInputElement;
    const userName = element ? element.value : "";
    const data = { userName: user ? user.userName : "", follower: userName };
    saveFollower(data);
    return undefined;
  };

  const members = getMembers(user ? user.userName : "");
  const listItems = members.map((member) => (
    <Col>
      <Card className="bg-dark" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{member.userName}</Card.Title>
          <Card.Text>
            <p>
              <strong>Name: </strong>
              {member.firstName} {member.lastName}
            </p>
            <p>
              <strong>Followers: {getFollowing(member.userName).length}</strong>
            </p>
            <p>
              <strong>Following: {getFollowers(member.userName).length}</strong>
            </p>
            <>
              <Form onSubmit={handleFollowing}>
                <input
                  type="hidden"
                  id="userName"
                  value={user ? user.userName : ""}
                />
                <Button variant="success" type="submit">
                  Follow
                </Button>
              </Form>
            </>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ));

  console.log(listItems);

  return (
    <div>
      <Navigation />
      <Header />
      <Container className="block">
        <Row>{listItems}</Row>
        <Row className="empty"></Row>
        <ImageGrid />
      </Container>
    </div>
  );
}

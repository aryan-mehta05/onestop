import { useEffect, useState } from "react";
import React from "react";

import { getCurrentUser, getTrips, User } from "../Storage/LocalStorage";
import { useNavigate } from "react-router-dom";
import { Card, Button, Image, Row, Col, Container } from "react-bootstrap";
import one from "../images/1.jpg";
import Header from "./MemberHeader";
import ImageGrid from "./ImageGrid";
import Navigation from "./Navigation";

export default function Profile() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const trips = getTrips(user ? user.userName : "");
  console.log("Trips:");
  console.log(trips);
  let i = 0;

  useEffect(() => {
    if (user === null || user === undefined) {
      navigate("/login"); // move to the login page
    }
  }, []);

  const listItems = trips.map((trip) => (
    <Col>
      <Card style={{ width: "18rem" }}>
        <Card.Body className="bg-dark">
          <Card.Title>{trip.name}</Card.Title>
          <Card.Text>
            <strong>Type: </strong>
            <p>{trip.type}</p>
            <strong>Duration: </strong>
            <p>{trip.duration} hours</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ));

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

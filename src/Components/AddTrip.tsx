import React, { useState } from "react";
import { Row, InputGroup, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  Trip,
  getCurrentUser,
  getTrips,
  saveTrip,
} from "../Storage/LocalStorage";
import ImageGrid from "./ImageGrid";
import Navigation from "./Navigation";
import Header from "./Header";
import MemberHeader from "./MemberHeader";

/** Default trip */
const defaultTrip = {
  name: "",
  type: "",
  duration: 0,
  userName: "",
};

export default function AddTrip() {
  const [trip, setTrip] = useState<Trip>(defaultTrip);
  const [message, setMessage] = useState<string>("");

  const user = getCurrentUser();
  const navigate = useNavigate();

  if (user === null || user === undefined) {
    navigate("/login"); // move to the login page
  }

  /** Validate inputs */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    trip.userName = user ? user.userName : "";

    // Save the New trip data to local storage
    saveTrip(trip);
    setTrip(defaultTrip);
    setMessage("Trip data has been successfully saved");
  };

  /** Read User attributes from the Input Form */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const value = event.target.value;
    setTrip({ ...trip, [id]: value });
  };

  function dateForPicker(
    tourDate: Date
  ): string | number | string[] | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <Navigation />
      <MemberHeader />

      <Row className="bg-light">
        <h2>Create New Tour</h2>
        <Form noValidate className="py-3 py-md-5" onSubmit={handleSubmit}>
          <Row>
            <Form.Group>
              <Form.Label>Tour name</Form.Label>
              <Form.Control
                required
                id="name"
                type="text"
                placeholder="Tour name"
                value={trip.name}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Tour type</Form.Label>
              <Form.Control
                required
                id="type"
                type="text"
                placeholder="Tour type"
                value={trip.type}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Duration</Form.Label>
              <Form.Control
                required
                id="duration"
                type="number"
                placeholder="1"
                value={trip.duration}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                readOnly={true}
                id="userName"
                type="text"
                value={user ? user.userName : ""}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>&nbsp;</Row>
          <Row>
            <Form.Group controlId="btnSubmit">
              <Button variant="success" type="submit" size="lg">
                Save Tour
              </Button>
              &nbsp;
            </Form.Group>
          </Row>
          <Row>
            <Form.Text id="passwordHelpBlock" muted>
              {message && <h5>{message}</h5>}
              <Button href="/profile" size="lg">
                View your Trips
              </Button>
            </Form.Text>
          </Row>
        </Form>
      </Row>
      <ImageGrid />
    </div>
  );
}

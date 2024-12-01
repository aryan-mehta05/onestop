import React, { useState } from "react";
import { Button, Container, InputGroup, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import {
  getExistingUser,
  LoginModel,
  setCurrentUser,
} from "../Storage/LocalStorage";
import ImageGrid from "./ImageGrid";
import Header from "./Header";
import Navigation from "./Navigation";

const defaultLogin = {
  userName: "",
  password: "",
};

export default function Login() {
  const [message, setMessage] = useState<string>();
  const [data, setData] = useState<LoginModel>(defaultLogin);

  const navigate = useNavigate();

  /** Read Login attributes from the Input Form */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const value = event.target.value;
    setData({ ...data, [id]: value });
  };

  /** Handle Form Submission */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (data.userName === "" || data.password == "") {
      setMessage("All fields are mandatory");
      return;
    }

    // Save the New User Registration to local storage
    const user = getExistingUser(data.userName, data.password);

    if (user === null || user == undefined) {
      setMessage("Login Failed - register to try again");
      return;
    }

    setCurrentUser(user);

    navigate("/profile"); // move to the profile page
  };

  return (
    <div>
      <Navigation />
      <Header />
      <Container className="block black">
        <Row className="bg-light">
          <h2>Login Form</h2>
          <Form noValidate className="py-3 py-md-5" onSubmit={handleSubmit}>
            <Row>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    id="userName"
                    type="text"
                    placeholder="Username"
                    value={data.userName}
                    onChange={handleInputChange}
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="password"
                  value={data.password}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid password.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>&nbsp;</Row>
            <Row>
              <Form.Group controlId="btnSubmit">
                <Button variant="success" type="submit" size="lg">
                  Login
                </Button>
                &nbsp;
                <Button href="/signup" size="lg">
                  Signup
                </Button>
              </Form.Group>
            </Row>
            <Row>
              <Form.Text id="passwordHelpBlock" muted>
                {message && <h5>{message}</h5>}
              </Form.Text>
            </Row>
          </Form>
        </Row>
        <Row className="empty"></Row>
        <ImageGrid />
      </Container>
    </div>
  );
}

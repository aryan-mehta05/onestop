import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { registerUser, isUserExist, User } from "../Storage/LocalStorage";
import { Container } from "react-bootstrap";
import Header from "./Header";
import ImageGrid from "./ImageGrid";
import Navigation from "./Navigation";

const defaultUser = {
  firstName: "",
  lastName: "",
  userName: "",
  password: "",
};

export default function Signup() {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState<User>(defaultUser);
  const [message, setMessage] = useState<string>("");

  /** Validate inputs */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      user.firstName === "" ||
      user.lastName === "" ||
      user.userName === "" ||
      user.password == ""
    ) {
      setMessage("All fields are mandatory");
      return;
    }

    // If username already exist, handle it
    if (isUserExist(user.userName)) {
      setMessage("This username is already taken");
      console.log("HERE");
      return;
    }

    // Save the New User Registration to local storage
    registerUser(user);
    setUser(defaultUser);
    setMessage("Registration is successful");
  };

  /** Read User attributes from the Input Form */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const value = event.target.value;
    setUser({ ...user, [id]: value });
  };

  return (
    <div>
      <Navigation />
      <Header />
      <Container className="block black">
        <Row className="bg-light">
          <h2>Registration Form</h2>
          <Form noValidate className="py-3 py-md-5" onSubmit={handleSubmit}>
            <Row>
              <Form.Group>
                <Form.Label className="name">First name</Form.Label>
                <Form.Control
                  required
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  value={user.firstName}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  value={user.lastName}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    id="userName"
                    type="text"
                    placeholder="Username"
                    value={user.userName}
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
                  value={user.password}
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
                  Signup
                </Button>
                &nbsp;
                <Button href="/login" size="lg">
                  Login
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

import { Navbar, Container, Nav, Button } from "react-bootstrap";
import {
  User,
  getCurrentUser,
  removeCurrentUser,
} from "../Storage/LocalStorage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [loggedIn, setLoggedIn] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const who = getCurrentUser();
    console.log("WHO: " + who);
    if (who === null || who === undefined) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    console.log("Inside Logout");
    removeCurrentUser();
    setLoggedIn(false);
    window.location.reload();
    navigate("/");
    return undefined;
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <strong>ONE STOP</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {loggedIn ? (
              <>
                <Button variant="success" href="/addtrip">
                  New Trip
                </Button>
                &nbsp;
                <Button variant="primary" href="/members">
                  Members
                </Button>
                &nbsp;
                <Button variant="info" href="/profile">
                  Profile
                </Button>
              </>
            ) : (
              ""
            )}
          </Nav>
          <Nav>
            {!loggedIn ? (
              <>
                <Button variant="success" href="/login">
                  Login
                </Button>
                &nbsp;
                <Button variant="warning" href="/signup">
                  Signup
                </Button>
              </>
            ) : (
              <>
                <Button variant="warning" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

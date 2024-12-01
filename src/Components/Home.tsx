import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

import { Stack, Table } from "react-bootstrap";
import Header from "./Header";
import ImageGrid from "./ImageGrid";
import Navigation from "./Navigation";

export default function Home() {
  return (
    <div>
      <Navigation />
      <Header />
      <Container className="block">
        <Container className="bg-dark py-3 py-md-5">
          <Row>
            <Col>
              <h6>Hey! Share Your Tips & Get Tips</h6>
              <Form>
                <Form.Group controlId="searchTextArea">
                  <Form.Label>Search</Form.Label>
                  <Form.Control as="textarea" rows={3} cols={50} />
                </Form.Group>
                <Table responsive>
                  <tbody>
                    <tr>
                      <td>
                        <Button variant="outline-primary" size="lg">
                          Festivals
                        </Button>
                      </td>
                      <td>
                        <Button variant="outline-secondary" size="lg">
                        Cultural Immersions
                        </Button>
                      </td>
                      <td>
                        <Button variant="outline-danger" size="lg">
                        Beach Town
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Form>
            </Col>
          </Row>
          <div id="wd-users"
className=" bg-dark text-4xl font-bold text-center mb-6">
   <h1>A World full of adventures awaits for you  </h1>
    <button className="bg-yellow-200 px-3 py-1 rounded-full text-center">Get Inspired</button>
</div>
<br/><br/>

<div id="wd-moments"
className="text-2xl font-bold mb-6">
   <h1> Moments by John </h1>

<button id="wd-signin"
   onClick={() => alert("Signin")}
   className="d-flex align-items-center flex-grow-1 text-decoration-none "
      type="button">
 Add
</button>
</div>
        </Container>
        <Row className="empty"></Row>
        <ImageGrid />
      </Container>
    </div>
  );
}

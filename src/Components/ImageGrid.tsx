import { Row, Container, Col, Image } from "react-bootstrap";
import one from "../images/1.jpg";
import two from "../images/2.jpg";
import three from "../images/3.jpg";
import four from "../images/4.jpg";
import five from "../images/5.jpg";
import six from "../images/6.jpg";

export default function ImageGrid() {
  return (
    <Container className="py-3 py-md-5">
      <Row>
        <Col xs={6} md={3}>
          <Image src={one} rounded />
        </Col>
        <Col xs={6} md={3}>
          <Image src={two} rounded />
        </Col>
        <Col xs={6} md={3}>
          <Image src={three} rounded />
        </Col>
        <Col xs={6} md={3}>
          <Image src={four} rounded />
        </Col>
      </Row>
    </Container>
  );
}

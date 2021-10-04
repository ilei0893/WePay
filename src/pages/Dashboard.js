import React, { Component } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

//img
import placeholder from "../assets/image-placeholder.jpg";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Card style={{padding:'10px'}}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={placeholder}
                      width="150px"
                      height="150px"
                      roundedCircle
                    />
                  </Col>
                  <Col>
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Row>test</Row>
              </Card>
            </Col>
            <Col>
              <Card>
                <Row>test</Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

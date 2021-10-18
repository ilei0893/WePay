import React, { Component } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
export default class AddEmployee extends Component {
  render() {
    return (
      <div>
        <Container>
          <Col md={{ span: 4, offset: 3 }}>
            <h1>Add a new employee</h1>
            <Button variant="primary" type="submit" href="/employment">
              Go Back
            </Button>
            <br />
            <br />
            <Form>
              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" placeholder="(xxx)-xxx-xxxx" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Container>
      </div>
    );
  }
}

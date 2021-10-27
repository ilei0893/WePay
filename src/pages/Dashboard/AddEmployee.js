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
              <Form.Group className="mb-3" controlId="formSSN">
                <Form.Label>SSN</Form.Label>
                <Form.Control type="text" placeholder="xxx xx xxxx" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="00 Smiths Place" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" placeholder="(xxx)-xxx-xxxx" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSalary">
                <Form.Label>Salary</Form.Label>
                <Form.Control type="text" placeholder="$50,000" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPosition">
                <Form.Label>Position</Form.Label>
                <Form.Control type="text" placeholder="$50,000" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formWorkState">
                <Form.Label>Work State</Form.Label>
                <Form.Control type="text" placeholder="NY" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLivingState">
                <Form.Label>Living State</Form.Label>
                <Form.Control type="text" placeholder="NY" />
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

import React, { Component } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";

export default class EmployeeEdit extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <h3>Modify Employee Information</h3>
        <Form>
          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              name="fullName"
              defaultValue={this.props.fullName}
              onChange={this.props.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              defaultValue={this.props.email}
              onChange={this.props.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="address"
              defaultValue={this.props.address}
              onChange={this.props.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              name="phoneNum"
              defaultValue={this.props.phoneNum}
              onChange={this.props.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmployeeType">
            <Form.Label>Employee Type</Form.Label>
            <Form.Select
              name="employeeType"
              onChange={this.props.handleChange}
              required
              defaultValue={this.props.employeeType}
            >
              <option value="FT">Full Time</option>
              <option value="PT">Part Time</option>
            </Form.Select>
          </Form.Group>
          {this.props.employeeType === "FT" ? 
          <Form.Group>
            <Form.Label>Salary</Form.Label>
            <Form.Control
              name="salary"
              onChange={this.props.handleChange}
            />
          </Form.Group>
          :
          <Form.Group>
            <Form.Label>Hourly Rate</Form.Label>
            <Form.Control
              name="hourlyRate"
              onChange={this.props.handleChange}
            />
          </Form.Group>}
          <Form.Group>
            <Form.Label>Position</Form.Label>
            <Form.Control
              name="position"
              defaultValue={this.props.position}
              onChange={this.props.handleChange}
            />
          </Form.Group>
          <br />
          <Button
            variant="primary"
            type="submit"
            onClick={this.props.handleEditSubmit}
          >
            Submit Changes
          </Button>
        </Form>
      </Container>
    );
  }
}

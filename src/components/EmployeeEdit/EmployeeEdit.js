import React, { Component } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";


export default class EmployeeEdit extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Container>
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
              <Form.Label>Salary</Form.Label>
              <Form.Control
                name="Salary"
                defaultValue={this.props.salary}
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
            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Control
                name="position"
                defaultValue={this.props.position}
                onChange={this.props.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Work State</Form.Label>
              <Form.Control
                name="workState"
                defaultValue={this.props.workState}
                onChange={this.props.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Living State</Form.Label>
              <Form.Control
                name="livingState"
                defaultValue={this.props.livingState}
                onChange={this.props.handleChange}
              />
            </Form.Group>
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

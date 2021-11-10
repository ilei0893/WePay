import React, { Component } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import './EmployeeSearch.css'

export default class EmployeeSearch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isFound === false && this.props.isSubmitted === false) {
      return (
        <div>
          <Container>
            <h1>Employee Search</h1>
            <Col>
              <Row>
                <Form>
                  <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      name="fullName"
                      type="text"
                      placeholder="John Smith"
                      onChange={this.props.handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Last 4 digits of SSN</Form.Label>
                    <Form.Control
                      name="SSN"
                      type="text"
                      placeholder="0000"
                      onChange={this.props.handleChange}
                      required
                    />
                  </Form.Group>
                  <br />
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.props.handleSubmit}
                  >
                    Submit
                  </Button>
                </Form>
              </Row>
            </Col>
          </Container>
        </div>
      );
    } else if (this.props.isFound === false && this.props.isSubmitted === true){
      return (
        <div>
          <Container>
            <h1>Employee Search</h1>
            <Col>
              <Row>
                <Form>
                  <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      name="fullName"
                      type="text"
                      placeholder="John Smith"
                      onChange={this.props.handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Last 4 digits of SSN</Form.Label>
                    <Form.Control
                      name="SSN"
                      type="text"
                      placeholder="0000"
                      onChange={this.props.handleChange}
                    />
                  </Form.Group>
                  <br />
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.props.handleSubmit}
                  >
                    Submit
                  </Button>
                </Form>
              </Row>
              <Row>EMPLOYEE NOT FOUND. Please make sure the information you submitted is correct.</Row>
            </Col>
          </Container>
        </div>
      );
    } else if (this.props.isFound && this.props.isSubmitted) {
      return (
        <div>
          <Container>
            <h1>Employee Search</h1>
            <Col>
              <Row>
                <Form>
                  <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      name="fullName"
                      type="text"
                      placeholder="John Smith"
                      onChange={this.props.handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Last 4 digits of SSN</Form.Label>
                    <Form.Control
                      name="SSN"
                      type="text"
                      placeholder="0000"
                      onChange={this.props.handleChange}
                    />
                  </Form.Group>
                  <br />
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.props.handleSubmit}
                  >
                    Submit
                  </Button>
                </Form>
              </Row>
              <Row className="employeeInformation">{this.props.data}</Row>
            </Col>
          </Container>
        </div>
      );

    }
  }
}

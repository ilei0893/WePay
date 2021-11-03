import React, { Component } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import axios from "axios";

export default class EmployeeSearch extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      SSN: "",
      data:[],
      isFound: false,
      isSubmitted: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //get input from form
  handleChange(event) {
    const target = event.target;
    const value = target.type === "radio" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  getResponse() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let data = {
      name: this.state.fullName,
      SSN: this.state.SSN,
    };

    return axios
      .post("http://localhost:3001/findemployee", data, config)
      .then((response) => {
        this.response = response;
        return this.response;
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    let employee = []
    this.getResponse().then((res) => {
      if (res.data.length === 0) { // if no data is found then return that employee is not found
        this.setState({
          isFound: false,
          isSubmitted: true,
        });
      } else if (res.data.length > 0) { //if data is found then return that data
        this.setState({
          isFound: true,
          isSubmitted: true,
        });
        employee.push(res.data)
        this.setState({
          data: employee
        })
      }
    });
  }

  render() {
    if (this.state.isFound === false && this.state.isSubmitted === false) {
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
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>SSN</Form.Label>
                    <Form.Control
                      name="SSN"
                      type="text"
                      placeholder="2344"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <br />
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </Button>
                </Form>
              </Row>
            </Col>
          </Container>
        </div>
      );
    } else if (
      this.state.isFound === false &&
      this.state.isSubmitted === true
    ) {
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
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>SSN</Form.Label>
                    <Form.Control
                      name="SSN"
                      type="text"
                      placeholder="2344"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <br />
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </Button>
                </Form>
              </Row>
              <Row>EMPLOYEE NOT FOUND</Row>
            </Col>
          </Container>
        </div>
      );
    } else if (this.state.isFound && this.state.isSubmitted) {
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
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>SSN</Form.Label>
                    <Form.Control
                      name="SSN"
                      type="text"
                      placeholder="2344"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <br />
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </Button>
                </Form>
              </Row>
              <Row>EMPLOYEE FOUND</Row>
            </Col>
          </Container>
        </div>
      );
    }
  }
}

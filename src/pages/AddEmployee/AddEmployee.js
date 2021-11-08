import React, { Component } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import axios from "axios";
export default class AddEmployee extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      SSN: "",
      phoneNum: "",
      address: "",
      salary: "",
      position: "",
      workState: "",
      livingState: "",
      PTO: "",
      Health_Insurance: "",
      Food_Stipend: "",
      Dental_Insurance: "",
      isSubmitted: false,
      validated: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "radio" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    let data = {
      name: this.state.firstName + " " + this.state.lastName,
      SSN: this.state.SSN,
      phoneNum: this.state.phoneNum,
      address: this.state.address,
      salary: this.state.salary,
      position: this.state.position,
      workState: this.state.workState,
      livingState: this.state.livingState,
      PTO: this.state.PTO,
      Health_Insurance: this.state.Health_Insurance,
      Food_Stipend: this.state.Food_Stipend,
      Dental_Insurance: this.state.Dental_Insurance,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("http://localhost:3001/addemployee", data, config)
      .then((response) => {
        console.log(response);
      });

    this.setState({
      validated: true,
      isSubmitted: true,
    });
  }

  render() {
    if (this.state.isSubmitted == false) {
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
              <Form
                validated={this.state.validated}
                onSubmit={this.handleSubmit}
              >
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    onChange={this.handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please input a name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSSN">
                  <Form.Label>SSN</Form.Label>
                  <Form.Control
                    name="SSN"
                    type="text"
                    placeholder="xxx-xx-xxxx"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="address"
                    type="text"
                    placeholder="00 Smiths Place"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    name="phoneNum"
                    type="tel"
                    placeholder="(xxx)-xxx-xxxx"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSalary">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    name="salary "
                    type="text"
                    placeholder="$50,000"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPosition">
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    name="position"
                    type="text"
                    placeholder="Manager"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formWorkState">
                  <Form.Label>Work State</Form.Label>
                  <Form.Control
                    name="workState"
                    type="text"
                    placeholder="NY"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLivingState">
                  <Form.Label>Living State</Form.Label>
                  <Form.Control
                    name="livingState"
                    type="text"
                    placeholder="NY"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <h4>Benefits</h4>
                <Form.Group className="mb-3" controlId="formLivingState">
                  <Form.Label>PTO</Form.Label>
                  <Form.Control
                    name="PTO"
                    type="text"
                    placeholder="0"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLivingState">
                  <Form.Label>Health Insurance</Form.Label>
                  <Form.Control
                    name="Health_Insurance"
                    type="text"
                    placeholder="$0"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLivingState">
                  <Form.Label>Food Stipend</Form.Label>
                  <Form.Control
                    name="Food_Stipend"
                    type="text"
                    placeholder="$0"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLivingState">
                  <Form.Label>Dental Insurance</Form.Label>
                  <Form.Control
                    name="Dental_Insurance"
                    type="text"
                    placeholder="$0"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Container>
        </div>
      );
    } else {
      return (
        <Container>
          <Col>
            <h1> Employee Added </h1>
            <p>Please go back</p>
            <Button variant="primary" type="submit" href="/employment">
              Go Back
            </Button>
            <Button variant="primary" type="submit" href="/add-employee">
              Add New Employee
            </Button>
          </Col>
        </Container>
      );
    }
  }
}

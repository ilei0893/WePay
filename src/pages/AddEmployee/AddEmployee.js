import React, { Component } from "react";
import {
  Form,
  InputGroup,
  Button,
  Container,
  Col as Col,
  Row,
} from "react-bootstrap";
import axios from "axios";
export default class AddEmployee extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      SSN: "",
      email: "",
      phoneNum: "",
      address: "",
      city: "",
      state: "NY",
      zip: "",
      salary: "0",
      employeeType: "FT",
      hourlyRate: "0",
      hoursWorked: 0,
      position: "",
      workState: "NY",
      livingState: "NY",
      PTO: "",
      HealthInsurance: false,
      FoodStipend: "",
      DentalInsurance: "",
      isSubmitted: false,
      validated: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    //refs
    this.ptoInput = React.createRef();
    this.healthInsuranceInput = React.createRef();
    this.foodStipendInput = React.createRef();
    this.dentalInsuranceInput = React.createRef();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
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
      email: this.state.email,
      SSN: this.state.SSN,
      phoneNum: this.state.phoneNum,
      address:
        this.state.address +
        " " +
        this.state.city +
        ", " +
        this.state.state +
        " " +
        this.state.zip,
      salary: this.state.salary,
      employeeType: this.state.employeeType,
      hourlyRate: this.state.hourlyRate,
      hoursWorked: this.state.hoursWorked,
      position: this.state.position,
      workState: this.state.workState,
      livingState: this.state.livingState,
      PTO: this.ptoInput.current.value,
      Health_Insurance: this.healthInsuranceInput.current.value,
      Food_Stipend: this.foodStipendInput.current.value,
      Dental_Insurance: this.dentalInsuranceInput.current.value,
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
    let benefits;
    if (this.state.employeeType === "FT") {
      benefits = (
        <div>
          <Form.Group className="mb-3" controlId="formPTO">
            <Form.Label>PTO</Form.Label>
            <Form.Control
              name="PTO"
              type="text"
              value="240"
              ref={this.ptoInput}
              required
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formHealthInsurance">
            <Form.Label>Health Insurance ($100)</Form.Label>
            <Form.Control
              name="Health_Insurance"
              type="text"
              value={this.state.HealthInsurance ? "100" : "0"}
              ref={this.healthInsuranceInput}
              required
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formFoodStipend">
            <Form.Label>Food Stipend ($50)</Form.Label>
            <Form.Control
              name="Food_Stipend"
              type="text"
              value={this.state.FoodStipend ? "50" : "0"}
              ref={this.foodStipendInput}
              required
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDentalInsurance">
            <Form.Label>Dental Insurance ($15)</Form.Label>
            <Form.Control
              name="Dental_Insurance"
              type="text"
              value={this.state.DentalInsurance ? "15" : "0"}
              ref={this.dentalInsuranceInput}
              required
              disabled
            />
          </Form.Group>
          New Full-Time Employees are eligible for the following benefits:
          <Form.Check
            name="HealthInsurance"
            type="checkbox"
            label="Health Insurance"
            onChange={this.handleChange}
          />
          <Form.Check
            name="FoodStipend"
            type="checkbox"
            label="Food Stipend"
            onChange={this.handleChange}
          />
          <Form.Check
            name="DentalInsurance"
            type="checkbox"
            label="Dental Insurance"
            onChange={this.handleChange}
          />
        </div>
      );
    } else {
      benefits = <div>
                  <Form.Group className="mb-3" controlId="formPTO">
            <Form.Label>PTO</Form.Label>
            <Form.Control
              name="PTO"
              type="text"
              value="240"
              ref={this.ptoInput}
              required
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formHealthInsurance">
            <Form.Label>Health Insurance ($100)</Form.Label>
            <Form.Control
              name="Health_Insurance"
              type="text"
              value={this.state.HealthInsurance ? "100" : "0"}
              ref={this.healthInsuranceInput}
              required
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formFoodStipend">
            <Form.Label>Food Stipend ($50)</Form.Label>
            <Form.Control
              name="Food_Stipend"
              type="text"
              value={"0"}
              ref={this.foodStipendInput}
              required
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDentalInsurance">
            <Form.Label>Dental Insurance ($15)</Form.Label>
            <Form.Control
              name="Dental_Insurance"
              type="text"
              value={ "0"}
              ref={this.dentalInsuranceInput}
              required
              disabled
            />
          </Form.Group>
          New Part-Time Employees are eligible for the following benefits:
          <Form.Check
            name="HealthInsurance"
            type="checkbox"
            label="Health Insurance"
            onChange={this.handleChange}
          />
          <Form.Check
            name="FoodStipend"
            type="checkbox"
            label="Food Stipend"
            onChange={this.handleChange}
            disabled
            checked={false}
          />
          <Form.Check
            name="DentalInsurance"
            type="checkbox"
            label="Dental Insurance"
            onChange={this.handleChange}
            disabled
            checked={false}
          />
      </div>;
    }

    if (this.state.isSubmitted == false) {
      return (
        <div>
          <Container>
            <Col md={{ span: 8, offset: 2 }}>
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
                <Row>
                  <Col>
                    <h4>Personal Information</h4>
                    <Form.Group className="mb-3" controlId="formFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        pattern="[a-zA-Z]+"
                        onChange={this.handleChange}
                        required
                      />
                      <Form.Text className="text-muted">
                        Symbols and numbers are not allowed
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        pattern="[a-zA-Z]+"
                        onChange={this.handleChange}
                        required
                      />
                      <Form.Text className="text-muted">
                        Symbols and numbers are not allowed
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formSSN">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        name="email"
                        type="text"
                        placeholder="email@gmail.com"
                        pattern=".+@gmail\.com"
                        onChange={this.handleChange}
                        required
                      />
                      <Form.Text className="text-muted">
                        Must include @gmail.com
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formSSN">
                      <Form.Label>SSN</Form.Label>
                      <Form.Control
                        name="SSN"
                        type="text"
                        placeholder="xxx-xx-xxxx"
                        pattern="(^\d{3}-?\d{2}-?\d{4}$)"
                        onChange={this.handleChange}
                        required
                      />
                      <Form.Text className="text-muted">
                        Must be in XXX-XX-XXX Format
                      </Form.Text>
                    </Form.Group>
                    <Row>
                      <Form.Group className="mb-3" controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          name="address"
                          type="text"
                          placeholder="00 Smiths Place"
                          pattern="^[#.0-9a-zA-Z\s,-]+$"
                          onChange={this.handleChange}
                          required
                        />
                        <Form.Text className="text-muted">
                          Some symbols are not allowed
                        </Form.Text>
                      </Form.Group>
                      <Col>
                        <Form.Group className="mb-3" controlId="formAddress">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            name="city"
                            type="text"
                            placeholder="Staten Island"
                            pattern="^[a-zA-Z\s-]+$"
                            onChange={this.handleChange}
                            required
                          />
                        </Form.Group>
                        <Form.Text className="text-muted">
                          Symbols and numbers not allowed
                        </Form.Text>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId="formAddress">
                          <Form.Label>State</Form.Label>
                          <Form.Control
                            name="state"
                            type="text"
                            defaultValue="NY"
                            onChange={this.handleChange}
                            required
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId="formAddress">
                          <Form.Label>Zip Code</Form.Label>
                          <Form.Control
                            name="zip"
                            type="text"
                            placeholder="00000"
                            pattern="[0-9]{5}"
                            onChange={this.handleChange}
                            required
                          />
                          <Form.Text className="text-muted">
                            Format of the zip code should be 00000
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="formPhoneNumber">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        name="phoneNum"
                        type="tel"
                        placeholder="xxx-xxx-xxxx"
                        onChange={this.handleChange}
                        pattern="^[#.0-9a-zA-Z\s,-]+$"
                        required
                      />
                      <Form.Text className="text-muted">
                        Must be a US phone number
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmployeeType">
                      <Form.Label>Employee Type</Form.Label>
                      <Form.Select
                        name="employeeType"
                        aria-label="Default select example"
                        onChange={this.handleChange}
                        required
                        defaultValue="FT"
                      >
                        <option value="FT">Full Time</option>
                        <option value="PT">Part Time</option>
                      </Form.Select>
                    </Form.Group>
                    {this.state.employeeType === "FT" ? 
                    <Form.Group className="mb-3" controlId="formSalary">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control
                      name="salary"
                      placeholder="50000"
                      pattern="[0-9]+"
                      onChange={this.handleChange}
                      required
                    />
                    <Form.Text className="text-muted">
                      Symbols and words are not allowed
                    </Form.Text>
                  </Form.Group>
                  :
                  <Form.Group className="mb-3" controlId="formHourlyRate">
                  <Form.Label>Hourly Rate</Form.Label>
                  <Form.Control
                    name="hourlyRate"
                    placeholder="25"
                    pattern="[0-9]+"
                    onChange={this.handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Symbols and words are not allowed
                  </Form.Text>
                </Form.Group>
    }
                    <Form.Group className="mb-3" controlId="formPosition">
                      <Form.Label>Position</Form.Label>
                      <Form.Control
                        name="position"
                        type="text"
                        placeholder="Manager"
                        pattern="[a-zA-Z]+"
                        onChange={this.handleChange}
                        required
                      />
                      <Form.Text className="text-muted">
                        Symbols and numbers are not allowed
                      </Form.Text>
                    </Form.Group>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3" controlId="formWorkState">
                          <Form.Label>Work State</Form.Label>
                          <Form.Select
                            name="workState"
                            aria-label="Default select example"
                            onChange={this.handleChange}
                            required
                          >
                            <option value="NY">NY</option>
                            <option value="NJ">NJ</option>
                            <option value="CT">CT</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group
                          className="mb-3"
                          controlId="formLivingState"
                        >
                          <Form.Label>Living State</Form.Label>
                          <Form.Control
                            name="livingState"
                            type="text"
                            defaultValue="NY"
                            onChange={this.handleChange}
                            required
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <h4>Benefits</h4>
                    {benefits}
                    <br />
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Col>
                </Row>
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

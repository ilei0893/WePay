import React, { Component } from "react";
import { Container, Row, Col, Card, Image, Table } from "react-bootstrap";
import Calendar from "react-calendar";

//API CALLS
import axios from "axios";
import * as response from "../../scripts/getResponse";

//css
import "./Dashboard.css";
import "react-calendar/dist/Calendar.css";

//DUMMY DATA
const USER = {
  name: "John Doe",
  image:
    "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
  position: "Salesman",
  company: "Chase",
  SSN: "0987",
};

export default class EmployeeDashboard extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      address: "",
      salary: "",
      workState: "",
      livingState: "",
      phoneNum: "",
      position: "",
      email: "",
      SSN: "",
      PTO: "",
      Health_Insurance: "",
      Food_Stipend: "",
      Dental_Insurance: "",
      PayrollData: [],
    };
  }

  componentDidMount() {
    //GET EMPLOYEE INFO
    response.getEmployee(USER.name, USER.SSN).then((res) => {
      console.log(res);
      res.data.map((list) => {
        this.setState({
          fullName: list.Name,
          address: list.Address,
          salary: list.Salary,
          workState: list.WorkState,
          livingState: list.LivingState,
          phoneNum: list.Phone_Number,
          email: list.Email,
          position: list.Position,
          SSN: list.SSN,
        });
      });
    });

    //GET PAYROLLS
    response.getEmployeePaychecks(USER.name).then((res) => {
      this.setState({
        PayrollData: res.data,
      });
      console.log(this.state.PayrollData);
    });

    //GET BENEFITS
    response.getBenefits(USER.name).then((res) => {
      res.data.map((list) => {
        this.setState({
          PTO: list.PTO,
          Health_Insurance: list.Health_Insurance,
          Food_Stipend: list.Food_Stipend,
          Dental_Insurance: list.Dental_Insurance,
        });
      });
    });
  }

  render() {
    return (
      <div>
        <Container>
          <h2 className="text-center">Overview</h2>
          <Row>
            <Col>
              <Card style={{ padding: "10px" }}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={USER.image}
                      width="150px"
                      height="150px"
                      roundedCircle
                    />
                  </Col>
                  <Col>
                    <Card.Body style={{ marginLeft: 30 }}>
                      <Card.Title>Welcome, {this.state.fullName}!</Card.Title>
                      <Card.Text>
                        Position: {this.state.position} <br />
                        Salary: ${this.state.salary} <br />
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <Card>
                <Card.Body>
                  <Card.Title>Personal Information</Card.Title>
                  Email: {this.state.email} <br />
                  Address: {this.state.address} Hours <br />
                  WorkState: {this.state.workState} <br />
                  Living State: {this.state.livingState} <br />
                  Phone Number: {this.state.phoneNum} <br />
                  Last 4 Digits of SSN:{" "}
                  {this.state.SSN.substring(this.state.SSN.length - 4)}
                </Card.Body>
              </Card>
              <Card style={{ marginTop: "10px" }}>
                <Card.Body>
                  <Card.Title>PTO And Benefits</Card.Title>
                  PTO: {this.state.PTO} Hours <br />
                  Health Insurance: ${this.state.Health_Insurance} <br />
                  Food Stipend: ${this.state.Food_Stipend} <br />
                  Dental Insurance: ${this.state.Dental_Insurance} <br />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Calendar onChange={this.onChange} value={this.state.date} />
            </Col>
          </Row>
          <Row>
            <Card>
              <Card.Body>
                <Card.Title>Paycheck History</Card.Title>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Paycheck Date</th>
                      <th>Gross Pay</th>
                      <th>Total Taxes</th>
                      <th>Total Benefits</th>
                      <th>NetPay</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.PayrollData.map((list) => (
                    <tr>
                      <td>{list.Name}</td>
                      <td>{list.PaycheckDate.slice(0, 19).replace('T', ' ')}</td>
                      <td>{list.GrossPay}</td>
                      <td>{list.Taxes}</td>
                      <td>{list.Benefits}</td>
                      <td>{list.Total}</td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </div>
    );
  }
}

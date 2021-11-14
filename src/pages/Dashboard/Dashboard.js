import React, { Component } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import Calendar from "react-calendar";
import {EmployeeTable } from '../../components'
import axios from "axios";
//css
import "./Dashboard.css";
import 'react-calendar/dist/Calendar.css';

//DUMMY DATA
const USER = {
  id: "u1",
  name: "Giselle Domingo",
  image:
    "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
  status: "hr",
  position: "HR",
  company: "Chase",
};
export default class Dashboard extends Component {
  state = {
    totalEmployees: 0,
    totalNeedsReviewed: 0,
    date: new Date(),
  };
  
  componentDidMount(){
    axios.get("http://localhost:3001/getemployeecount").then(response => {
      let num = response.data[0].TOTAL
      this.setState({
        totalEmployees: num
      })
    })
    ///totalneedsreviewed

    axios.get("http://localhost:3001/totalneedsreviewed").then(response => {
      let num = response.data[0].TOTAL_STATUS
      this.setState({
        totalNeedsReviewed: num
      })
    })
  }

  onChange = (date) => this.setState({ date });

  render() {
    if (USER.status === "hr") {
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
                        <Card.Title>Welcome, {USER.name}!</Card.Title>
                        <Card.Text>Position: {USER.position}</Card.Text>
                        <Card.Text>Company: {USER.company}</Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="empty-box1 text-center mx-auto">
                  Total Employees 
                  <div className="text-center">
                    <h4>{this.state.totalEmployees}</h4>
                  </div>
                </div>
                <div className="empty-box1 text-center mx-auto">
                  Needs Approval
                  <div className="text-center">
                    <h4>{this.state.totalNeedsReviewed}</h4>
                  </div>
                  <div className="empty-box2 mx-auto">
                  <Calendar onChange={this.onChange} value={this.state.date} />
                </div>
                </div>
              </Col>
              <Col xs={8}>
              <EmployeeTable />
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      return (
        <div>
          <Container>
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
                      <Card.Body>
                        <Card.Title>{USER.name}</Card.Title>
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
}

import React, { Component } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import Calendar from "react-calendar";
//css
import "./Dashboard.css";
import 'react-calendar/dist/Calendar.css';
//img
import placeholder from "../../assets/image-placeholder.jpg";
//DUMMY DATA
const USER = {
  id: "u1",
  name: "Chris Artrip",
  image:
    "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
  status: "hr",
  position: "Manager",
  company: "Chase",
};
export default class Dashboard extends Component {
  state = {
    date: new Date(),
  };

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
                        <Card.Title>{USER.name}</Card.Title>
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
              {/* Added static values for Applications and Needs Approval, for now */}
                <div className="empty-box1 text-center mx-auto">
                  Applications: 
                  <div className="text-center">
                    <h4>10</h4>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="empty-box1 text-center mx-auto">
                  Needs Approval: 10
                  <div className="text-center">
                    <h4>10</h4>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="empty-box2 mx-auto">
                  <Calendar onChange={this.onChange} value={this.state.date} />
                </div>
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

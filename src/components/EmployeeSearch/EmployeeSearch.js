import React, { Component } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import "./EmployeeSearch.css";

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
                <Form
                  validated={this.props.validated}
                  onSubmit={this.props.handleSubmit}
                >
                  <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      name="fullName"
                      type="text"
                      placeholder="John Smith"
                      pattern="^[a-zA-Z\s-]+$"
                      onChange={this.props.handleChange}
                      required
                    />
                    <Form.Text className="text-muted">
                      Symbols and numbers are not allowed
                    </Form.Text>
                  </Form.Group> <br />
                  <Form.Group>
                    <Form.Label>Last 4 digits of SSN</Form.Label>
                    <Form.Control
                      name="SSN"
                      type="text"
                      placeholder="0000"
                      pattern="[0-9]{4}"
                      onChange={this.props.handleChange}
                      required
                    />
                    <Form.Text className="text-muted">
                      Please input the last 4 digits, numbers only
                    </Form.Text>
                  </Form.Group>
                  <br />
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Row>
            </Col>
          </Container>
        </div>
      );
    } else if (
      this.props.isFound === false &&
      this.props.isSubmitted === true
    ) {
      return (
        <div>
          <Container>
            <h1>Employee Search</h1>
            <Col>
              <Row>
              <Form
                  validated={this.props.validated}
                  onSubmit={this.props.handleSubmit}
                >
                  <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      name="fullName"
                      type="text"
                      placeholder="John Smith"
                      pattern="^[a-zA-Z\s-]+$"
                      onChange={this.props.handleChange}
                      required
                    />
                    <Form.Text className="text-muted">
                      Symbols and numbers are not allowed
                    </Form.Text>
                  </Form.Group> <br />
                  <Form.Group>
                    <Form.Label>Last 4 digits of SSN</Form.Label>
                    <Form.Control
                      name="SSN"
                      type="text"
                      placeholder="0000"
                      pattern="[0-9]{4}"
                      onChange={this.props.handleChange}
                      required
                    />
                    <Form.Text className="text-muted">
                      Please input the last 4 digits, numbers only
                    </Form.Text>
                  </Form.Group>
                  <br />
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Row>
              <Row>
                EMPLOYEE NOT FOUND. Please make sure the information you
                submitted is correct.
              </Row>
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
              <Form
                  validated={this.props.validated}
                  onSubmit={this.props.handleSubmit}
                >
                  <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      name="fullName"
                      type="text"
                      placeholder="John Smith"
                      pattern="^[a-zA-Z\s-]+$"
                      onChange={this.props.handleChange}
                      required
                    />
                    <Form.Text className="text-muted">
                      Symbols and numbers are not allowed
                    </Form.Text>
                  </Form.Group> <br />
                  <Form.Group>
                    <Form.Label>Last 4 digits of SSN</Form.Label>
                    <Form.Control
                      name="SSN"
                      type="text"
                      placeholder="0000"
                      pattern="[0-9]{4}"
                      onChange={this.props.handleChange}
                      required
                    />
                    <Form.Text className="text-muted">
                      Please input the last 4 digits, numbers only
                    </Form.Text>
                  </Form.Group>
                  <br />
                  <Button variant="primary" type="submit">
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

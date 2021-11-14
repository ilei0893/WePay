import React, { Component } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import axios from "axios";

export default class MarkPastEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reason: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //get input from employee search form
  handleChange(event) {
    const target = event.target;
    const value = target.type === "radio" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    console.log(this.state.reason);
    console.log(this.props.fullName);

    let data = {
      name: this.props.fullName,
      phoneNum: this.props.phoneNum,
      salary: this.props.salary,
      position: this.props.position,
      reasonofleaving: this.state.reason,
      workState: 'ny',
      email: 'email@gmail.com'
    };

    let data2 = {
        name: this.props.fullName,
      };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("http://localhost:3001/insertpastemployees", data, config)
      .then((response) => {
          console.log("past employee inserted!!")
      });

      axios.post("http://localhost:3001/deleteemployee", data2, config).then(response => {
          console.log(response)
      })
  }
  render() {
    return (
      <Container>
        <h3>Marking Employee as Past Employee</h3>
        <Form>
          <Form.Group>
            <Form.Label>Reason for Leaving</Form.Label>
            <Form.Control name="reason" onChange={this.handleChange} />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Submit Changes
          </Button>
        </Form>
      </Container>
    );
  }
}

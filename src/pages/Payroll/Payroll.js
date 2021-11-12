import React, { Component } from "react";
import { Container, Row, Col, Card, Image, Table } from "react-bootstrap";
import Calendar from "react-calendar";
import PayrollList from "../Payroll/PayrollList";
import axios from "axios";
import * as response from "../../scripts/getResponse"
//css
import "./Payroll.css";
import "react-calendar/dist/Calendar.css";
export default class Payroll extends Component {
  constructor(){
    super();
    this.state = {
      USERS: []
    }
  }

  componentDidMount(){
    response.getEmployees().then(response => {
      this.setState({
        USERS: response
      })
    })
  }
  
  render(props) {
    return (
      <PayrollList items={this.state.USERS} />
    );
  }
}

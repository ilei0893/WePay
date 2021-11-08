import React, { Component } from "react";
import { Card, Image, Table, Button } from "react-bootstrap";
import axios from "axios";
import placeholder from "../../assets/image-placeholder.jpg";

export default class EmployeeTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pastdata:[],
      loading: true,
      isEveryEmployee: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.getEmployees();
    this.getPastEmployees();
  }

  getEmployees() {
    let group = [];
    //GET REQUEST EMPLOYEES FROM EMPLOYEE TABLE
    axios.get("http://localhost:3001/employees").then((response) => {
      response.data.map((list) => {
        group.push(
          <tr>
            <td align="center">
              <Image
                src={placeholder}
                width="50px"
                height="50px"
                roundedCircle
              />
            </td>
            <td>{list.Name}</td>
            <td>{list.Position}</td>
            <td>{list.Address}</td>
            <td>{list.Phone_Number}</td>
          </tr>
        );
        //flip array so we can show a descending order
        let temp = [];
        for (let i = group.length - 1; i >= 0; i--) {
          temp.push(group[i]);
        }
        this.setState({
          data: temp,
        });
      });

      console.log(this.state.data);
    });
  }

  getPastEmployees() {
    let group = [];
    //GET REQUEST EMPLOYEES FROM EMPLOYEE TABLE
    axios.get("http://localhost:3001/pastemployees").then((response) => {
      response.data.map((list) => {
        group.push(
          <tr>
            <td align="center">
              <Image
                src={placeholder}
                width="50px"
                height="50px"
                roundedCircle
              />
            </td>
            <td>{list.Name}</td>
            <td>{list.Position}</td>
            <td>{list.ReasonOfLeaving}</td>
          </tr>
        );
        //flip array so we can show a descending order
        let temp = [];
        for (let i = group.length - 1; i >= 0; i--) {
          temp.push(group[i]);
        }
        this.setState({
          pastdata: temp,
        });
      });

      console.log(this.state.pastdata);
    });
  }

  handleClick() {
    this.setState({ isEveryEmployee: !this.state.isEveryEmployee });
    if (this.state.isEveryEmployee === false) {
      this.getPastEmployees();
    } else {
      this.getEmployees();
    }
  }

  render() {
    if (this.state.isEveryEmployee === true) {
      return (
        <>
          <Button onClick={this.handleClick}>Past Employees</Button>
          <Card>
            <Table hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>{this.state.data}</tbody>
            </Table>
          </Card>
        </>
      );
    } else {
      return(
        <>
        <Button onClick={this.handleClick}>Current Employees</Button>
        <Card>
          <Table hover>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Position</th>
                <th>ReasonOfLeaving</th>
              </tr>
            </thead>
            <tbody>{this.state.pastdata}</tbody>
          </Table>
        </Card>
      </>
      )
    }
  }
}

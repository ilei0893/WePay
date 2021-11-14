import React, { Component } from "react";
import { Card, Image, Table, Container, Form } from "react-bootstrap";
import axios from "axios";
import placeholder from "../../assets/image-placeholder.jpg";
import * as response from "../../scripts/getResponse";


export default class EmployeeTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pastdata: [],
      loading: true,
      isEveryEmployee: true,
      search: "",
      isSearching: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getEmployees();
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.search !== prevState.search){
      this.changeData();
    }
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
            <td>{list.Phone_Number}</td>
            <td>{list.Email}</td>
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
    });
  }

  getEmployeeByName(){
    let group = [];
    response.getEmployeeByName(this.state.search).then(response=>{
      this.setState({
        data: []
      })
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
            <td>{list.Phone_Number}</td>
            <td>{list.Email}</td>
          </tr>
        );
        let temp = [];
        for (let i = group.length - 1; i >= 0; i--) {
          temp.push(group[i]);
        }
        this.setState({
          data: temp,
        });
    });
  })
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "radio" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
    console.log(this.state.isSearching)
  }

  changeData(){
    if(this.state.search == "" && this.state.isSearching == false){
      this.getEmployees();
    } else {
    this.getEmployeeByName();
    }
  }

  render() {
    return (
      <>
        <Container>
          <Card style={{ marginTop: "20px" }}>
            <Card.Body>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Search Employee</Form.Label>
                <Form.Control
                name="search"
                  type="text"
                  placeholder="Enter Name"
                  value={this.state.search}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Table hover>
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>{this.state.data}</tbody>
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }
}

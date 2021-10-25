import React, { Component } from "react";
import { Card, Image, Table } from "react-bootstrap";
import axios from "axios";
import placeholder from "../../assets/image-placeholder.jpg";

export default class EmployeeTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
    };
  }
  componentDidMount() {
    let group = [];
    //GET REQUEST EMPLOYEES FROM EMPLOYEE TABLE
    axios.get("http://localhost:3001/employees").then((response) => {
      response.data.map((list) => {

        group.push(
          <tr>
          <td align="center">
            <Image src={placeholder} width="50px" height="50px" roundedCircle />
          </td>
          <td>{list.Name}</td>
          <td> SUBMITTED</td>
          <td> Resume, Info, etc.</td>
        </tr>
        );
        this.setState({
          data: group,
        });
      });
      console.log(this.state.data);
    });
  }

  render() {
    return (
      <Card>
        <Table hover>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Submission Status</th>
              <th> Documents</th>
            </tr>
          </thead>
          <tbody>{this.state.data}</tbody>
        </Table>
      </Card>
    );
  }
}

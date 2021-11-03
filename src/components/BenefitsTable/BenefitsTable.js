import React, { Component } from "react";
import { Card, Image, Table } from "react-bootstrap";
import axios from "axios";

export default class BenefitsTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
    };
  }
  componentDidMount() {
    let group = [];
    //GET REQUEST BENEFITS FROM BENEFITS TABLE
    axios.get("http://localhost:3001/benefits").then((response) => {
      console.log(response.data)
      response.data.map((list) => {
        group.push(
          <tr>
          <td align="center">
          </td>
          <td>{list.Name}</td>
          <td>{list.PTO} hrs</td>
          <td>${list.Health_Insurance}</td>
          <td>${list.Food_Stipend}</td>
          <td>${list.Dental_Insurance}</td>
        </tr>
        );
        //flip array so we can show a descending order
        let temp = [];
        for(let i = group.length-1; i >= 0; i--){
          temp.push(group[i]);
        }
        this.setState({
          data: temp,
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
              <th>PTO</th>
              <th>Health Insurance</th>
              <th>Food Stipend</th>
              <th>Dental Insurance</th>
            </tr>
          </thead>
          <tbody>{this.state.data}</tbody>
        </Table>
      </Card>
    );
  }
}

import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Table,
  ListGroup,
} from "react-bootstrap";
import { EmployeeMenu, EmployeeTable } from "../../components";
import { Pie } from "react-chartjs-2";

export default class Employment extends Component {
  render() {
    const data = {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <EmployeeTable />
            </Col>
            <Col>
              <EmployeeMenu />
              <Col style={{ marginTop: "15px" }}>
                <Card>
                  <Pie
                    data={data}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </Card>
              </Col>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

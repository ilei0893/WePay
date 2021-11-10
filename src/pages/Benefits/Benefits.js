import React, { Component } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { BenefitsTable } from "../../components";

export default class Benefits extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <BenefitsTable />
            <br />
            <Row>
              <Button variant="secondary" href="/modify-employee" size="lg">
                Modify Benefits
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

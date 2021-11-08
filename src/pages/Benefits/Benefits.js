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
          <Col>
            <br />
            <h1>Health Insurance</h1>
            Blue Cross Blue Shield <br />
            <br />
            <h4>Manager or Employee of Higher Status</h4>
            <p>
              regular exams, immunizations, doctor and clinic visits relevant
              medical supplies and equipment, lab tests and x-rays, vision,
              dental, nursing home services, hospital stays, emergencies, and
              prescriptions.
            </p>
            <h4>Full Time Employee</h4>
            <p>
              Regular Exams, Immunizations, Doctor and Clinic visits and
              prescriptions
            </p>
            <h4>Part Time Employee</h4>
            <p>No Benefits</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

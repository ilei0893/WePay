import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import BenefitsTable from "../../components/BenefitsTable/BenefitsTable";

export default class Benefits extends Component {
  render() {
    return (
      <Container>
        <Col>
        <BenefitsTable/>
        <br />
        <h1>Benefits</h1>
        Blue Cross Blue Shield <br /><br />
        <h4>Manager or Employee of Higher Status</h4>
        <p>
          regular exams, immunizations, doctor and clinic visits relevant
          medical supplies and equipment, lab tests and x-rays, vision, dental,
          nursing home services, hospital stays, emergencies, and prescriptions.
        </p>
        <h4>Full Time Employee</h4>
        <p>
          Regular Exams, Immunizations, Doctor and Clinic visits and
          prescriptions
        </p>
        <h4>Part Time Employee</h4>
        <p>No Benefits</p>
        </Col>
      </Container>
    );
  }
}

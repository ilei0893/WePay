import React, { Component } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import axios from "axios";

export default class BenefitsEdit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Form>
          <Form.Group>
            <Form.Label> PTO </Form.Label>
            <Form.Control
              name="PTO"
              defaultValue={this.props.PTO}
              onChange={this.props.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Health Insurance </Form.Label>
            <Form.Control
              name="Health_Insurance"
              defaultValue={this.props.Health_Insurance}
              onChange={this.props.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Food Stipend </Form.Label>
            <Form.Control
              name="Food_Stipend"
              defaultValue={this.props.Food_Stipend}
              onChange={this.props.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Dental Insurance </Form.Label>
            <Form.Control
              name="Dental_Insurance"
              defaultValue={this.props.Dental_Insurance}
              onChange={this.props.handleChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={this.props.handleBenefitsSubmit}
          >
            Submit Changes
          </Button>
        </Form>
      </Container>
    );
  }
}

import React, { Component } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import moment from "moment";

export default class BenefitsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PTO: "",
      HealthInsurance: false,
      FoodStipend: "",
      DentalInsurance: "",
      isOverAYear: false
    };
    this.ptoInput = React.createRef();
    this.healthInsuranceInput = React.createRef();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    console.log(value);
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    console.log(this.props.workingHours)
    //YYYY-MM-DD format
    let oldDateShort = this.props.startDate.substring(0, 10);
    const currentDate = new Date();
    const oldDate = new Date(oldDateShort);

    console.log(currentDate);
    console.log(oldDate);
    if((currentDate - oldDate) / (1000 * 3600 * 24 * 365) > 1){ //if true then its over a year
      this.setState({
        isOverAYear: true,
      })
    } else { // else false then its not over a year
      this.setState({
        isOverAYear: false,
      })
    }
    if (this.props.Health_Insurance > 0) {
      this.setState({
        HealthInsurance: true,
      });
    }
  }
  render() {
    if (this.props.EmployeeType === "FT") {
      //======= IF THE EMPLOYEE IS A FULL TIME EMPLOYEE
      return (
        <Container>
          <h3>Editing Employee Benefits</h3>
          <Form
            onSubmit={this.props.handleBenefitsSubmit}
            validated={this.props.validated}
          >
            <Form.Group>
              <Form.Label> PTO </Form.Label>
              <Form.Control
                name="PTO"
                defaultValue={this.props.PTO}
                onChange={this.props.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Health Insurance ($100)</Form.Label>
              <Form.Control
                name="Health_Insurance"
                defaultValue={this.props.Health_Insurance}
                onChange={this.props.handleChange}
                pattern="^([0]|1[0][0])$"
              />
              <Form.Text className="text-muted">
                Please enter 0 for no benefits or 100 for benefits
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label> Food Stipend ($50)</Form.Label>
              <Form.Control
                name="Food_Stipend"
                defaultValue={this.props.Food_Stipend}
                onChange={this.props.handleChange}
                pattern="^([0]|5[0])$"
              />
              <Form.Text className="text-muted">
                Please enter 0 for no Food Stipend or 50 for Food Stipend
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label> Dental Insurance ($15)</Form.Label>
              <Form.Control
                name="Dental_Insurance"
                defaultValue={this.props.Dental_Insurance}
                onChange={this.props.handleChange}
                pattern="^([0]|1[5])$"
              />
              <Form.Text className="text-muted">
                Please enter 0 for no Dental Insurance or 15 for Dental
                Insurance
              </Form.Text>
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Submit Changes
            </Button>
          </Form>
        </Container>
      );
    } else {
      //======= IF THE EMPLOYEE IS A PART TIME EMPLOYEE
      return (
        <Container>
          <h3>Editing Employee Benefits</h3>
          <Form
            onSubmit={this.props.handleBenefitsSubmit}
            validated={this.props.validated}
          >
            <Form.Group>
              <Form.Label> PTO </Form.Label>
              <Form.Control
                name="PTO"
                defaultValue={this.props.PTO}
                onChange={this.props.handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Health Insurance ($100)</Form.Label>
              <Form.Control
                name="Health_Insurance"
                defaultValue={this.props.Health_Insurance}
                onChange={this.props.handleChange}
                pattern="^([0]|1[0][0])$"
                required
                disabled={this.state.isOverAYear || this.props.workingHours >= 30 ? false : true}
              />
              <Form.Text className="text-muted">
                Please enter 0 for no benefits or 100 for benefits
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Food Stipend ($50)</Form.Label>
              <Form.Control
                name="Food_Stipend"
                defaultValue={this.props.Food_Stipend}
                onChange={this.props.handleChange}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Dental Insurance ($15)</Form.Label>
              <Form.Control
                name="Dental_Insurance"
                defaultValue={this.props.Dental_Insurance}
                onChange={this.props.handleChange}
                required
                disabled
              />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Submit Changes
            </Button>
          </Form>
        </Container>
      );
    }
  }
}

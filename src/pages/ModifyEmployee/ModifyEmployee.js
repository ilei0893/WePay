import React, { Component } from "react";
import { Container, Col, Row, Button, Form, Toast } from "react-bootstrap";
import axios from "axios";
import {
  EmployeeSearch,
  EmployeeEdit,
  BenefitsEdit,
  EmployeeToast,
  MarkPastEmployee,
} from "../../components";
import * as response from "../../scripts/getResponse";

export default class ModifyEmployee extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      SSN: "",
      address: "",
      salary: "",
      workState: "",
      livingState: "",
      phoneNum: "",
      position: "",
      email: "",
      data: [],
      PTO: "",
      Health_Insurance: "",
      Food_Stipend: "",
      Dental_Insurance: "",
      isFound: false,
      isSubmitted: false,
      isEdit: false,
      isEditSubmitted: false,
      isEditBenefits: false,
      isPastEmployee: false,
      validatedSearch: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleMarkPastEmployee = this.handleMarkPastEmployee.bind(this);
    this.handleBenefitsEdit = this.handleBenefitsEdit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleBenefitsSubmit = this.handleBenefitsSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeToast = this.closeToast.bind(this);
  }

  //get input from employee search form
  handleChange(event) {
    const target = event.target;
    const value = target.type === "radio" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  //when handle edit is clicked, get data from employee and set isEdit to true
  handleEdit(event) {
    event.preventDefault();
    this.setState({
      isEdit: true,
      isEditBenefits: false,
      isPastEmployee: false,
    });

    response.getEmployee(this.state.fullName, this.state.SSN).then((res) => {
      res.data.map((list) => {
        this.setState({
          fullName: list.Name,
          address: list.Address,
          salary: list.Salary,
          workState: list.WorkState,
          livingState: list.LivingState,
          phoneNum: list.Phone_Number,
          position: list.Position,
        });
      });
    });
  }

  handleBenefitsEdit(event) {
    event.preventDefault();
    this.setState({
      isEdit: false,
      isEditBenefits: true,
    });
    response.getBenefits(this.state.fullName).then((response) => {
      console.log(response.data);
      this.setState({
        PTO: response.data[0].PTO,
        Health_Insurance: response.data[0].Health_Insurance,
        Food_Stipend: response.data[0].Food_Stipend,
        Dental_Insurance: response.data[0].Dental_Insurance,
      });
    });
  }

  handleMarkPastEmployee(event) {
    event.preventDefault();
    this.setState({
      isEdit: false,
      isEditBenefits: false,
      isPastEmployee: true,
    });
  }

  handleEditSubmit(event) {
    event.preventDefault();
    let data = {
      name: this.state.fullName,
      SSN: this.state.SSN,
      email: this.state.email,
      phoneNum: this.state.phoneNum,
      address: this.state.address,
      salary: this.state.salary,
      position: this.state.position,
      workState: this.state.workState,
      livingState: this.state.livingState,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .put("http://localhost:3001/updateemployee", data, config)
      .then((response) => {
        this.response = response;
      });

    this.setState({
      isEditSubmitted: true,
    });
  }

  handleBenefitsSubmit(event) {
    event.preventDefault();
    this.setState({
      isEditSubmitted: true,
    });
    let data = {
      name: this.state.fullName,
      PTO: this.state.PTO,
      Health_Insurance: this.state.Health_Insurance,
      Food_Stipend: this.state.Food_Stipend,
      Dental_Insurance: this.state.Dental_Insurance,
    };
    console.log(data)
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .put("http://localhost:3001/updateemployeebenefit", data, config)
      .then((response) => {
        this.response = response.data;
        console.log(this.response);
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    let employee = [];
    response.getEmployee(this.state.fullName, this.state.SSN).then((res) => {
      if (res.data.length === 0) {
        // if no data is found then return that employee is not found
        this.setState({
          isFound: false,
          isSubmitted: true,
        });
      } else if (res.data.length === 1) {
        //if data is found then return that data
        this.setState({
          isFound: true,
          isSubmitted: true,
        });
        res.data.map((list) => {
          employee.push(
            <div key={list}>
              <Row>
                <Col>
                  <h4>{list.Name}</h4>
                  <p>Position: {list.Position}</p>
                  <p>Phone Number: {list.Phone_Number}</p>
                  <p>Salary: {list.Salary}</p>
                  <p>Email: {list.Email}</p>
                </Col>
                <Col>
                  <Button onClick={this.handleEdit}>
                    Edit Personal Information
                  </Button>
                  <br />
                  <br />
                  <Button onClick={this.handleBenefitsEdit}>
                    Edit Benefits
                  </Button>
                  <br />
                  <br />
                  <Button onClick={this.handleMarkPastEmployee}>
                    Mark as past employee
                  </Button>
                </Col>
              </Row>
            </div>
          );
          this.setState({
            data: employee,
            phoneNum: list.Phone_Number,
            salary: list.Salary,
            position: list.Position,
            email: list.Email,
          });
        });
      }
    });
  }

  closeToast() {
    this.setState({ isEditSubmitted: false });
  }

  render() {
    if (
      this.state.isEdit === false &&
      this.state.isEditBenefits === false &&
      this.state.isPastEmployee === false
    ) {
      return (
        <EmployeeSearch
          isFound={this.state.isFound}
          isSubmitted={this.state.isSubmitted}
          data={this.state.data}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          validated={this.state.validatedSearch}
        />
      );
    } else if (this.state.isEdit === true) {
      return (
        <>
          <EmployeeSearch
            isFound={this.state.isFound}
            isSubmitted={this.state.isSubmitted}
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleEdit={this.handleEdit}
            validated={this.state.validatedSearch}
          />
          <EmployeeToast
            closeToast={this.closeToast}
            isEditSubmitted={this.state.isEditSubmitted}
          />
          <EmployeeEdit
            handleChange={this.handleChange}
            handleEditSubmit={this.handleEditSubmit}
            fullName={this.state.fullName}
            address={this.state.address}
            email={this.state.email}
            salary={this.state.salary}
            workState={this.state.workState}
            livingState={this.state.livingState}
            phoneNum={this.state.phoneNum}
            position={this.state.position}
          />
        </>
      );
    } else if (this.state.isEditBenefits === true) {
      return (
        <>
          <EmployeeSearch
            isFound={this.state.isFound}
            isSubmitted={this.state.isSubmitted}
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleEdit={this.handleEdit}
            validated={this.state.validatedSearch}
          />
          <EmployeeToast
            closeToast={this.closeToast}
            isEditSubmitted={this.state.isEditSubmitted}
          />
          <BenefitsEdit
            fullName={this.state.fullName}
            handleChange={this.handleChange}
            handleBenefitsSubmit={this.handleBenefitsSubmit}
            benefitsData={this.state.benefitsData}
            PTO={this.state.PTO}
            Health_Insurance={this.state.Health_Insurance}
            Food_Stipend={this.state.Food_Stipend}
            Dental_Insurance={this.state.Dental_Insurance}
            isEditSubmitted={this.state.isEditSubmitted}
          />
        </>
      );
    } else if (this.state.isPastEmployee === true) {
      return (
        <>
          <EmployeeSearch
            isFound={this.state.isFound}
            isSubmitted={this.state.isSubmitted}
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleEdit={this.handleEdit}
            validated={this.state.validatedSearch}
          />
          <EmployeeToast
            closeToast={this.closeToast}
            isEditSubmitted={this.state.isEditSubmitted}
          />
          <MarkPastEmployee
            fullName={this.state.fullName}
            salary={this.state.salary}
            position={this.state.position}
            phoneNum={this.state.phoneNum}
          />
        </>
      );
    }
  }
}

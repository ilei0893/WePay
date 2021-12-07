import React, { useState, Compoenent, Component } from "react";
import { Container, Row, Col, Card, Image, Modal, Button, Table, Form} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PayrollItem.css";
import axios from "axios";
import * as response from "../../scripts/getResponse";

export default class PayrollItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      data: {},
      benefitsData: {},
      showPay: false,
      fed: 0,
      fed: 0,
      fed: 0,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleShowClose = this.handleShowClose.bind(this);
    this.handleShowPay = this.handleShowPay.bind(this);
    this.handlePayroll = this.handlePayroll.bind(this);
  }

  componentDidMount() {
    //calculate federal tax
    if (this.props.employeeType === "FT") {
      //if full time employee
      /* CT tax */
      if(this.props.workState === "CT"){
          this.state.fed = 0;
          if (this.props.salary > 0 && this.props.salary <= 10000) {
            this.state.fed = this.props.salary * 0.03;
          } else if (this.props.salary >= 10001 && this.props.salary <= 50000) {
            this.state.fed = this.props.salary * 0.05;
          } else if (this.props.salary >= 50001 && this.props.salary <= 100000) {
            this.state.fed = this.props.salary * 0.055;
          } else if (this.props.salary >= 100001 && this.props.salary <= 200000) {
            this.state.fed = this.props.salary * 0.06;
          } else if (this.props.salary >= 200001 && this.props.salary <= 250000) {
            this.state.fed = this.props.salary * 0.065;
          } else if (this.props.salary >= 250001 && this.props.salary <= 500000) {
            this.state.fed = this.props.salary * 0.069;
          } else if (this.props.salary >= 500001) {
            this.state.fed = this.props.salary * 0.0699;
          }
      } else if (this.props.workState === "NY") {
          /* NY tax */
          this.state.fed = 0;
          if (this.props.salary > 0 && this.props.salary <= 8500) {
            this.state.fed = this.props.salary * 0.04;
          } else if (this.props.salary >= 8501 && this.props.salary <= 11700) {
            this.state.fed = this.props.salary * 0.045 + 340;
          } else if (this.props.salary >= 11701 && this.props.salary <= 13900) {
            this.state.fed = this.props.salary * 0.0525 + 484;
          } else if (this.props.salary >= 13901 && this.props.salary <= 21400) {
            this.state.fed = this.props.salary * 0.059 + 600;
          } else if (this.props.salary >= 21400 && this.props.salary <= 80650) {
            this.state.fed = this.props.salary * 0.0597 + 1042;
          } else if (this.props.salary >= 80651 && this.props.salary <= 215400) {
            this.state.fed = this.props.salary * 0.0633 + 4579;
          } else if (this.props.salary >= 215401 && this.props.salary <= 1077550) {
            this.state.fed = this.props.salary * 0.0685 + 13109;
          } else if (this.props.salary >= 1077551 && this.props.salary <= 5000000) {
            this.state.fed = this.props.salary * 0.0965 + 72166;
          } else if (
            this.props.salary >= 5000001 &&
            this.props.salary <= 25000000
          ) {
            this.state.fed = this.props.salary * 0.103 + 450683;
          } else if (this.props.salary >= 25000001) {
            this.state.fed = this.props.salary * 0.109 + 2510683;
          }
        } else if (this.props.workState === "NJ") {
          //NJ tax
          this.state.fed = 0;
          if (this.props.salary > 0 && this.props.salary <= 20000) {
            this.state.fed = this.props.salary * 0.014;
          } else if (this.props.salary >= 20001 && this.props.salary <= 35000) {
            this.state.fed = this.props.salary * 0.0175;
          } else if (this.props.salary >= 35001 && this.props.salary <= 40000) {
            this.state.fed = this.props.salary * 0.035;
          } else if (this.props.salary >= 40001 && this.props.salary <= 75000) {
            this.state.fed = this.props.salary * 0.05525;
          } else if (this.props.salary >= 75001 && this.props.salary <= 500000) {
            this.state.fed = this.props.salary * 0.0637;
          } else if (this.props.salary >= 500001 && this.props.salary <= 5000000) {
            this.state.fed = this.props.salary * 0.0897;
          } else if (this.props.salary >= 5000001) {
            this.state.fed = this.props.salary * 0.1075;
          }
        }
    } else {
      //if part time employee
      let annualSalary =
        this.props.workingHours * 2 * this.props.hourlyRate * 2 * 12;

      //CT Tax
      this.state.fed = 0;
      if (annualSalary > 0 && annualSalary <= 10000) {
        this.state.fed = annualSalary * 0.03;
      } else if (annualSalary >= 10001 && annualSalary <= 50000) {
        this.state.fed = annualSalary * 0.05;
      } else if (annualSalary >= 50001 && annualSalary <= 100000) {
        this.state.fed = annualSalary * 0.055;
      } else if (annualSalary >= 100001 && annualSalary <= 200000) {
        this.state.fed = annualSalary * 0.06;
      } else if (annualSalary >= 200001 && annualSalary <= 250000) {
        this.state.fed = annualSalary * 0.065;
      } else if (annualSalary >= 250001 && annualSalary <= 500000) {
        this.state.fed = annualSalary * 0.069;
      } else if (annualSalary >= 500001) {
        this.state.fed = annualSalary * 0.0699;
      }

      /* NY tax */
      this.state.fed = 0;
      if (annualSalary > 0 && annualSalary <= 8500) {
        this.state.fed = annualSalary * 0.04;
      } else if (annualSalary >= 8501 && annualSalary <= 11700) {
        this.state.fed = annualSalary * 0.045 + 340;
      } else if (annualSalary >= 11701 && annualSalary <= 13900) {
        this.state.fed = annualSalary * 0.0525 + 484;
      } else if (annualSalary >= 13901 && annualSalary <= 21400) {
        this.state.fed = annualSalary * 0.059 + 600;
      } else if (annualSalary >= 21400 && annualSalary <= 80650) {
        this.state.fed = annualSalary * 0.0597 + 1042;
      } else if (annualSalary >= 80651 && annualSalary <= 215400) {
        this.state.fed = annualSalary * 0.0633 + 4579;
      } else if (annualSalary >= 215401 && annualSalary <= 1077550) {
        this.state.fed = annualSalary * 0.0685 + 13109;
      } else if (annualSalary >= 1077551 && annualSalary <= 5000000) {
        this.state.fed = annualSalary * 0.0965 + 72166;
      } else if (annualSalary >= 5000001 && annualSalary <= 25000000) {
        this.state.fed = annualSalary * 0.103 + 450683;
      } else if (annualSalary >= 25000001) {
        this.state.fed = annualSalary * 0.109 + 2510683;
      }

      //NJ tax
      this.state.fed = 0;
      if (annualSalary > 0 && annualSalary <= 20000) {
        this.state.fed = annualSalary * 0.014;
      } else if (annualSalary >= 20001 && annualSalary <= 35000) {
        this.state.fed = annualSalary * 0.0175;
      } else if (annualSalary >= 35001 && annualSalary <= 40000) {
        this.state.fed = annualSalary * 0.035;
      } else if (annualSalary >= 40001 && annualSalary <= 75000) {
        this.state.fed = annualSalary * 0.05525;
      } else if (annualSalary >= 75001 && annualSalary <= 500000) {
        this.state.fed = annualSalary * 0.0637;
      } else if (annualSalary >= 500001 && annualSalary <= 5000000) {
        this.state.fed = annualSalary * 0.0897;
      } else if (annualSalary >= 5000001) {
        this.state.fed = annualSalary * 0.1075;
      }
    }
    // get recent paycheck data
    let data = { name: this.props.name };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post("http://localhost:3001/getRecentPayroll", data, config)
      .then((response) => {
        this.setState({
          data: response.data[0],
        });
        console.log(this.state.data);
      });

    //get benefits data
    response.getBenefits(this.props.name).then((response) => {
      if (response.data[0]) {
        this.setState({
          benefitsData: response.data[0],
        });
      } else {
        this.setState({
          benefitsData: { Health_Insurance: 0, Dental_Insurance: 0 },
        });
      }
    });
  }

  handleClose() {
    this.setState({
      show: false,
    });
  }

  handleShow() {
    this.setState({
      show: true,
    });
  }

  handleShowClose() {
    this.setState({
      showPay: false,
    });
  }

  handleShowPay() {
    this.setState({
      showPay: true,
    });
  }

  handlePayroll(event) {
    let data = {};
    event.preventDefault();
    if (this.props.employeeType === "FT") {
      let grossPay = Number(this.props.salary / 26).toFixed(2);
      // IF EMPLOPYEE IS FULL TIME
        let totalTaxes = Number(
          (this.props.oasdiTaxes + this.state.fed + this.props.hiTaxes) / 26
        ).toFixed(2);

        let totalBenefits = Number(
          this.state.benefitsData.Health_Insurance +
            this.state.benefitsData.Dental_Insurance
        ).toFixed(2);

        let netPay =
          Number(this.props.salary / 26).toFixed(2) -
          Number(
            (this.props.oasdiTaxes + this.state.fed + this.props.hiTaxes) / 26
          ).toFixed(2) -
          totalBenefits;

        data = {
          name: this.props.name,
          workingHours: this.props.workingHours,
          salary: this.props.salary,
          paycheckDate: new Date().toISOString().slice(0, 19).replace("T", " "),
          grossPay: grossPay,
          taxes: totalTaxes,
          benefits: totalBenefits,
          total: netPay,
        };
    } else { //if employee is PART TIME
      let grossPay = Number(this.props.workingHours * 2 * this.props.hourlyRate).toFixed(2);

        let totalTaxes = Number(
          this.props.hourlyRate * this.props.workingHours * 2 * 0.062 +
          (this.state.fed / 26) +
          this.props.hourlyRate * this.props.workingHours * 2 * 0.0145
        ).toFixed(2);

        let totalBenefits = Number(
          this.state.benefitsData.Health_Insurance +
            this.state.benefitsData.Dental_Insurance
        ).toFixed(2);

        let netPay = Number(
          Number(this.props.workingHours * 2 * this.props.hourlyRate).toFixed(
            2
          ) -
            totalTaxes -
            totalBenefits
        ).toFixed(2);

        data = {
          name: this.props.name,
          workingHours: this.props.workingHours,
          salary: this.props.workingHours * 2 * this.props.hourlyRate * 2 * 12,
          paycheckDate: new Date().toISOString().slice(0, 19).replace("T", " "),
          grossPay: grossPay,
          taxes: totalTaxes,
          benefits: totalBenefits,
          total: netPay,
        };
      }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let hoursData = {
      hoursWorked: this.props.hoursWorked + this.props.workingHours,
      name: this.props.name,
    };
    console.log(data);
    axios.post("http://localhost:3001/postPayroll", data, config);
    axios.put("http://localhost:3001/updatehours", hoursData, config);
    window.location.reload();
  }

  render() {
    // SHORTEN PAYCHECK DATE
    let paycheckShort = "";
    if (this.state.data != undefined) {
      paycheckShort = this.state.data.PaycheckDate
        ? this.state.data.PaycheckDate.substring(0, 10)
        : "";
      if (this.props.employeeType == "FT") {
        // ===== DETERMINES IF THE EMPLOYEE IS A FULL TIME WITH A PREVIOUS PAYCHECK
        return (
          <>
            <div className="salary-item">
              <img
                className="payroll-img"
                src={this.props.image}
                alt={this.props.name}
              />
              <div className="salary-item-desc">
                <h5>{this.props.name}</h5>
                Position: {this.props.position} <br />
                Employee Type:{" "}
                {this.props.employeeType === "FT"
                  ? "Full Time Employee"
                  : "Part Time Employee"}{" "}
                <br />
                Hours Worked: {this.props.hoursWorked} hours <br />
                Salary: ${this.props.salary} <br />
                Taxes: $
                {this.props.oasdiTaxes +
                  this.props.hiTaxes +
                  this.state.fed}{" "}
                <br />
                Earnings: $
                {this.props.salary -
                  (this.props.oasdiTaxes + this.props.hiTaxes + this.state.fed)}
              </div>
              <div className="salary-button">
                <Button variant="primary" onClick={this.handleShow}>
                  View Recent Check
                </Button>
                <Button variant="primary" onClick={this.handleShowPay}>
                  Run Payroll
                </Button>
                Last Paycheck: {paycheckShort}
              </div>
            </div>
            {/*
           View Recent Check
           For Users
          */}
              <Modal
                show={this.state.show}
                onHide={this.handleClose}
                centered
                size="lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Paycheck</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Employee Name</th>
                        <th>Paycheck Date</th>
                        <th>Hours Worked</th>
                        <th>Gross Pay</th>
                        <th>Tax Deductions</th>
                        <th>Benefits Deductions</th>
                        <th>Net Pay</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.state.data.Name}</td>
                        <td>{paycheckShort}</td>
                        <td>{this.state.data.HoursWorked}</td>
                        <td>{this.state.data.GrossPay}</td>
                        <td>
                          <b>OASDI: </b>
                          {Number(this.props.oasdiTaxes / 26).toFixed(2)}
                          <br></br>
                          <b>Federal: </b>
                          {Number(this.state.fed / 26).toFixed(2)}
                          <br></br>
                          <b>HI: </b>
                          {Number(this.props.hiTaxes / 26).toFixed(2)} <br />
                          <b>Total:</b> {this.state.data.Taxes}
                        </td>
                        <td>
                          <b>Health Insurance:</b>
                          {this.state.benefitsData.Health_Insurance} <br />
                          <b>Dental Insurance: </b>
                          {this.state.benefitsData.Dental_Insurance} <br />
                          <b>Total: </b>
                          {Number(
                            this.state.benefitsData.Health_Insurance +
                              this.state.benefitsData.Dental_Insurance
                          )}
                        </td>
                        <td>{this.state.data.Total}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            
            {/* PAYROLL MODAL */}
              <Modal
                show={this.state.showPay}
                onHide={this.handleShowClose}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Run Payroll</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Employee Name</th>
                        <th>Hours Worked</th>
                        <th>Gross Pay</th>
                        <th>Tax Deductions</th>
                        <th>Benefits Deductions</th>
                        <th>Net Pay</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.props.name}</td>
                        <td>{this.state.data.HoursWorked}</td>
                        <td>{Number(this.props.salary / 26).toFixed(2)}</td>
                        <td>
                          <b>OASDI: </b>
                          {Number(this.props.oasdiTaxes / 26).toFixed(2)} <br />
                          <b>Federal: </b>
                          {Number(this.state.fed / 26).toFixed(2)} <br />
                          <b>HI: </b>
                          {Number(this.props.hiTaxes / 26).toFixed(2)} <br />
                          <b>Total: </b>
                          {Number(
                            (this.props.oasdiTaxes +
                              this.state.fed +
                              this.props.hiTaxes) /
                              26
                          ).toFixed(2)}
                        </td>
                        <td>
                          <b>Health Insurance:</b>{" "}
                          {this.state.benefitsData.Health_Insurance} <br />
                          <b>Dental Insurance: </b>{" "}
                          {this.state.benefitsData.Dental_Insurance} <br />
                          <b>Total: </b>{" "}
                          {Number(
                            this.state.benefitsData.Health_Insurance +
                              this.state.benefitsData.Dental_Insurance
                          )}
                        </td>
                        <td>
                          {Number(
                            Number(this.props.salary / 26).toFixed(2) -
                              Number(
                                (this.props.oasdiTaxes +
                                  this.state.fed +
                                  this.props.hiTaxes) /
                                  26
                              ).toFixed(2) -
                              Number(
                                Number(
                                  this.state.benefitsData.Health_Insurance +
                                    this.state.benefitsData.Dental_Insurance
                                ).toFixed(2)
                              )
                          ).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Button variant="primary" onClick={this.handlePayroll}>
                    Run Payroll
                  </Button>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleShowClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            
          </>
        );
      } else {
        // ===== IF THE EMPLOYEE IS A PART TIME WITH A PREVIOUS PAYCHECK
        return (
          <>
            <div className="salary-item">
              <img
                className="payroll-img"
                src={this.props.image}
                alt={this.props.name}
              />
              <div className="salary-item-desc">
                <h5>{this.props.name}</h5>
                Position: {this.props.position} <br />
                Employee Type:{" "}
                {this.props.employeeType === "FT"
                  ? "Full Time Employee"
                  : "Part Time Employee"}{" "}
                <br />
                Hourly Rate: ${this.props.hourlyRate} <br />
                Hours Worked: {this.props.hoursWorked} hours <br />
              </div>
              <div className="salary-button">
                <Button variant="primary" onClick={this.handleShow}>
                  View Recent Check
                </Button>
                <Button variant="primary" onClick={this.handleShowPay}>
                  Run Payroll
                </Button>
                Last Paycheck: {paycheckShort}
              </div>
            </div>
            <Modal
              show={this.state.show}
              onHide={this.handleClose}
              centered
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Paycheck</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Paycheck Date</th>
                      <th>Hours Worked</th>
                      <th>Gross Pay</th>
                      <th>Tax Deductions</th>
                      <th>Benefits Deductions</th>
                      <th>Net Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{this.state.data.Name}</td>
                      <td>{paycheckShort}</td>
                      <td>{this.state.data.HoursWorked}</td>
                      <td>{Number(this.state.data.GrossPay).toFixed(2)}</td>
                      <td>
                        <b>OASDI: </b>
                        {Number(this.props.hourlyRate *this.props.workingHours * 2 * 0.062).toFixed(2)}
                        <br />
                        <b>Federal: </b>
                        {Number(this.state.fed / 26).toFixed(2)}
                        <br></br>
                        <b>HI: </b>
                        {Number(this.props.hourlyRate * this.props.workingHours * 2 * 0.0145).toFixed(2)} <br />
                        <b>Total:</b> {this.state.data.Taxes}
                      </td>
                      <td>
                        <b>Health Insurance:</b>
                        {this.state.benefitsData.Health_Insurance} <br />
                        <b>Dental Insurance: </b>
                        {this.state.benefitsData.Dental_Insurance} <br />
                        <b>Total: </b>
                        {Number(
                          this.state.benefitsData.Health_Insurance +
                            this.state.benefitsData.Dental_Insurance
                        )}
                      </td>
                      <td>{this.state.data.Total}</td>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            {/* 
          =============
          PAYROLL MODAL 
          =============
          */}
            <Modal
              show={this.state.showPay}
              onHide={this.handleShowClose}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Run Payroll</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Hours Worked</th>
                      <th>Gross Pay</th>
                      <th>Tax Deductions</th>
                      <th>Benefits Deductions</th>
                      <th>Net Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{this.props.name}</td>
                      <td>{this.props.workingHours * 2}</td>
                      <td>
                        {Number(this.props.hourlyRate * this.props.workingHours * 2).toFixed(2)}
                      </td>
                      <td>
                        <b>OASDI: </b>
                        {Number(this.props.hourlyRate *this.props.workingHours * 2 * 0.062).toFixed(2)}
                        <br />
                        <b>Federal: </b>
                        {Number(this.state.fed / 26).toFixed(2)} <br />
                        <b>HI: </b>
                        {Number(this.props.hourlyRate * this.props.workingHours * 2 * 0.0145).toFixed(2)}
                        <br />
                        <b>Total: </b>
                        {Number(this.props.hourlyRate * this.props.workingHours * 2 * 0.062 + (this.state.fed / 26) + this.props.hourlyRate * this.props.workingHours * 2 * 0.0145).toFixed(2)}
                      </td>
                      <td>
                        <b>Health Insurance:</b>
                        {this.state.benefitsData.Health_Insurance} <br />
                        <b>Dental Insurance: </b>
                        {this.state.benefitsData.Dental_Insurance} <br />
                        <b>Total: </b>
                        {Number(this.state.benefitsData.Health_Insurance + this.state.benefitsData.Dental_Insurance)}
                      </td>
                      <td>
                        {Number(Number(
                            this.props.workingHours * 2 * this.props.hourlyRate // gross pay
                          ).toFixed(2) -
                            Number( // total taxes
                              (this.props.hourlyRate * 
                                this.props.workingHours * 2 *
                                0.062 +
                                (this.state.fed / 26) +
                                this.props.hourlyRate *
                            this.props.workingHours * 2 *
                            0.0145)
                            ).toFixed(2) -
                              Number( // total benefits
                                this.state.benefitsData.Health_Insurance +
                                  this.state.benefitsData.Dental_Insurance
                              ).toFixed(2)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Button variant="primary" onClick={this.handlePayroll}>
                  Run Payroll
                </Button>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleShowClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }
    } else {
      //this returns the employee if they are a new employee
      if (this.props.employeeType === "FT") { //IF THE EMPLOYEE IS A NEW FULL TIME EMPLOYEE
        return (
          <>
            <div className="salary-item">
              <img
                className="payroll-img"
                src={this.props.image}
                alt={this.props.name}
              />
              <div className="salary-item-desc">
                <h5>{this.props.name}</h5>
                Position: {this.props.position} <br />
                Employee Type:{" "}
                {this.props.employeeType === "FT"
                  ? "Full Time Employee"
                  : "Part Time Employee"}{" "}
                <br />
                Hours Worked: {this.props.hoursWorked} hours <br />
                Salary: ${this.props.salary} <br />
                Taxes: $
                {this.props.oasdiTaxes +
                  this.props.hiTaxes +
                  this.state.fed}{" "}
                <br />
                Earnings: $
                {this.props.salary -
                  (this.props.oasdiTaxes + this.props.hiTaxes + this.state.fed)}
              </div>
              <div className="salary-button">
                <Button variant="primary" onClick={this.handleShow}>
                  View Recent Check
                </Button>
                <Button variant="primary" onClick={this.handleShowPay}>
                  Run Payroll
                </Button>
              </div>
            </div>
            <Modal
              show={this.state.show}
              onHide={this.handleClose}
              centered
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Paycheck</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Paycheck Date</th>
                      <th>Hours Worked</th>
                      <th>Gross Pay</th>
                      <th>Tax Deductions</th>
                      <th>Benefits Deductions</th>
                      <th>Net Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>N/A</td>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            {/*           
            =============
            PAYROLL MODAL 
            ============= 
            */}
            <Modal
              show={this.state.showPay}
              onHide={this.handleShowClose}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Run Payroll</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Hours Worked</th>
                      <th>Gross Pay</th>
                      <th>Tax Deductions</th>
                      <th>Benefits Deductions</th>
                      <th>Net Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{this.props.name}</td>
                      <td>{this.props.workingHours}</td>
                      <td>{Number(this.props.salary / 26).toFixed(2)}</td>
                      <td>
                        <b>OASDI: </b>
                        {Number(this.props.oasdiTaxes / 26).toFixed(2)} <br />
                        <b>Federal: </b>
                        {Number(this.state.fed / 26).toFixed(2)} <br />
                        <b>HI: </b>
                        {Number(this.props.hiTaxes / 26).toFixed(2)} <br />
                        <b>Total: </b>
                        {Number(
                          (this.props.oasdiTaxes +
                            this.state.fed +
                            this.props.hiTaxes) /
                            26
                        ).toFixed(2)}
                      </td>
                      <td>
                        <b>Health Insurance:</b>{" "}
                        {this.state.benefitsData.Health_Insurance} <br />
                        <b>Dental Insurance: </b>{" "}
                        {this.state.benefitsData.Dental_Insurance} <br />
                        <b>Total: </b>{" "}
                        {Number(
                          this.state.benefitsData.Health_Insurance +
                            this.state.benefitsData.Dental_Insurance
                        )}
                      </td>
                      <td>
                        {Number(
                          Number(this.props.salary / 26).toFixed(2) -
                            Number(
                              (this.props.oasdiTaxes +
                                this.state.fed +
                                this.props.hiTaxes) /
                                26
                            ).toFixed(2) -
                            Number(
                              Number(
                                this.state.benefitsData.Health_Insurance +
                                  this.state.benefitsData.Dental_Insurance
                              ).toFixed(2)
                            )
                        ).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Button variant="primary" onClick={this.handlePayroll}>
                  Run Payroll
                </Button>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleShowClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      } else {
        //IF EMPLOYEE IS A NEW EMPLOYEE AND IS A PART TIMER
        return (
          <>
            <div className="salary-item">
              <img
                className="payroll-img"
                src={this.props.image}
                alt={this.props.name}
              />
              <div className="salary-item-desc">
                <h5>{this.props.name}</h5>
                Position: {this.props.position} <br />
                Employee Type:{" "}
                {this.props.employeeType === "FT"
                  ? "Full Time Employee"
                  : "Part Time Employee"}{" "}
                <br />
                Hourly Rate: ${this.props.hourlyRate} <br />
                Hours Worked: {this.props.hoursWorked} hours <br />
              </div>
              <div className="salary-button">
                <Button variant="primary" onClick={this.handleShow}>
                  View Recent Check
                </Button>
                <Button variant="primary" onClick={this.handleShowPay}>
                  Run Payroll
                </Button>
              </div>
            </div>
            <Modal
              show={this.state.show}
              onHide={this.handleClose}
              centered
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Paycheck</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Paycheck Date</th>
                      <th>Hours Worked</th>
                      <th>Gross Pay</th>
                      <th>Tax Deductions</th>
                      <th>Benefits Deductions</th>
                      <th>Net Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>N/A</td>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            {/*           
            =============
            PAYROLL MODAL 
            ============= 
            */}
            <Modal
              show={this.state.showPay}
              onHide={this.handleShowClose}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Run Payroll</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Hours Worked</th>
                      <th>Gross Pay</th>
                      <th>Tax Deductions</th>
                      <th>Benefits Deductions</th>
                      <th>Net Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{this.props.name}</td>
                      <td>{this.props.workingHours * 2}</td>
                      <td>
                        {Number(this.props.hourlyRate * this.props.workingHours * 2).toFixed(2)}
                      </td>
                      <td>
                        <b>OASDI: </b>
                        {Number(this.props.hourlyRate *this.props.workingHours * 2 * 0.062).toFixed(2)}
                        <br />
                        <b>Federal: </b>
                        {Number(this.state.fed / 26).toFixed(2)} <br />
                        <b>HI: </b>
                        {Number(this.props.hourlyRate * this.props.workingHours * 2 * 0.0145).toFixed(2)}
                        <br />
                        <b>Total: </b>
                        {Number(this.props.hourlyRate * this.props.workingHours * 2 * 0.062 + (this.state.fed / 26) + this.props.hourlyRate * this.props.workingHours * 2 * 0.0145).toFixed(2)}
                      </td>
                      <td>
                        <b>Health Insurance:</b>
                        {this.state.benefitsData.Health_Insurance} <br />
                        <b>Dental Insurance: </b>
                        {this.state.benefitsData.Dental_Insurance} <br />
                        <b>Total: </b>
                        {Number(this.state.benefitsData.Health_Insurance + this.state.benefitsData.Dental_Insurance)}
                      </td>
                      <td>
                        {Number(Number(
                            this.props.workingHours * 2 * this.props.hourlyRate // gross pay
                          ).toFixed(2) -
                            Number( // total taxes
                              (this.props.hourlyRate * 
                                this.props.workingHours * 2 *
                                0.062 +
                                (this.state.fed / 26) +
                                this.props.hourlyRate *
                            this.props.workingHours * 2 *
                            0.0145)
                            ).toFixed(2) -
                              Number( // total benefits
                                this.state.benefitsData.Health_Insurance +
                                  this.state.benefitsData.Dental_Insurance
                              ).toFixed(2)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Button variant="primary" onClick={this.handlePayroll}>
                  Run Payroll
                </Button>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleShowClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }
    }
  }
}

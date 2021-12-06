import React, { useState, Compoenent, Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Modal,
  Button,
  Table,
  Form,
} from "react-bootstrap";
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
      CTfed: 0,
      NJfed: 0
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleShowClose = this.handleShowClose.bind(this);
    this.handleShowPay = this.handleShowPay.bind(this);
    this.handlePayroll = this.handlePayroll.bind(this);
  }

  componentDidMount() {
    //calculate federal tax
    /* CT tax */
    this.state.CTfed = 0;
    if (this.props.salary > 0 && this.props.salary <= 10000) {
      this.state.CTfed = this.props.salary * 0.03;
    } else if (this.props.salary >= 10001 && this.props.salary <= 50000) {
      this.state.CTfed = this.props.salary * 0.05;
    } else if (this.props.salary >= 50001 && this.props.salary <= 100000) {
      this.state.CTfed = this.props.salary * 0.055;
    } else if (this.props.salary >= 100001 && this.props.salary <= 200000) {
      this.state.CTfed = this.props.salary * 0.06;
    } else if (this.props.salary >= 200001 && this.props.salary <= 250000) {
      this.state.CTfed = this.props.salary * 0.065;
    } else if (this.props.salary >= 250001 && this.props.salary <= 500000) {
      this.state.CTfed = this.props.salary * 0.069;
    } else if (this.props.salary >= 500001) {
      this.state.CTfed = this.props.salary * 0.0699;
    }
  /* NY tax */
    this.state.fed = 0;
    //new york
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
    } else if (this.props.salary >= 5000001 && this.props.salary <= 25000000) {
      this.state.fed = this.props.salary * 0.103 + 450683;
    } else if (this.props.salary >= 25000001) {
      this.state.fed = this.props.salary * 0.109 + 2510683;
    }

    //NJ tax
    this.state.NJfed = 0;
    if (this.props.salary > 0 && this.props.salary <= 20000) {
      this.state.NJfed = this.props.salary * 0.014;
    } else if (this.props.salary >= 20001 && this.props.salary <= 35000) {
      this.state.NJfed = this.props.salary * 0.0175;
    } else if (this.props.salary >= 35001 && this.props.salary <= 40000) {
      this.state.NJfed = this.props.salary * 0.035;
    } else if (this.props.salary >= 40001 && this.props.salary <= 75000) {
      this.state.NJfed = this.props.salary * 0.05525;
    } else if (this.props.salary >= 75001 && this.props.salary <= 500000) {
      this.state.NJfed = this.props.salary * 0.0637;
    } else if (this.props.salary >= 500001 && this.props.salary <= 5000000) {
      this.state.NJfed = this.props.salary * 0.0897;
    } else if (this.props.salary >= 5000001) {
      this.state.NJfed = this.props.salary * 0.1075;
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

  handlePayroll() {
    let data = {};
    let grossPay = Number(this.props.salary / 26).toFixed(2);
    if(this.props.livingState == 'NY'){
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
      salary: this.props.salary,
      paycheckDate: new Date().toISOString().slice(0, 19).replace("T", " "),
      grossPay: grossPay,
      taxes: totalTaxes,
      benefits: totalBenefits,
      total: netPay,
    };
  } else if(this.props.livingState == 'CT') {
    let totalTaxes = Number(
      (this.props.oasdiTaxes + this.state.CTfed + this.props.hiTaxes) / 26
    ).toFixed(2);
    
    let totalBenefits = Number(
      this.state.benefitsData.Health_Insurance +
        this.state.benefitsData.Dental_Insurance
    ).toFixed(2);
    let netPay =
      Number(this.props.salary / 26).toFixed(2) -
      Number(
        (this.props.oasdiTaxes + this.state.CTfed + this.props.hiTaxes) / 26
      ).toFixed(2) -
      totalBenefits;
      
    data = {
      name: this.props.name,
      salary: this.props.salary,
      paycheckDate: new Date().toISOString().slice(0, 19).replace("T", " "),
      grossPay: grossPay,
      taxes: totalTaxes,
      benefits: totalBenefits,
      total: netPay,
    };
  } else if(this.props.livingState == "NJ"){
    let totalTaxes = Number(
      (this.props.oasdiTaxes + this.state.NJfed + this.props.hiTaxes) / 26
    ).toFixed(2);
    
    let totalBenefits = Number(
      this.state.benefitsData.Health_Insurance +
        this.state.benefitsData.Dental_Insurance
    ).toFixed(2);
    let netPay =
      Number(this.props.salary / 26).toFixed(2) -
      Number(
        (this.props.oasdiTaxes + this.state.NJfed + this.props.hiTaxes) / 26
      ).toFixed(2) -
      totalBenefits;
      
    data = {
      name: this.props.name,
      salary: this.props.salary,
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

    axios.post("http://localhost:3001/postPayroll", data, config);
    window.location.reload();
  }

  render() {
    // SHORTEN PAYCHECK DATE
    let paycheckShort = "";
    if (this.state.data != undefined) {
      paycheckShort = this.state.data.PaycheckDate
        ? this.state.data.PaycheckDate.substring(0, 10)
        : "";
      if(this.props.employeeType == "FT"){ // ===== DETERMINES IF THE EMPLOYEE IS A FULL TIME WITH A PREVIOUS PAYCHECK
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
              Employee Type: {this.props.employeeType === "FT" ? "Full Time Employee" : "Part Time Employee"} <br />
              Hours Worked: {this.props.hoursWorked} hours <br />
              Salary: ${this.props.salary} <br />
              Taxes: $ 
              {this.props.oasdiTaxes + this.props.hiTaxes + this.state.fed}{" "}
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
           For Users living in NY
          */}
          {this.props.livingState ? 
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
                    <td>80</td>
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
          :  ""
          }
          {/*
           View Recent Check
           For Users living in CT
          */}
          { this.props.livingState == 'CT' ?
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
                    <td>80</td>
                    <td>{this.state.data.GrossPay}</td>
                    <td>{Number(this.props.salary / 26).toFixed(2)}</td>
                    <td>
                      <b>OASDI: </b>
                      {Number(this.props.oasdiTaxes / 26).toFixed(2)}
                      <br></br>
                      <b>Federal: </b>
                      {Number(this.state.CTfed / 26).toFixed(2)}
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
          : ""
          }

          {/*
           View Recent Check
           For Users living in CT
          */}
          { this.props.livingState == 'NJ' ?
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
                    <td>80</td>
                    <td>{this.state.data.GrossPay}</td>
                    <td>
                      <b>OASDI: </b>
                      {Number(this.props.oasdiTaxes / 26).toFixed(2)}
                      <br></br>
                      <b>Federal: </b>
                      {Number(this.state.NJfed / 26).toFixed(2)}
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
          : ""
          }

          {/* PAYROLL MODAL */}

          {/* IF USER LIVES IN NY */}
          {
          this.props.livingState == 'NY'
          ?  <Modal
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
                  <td>80</td>
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
          : ""
          }

          {/* IF USER LIVES IN CT */}
          {
          this.props.livingState == 'CT'
          ?  <Modal
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
                  <td>80</td>
                  {/* 40 beacuse we are assuming the employee is worked 8 hrs per day*/}
                  {/* Divided by 26 because bi-weekly paychecks!!! */}
                  {/* hourly wage ==  annual salary / 26 / 2 / 5 / 8 ====> 
              annual salary / 26 ===> total money every 2 weeks
              total money every 2 weeks / 2 ====> total money every week
              total money every week / 5 ====> total money day
              total money every day / 8 ====> total money per hour                
              */}
                  <td>{Number(this.props.salary / 26).toFixed(2)}</td>
                  <td>
                    <b>OASDI: </b>
                    {Number(this.props.oasdiTaxes / 26).toFixed(2)} <br />
                    <b>Federal: </b>
                    {Number(this.state.CTfed / 26).toFixed(2)} <br />
                    <b>HI: </b>
                    {Number(this.props.hiTaxes / 26).toFixed(2)} <br />
                    <b>Total: </b>
                    {Number(
                      (this.props.oasdiTaxes +
                        this.state.CTfed +
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
                            this.state.CTfed +
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
          : ""
          }

          {/* IF USER LIVES IN NJ */}
          {
          this.props.livingState == 'NJ'
          ?  <Modal
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
                  <td>80</td>
                  {/* 40 beacuse we are assuming the employee is worked 8 hrs per day*/}
                  {/* Divided by 26 because bi-weekly paychecks!!! */}
                  {/* hourly wage ==  annual salary / 26 / 2 / 5 / 8 ====> 
              annual salary / 26 ===> total money every 2 weeks
              total money every 2 weeks / 2 ====> total money every week
              total money every week / 5 ====> total money day
              total money every day / 8 ====> total money per hour                
              */}
                  <td>{Number(this.props.salary / 26).toFixed(2)}</td>
                  <td>
                    <b>OASDI: </b>
                    {Number(this.props.oasdiTaxes / 26).toFixed(2)} <br />
                    <b>Federal: </b>
                    {Number(this.state.NJfed / 26).toFixed(2)} <br />
                    <b>HI: </b>
                    {Number(this.props.hiTaxes / 26).toFixed(2)} <br />
                    <b>Total: </b>
                    {Number(
                      (this.props.oasdiTaxes +
                        this.state.NJfed +
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
                            this.state.NJfed +
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
          : ""
          }
        </>
      )} else{ // ===== IF THE EMPLOYEE IS A PART TIME WITH A PREVIOUS PAYCHECK
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
              Employee Type: {this.props.employeeType === "FT" ? "Full Time Employee" : "Part Time Employee"} <br />
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
                    <td>80</td>
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
                    <td>80</td>
                    {/* 40 beacuse we are assuming the employee is worked 8 hrs per day*/}
                    {/* Divided by 26 because bi-weekly paychecks!!! */}
                    {/* hourly wage ==  annual salary / 26 / 2 / 5 / 8 ====> 
                annual salary / 26 ===> total money every 2 weeks
                total money every 2 weeks / 2 ====> total money every week
                total money every week / 5 ====> total money day
                total money every day / 8 ====> total money per hour                
                */}
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
      )
      }
    } else { //this returns the employee if they are a new employee
      if(this.props.employeeType === "FT"){ //IF THE EMPLOYEE IS A NEW EMPLOYEE
        return(
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
                Employee Type: {this.props.employeeType === "FT" ? "Full Time Employee" : "Part Time Employee"} <br />
                Hours Worked: {this.props.hoursWorked} hours <br />
                Salary: ${this.props.salary} <br />
                Taxes: $
                {this.props.oasdiTaxes + this.props.hiTaxes + this.state.fed}{" "}
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
                      <td>40</td>
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
      } else { //IF EMPLOYEE IS A PART TIMER
        return(
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
                Employee Type: {this.props.employeeType === "FT" ? "Full Time Employee" : "Part Time Employee"} <br />
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
                      <td>40</td>
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

      }
    
    }
  }
}

import React, { useState } from "react";
import { Container, Row, Col, Card, Image, Modal, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PayrollItem.css";

export default function PayrollItem(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let fed = 0;
  if (props.salary > 0 && props.salary <= 8500) {
    fed = ((props.salary * .04));
  } else if (props.salary >= 8501 && props.salary <= 11700) {
    fed = ((props.salary * .045) + 340);
  } else if (props.salary >= 11701 && props.salary <= 13900) {
    fed = ((props.salary * .0525) + 484);
  } else if (props.salary >= 13901 && props.salary <= 21400) {
    fed = ((props.salary * .059) + 600);
  } else if (props.salary >= 21400 && props.salary <= 80650) {
    fed = ((props.salary * .0597) + 1042);
  } else if (props.salary >= 80651 && props.salary <= 215400) {
    fed = ((props.salary * .0633) + 4579);
  } else if (props.salary >= 215401 && props.salary <= 1077550) {
    fed = ((props.salary * .0685) + 13109);
  } else if (props.salary >= 1077551 && props.salary <= 5000000) {
    fed = ((props.salary * .0965) + 72166);
  } else if (props.salary >= 5000001 && props.salary <= 25000000) {
    fed = ((props.salary * .103) + 450683);
  } else if (props.salary >= 25000001) {
    fed = ((props.salary * .109) + 2510683);
  }
  return (
    <li>
        <div className="salary-item">
          <img className="payroll-img" src={props.image} alt={props.name} />
          <div className="salary-item-desc">
            <h5>{props.name}</h5>
            Salary: ${props.salary} <br />
            Taxes: ${(props.oasdiTaxes + props.hiTaxes + fed)} <br />
            Earnings: ${props.salary - (props.oasdiTaxes + props.hiTaxes + fed)}
          </div>
          
        </div>
        <Button variant="primary" onClick={handleShow}>
        View Recent Check
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Paycheck</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th>Employee Name</th>
      <th>Hours Worked</th>
      <th>Gross Pay</th>
      <th>Taxes & Deductions: </th>
      <th>Net Pay</th>
    </tr>
  </thead>
  <tbody>
    <tr>
  <td>{props.name}</td>
      <td>40</td>
      {/* Divided by 26 because bi-weekly paychecks!!! */}
  <td>{Number(props.salary / 26).toFixed(2)}</td>
  <td><b>OASDI: </b>{Number(props.oasdiTaxes/26).toFixed(2)}<br></br>
  <b>Federal: </b>{Number(fed/26).toFixed(2)}<br></br>
  <b>HI: </b>{Number(props.hiTaxes/26).toFixed(2)}<br></br>
  <b>Total: </b>{Number((props.oasdiTaxes + fed + props.hiTaxes)/26).toFixed(2)}</td>
    <td>{Number(props.salary / 26).toFixed(2)-Number((props.oasdiTaxes + fed + props.hiTaxes)/26).toFixed(2)}</td>
    </tr>
    
  </tbody>
</Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </li>
  );
}

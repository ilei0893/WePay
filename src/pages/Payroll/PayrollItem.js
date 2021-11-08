import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import "./PayrollItem.css";

export default function PayrollItem(props) {
  return (
    <li>
        <div className="salary-item">
          <img className="payroll-img" src={props.image} alt={props.name} />
          <div className="salary-item-desc">
            <h5>{props.name}</h5>
            Salary: ${props.salary} <br />
            Taxes: ${props.taxes} <br />
            Earnings: ${props.earnings}
          </div>
        </div>
    </li>
  );
}

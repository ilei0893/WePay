import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

import { Link } from 'react-router-dom'
import "./PayrollItem.css";
export default function PayrollItem(props) {
  return (
    <li>
        <div>
            <div className="">
              <img className="payroll-img" src={props.image} alt={props.name} />
              <h3>{props.name}</h3>
              <h5>Salary: ${Number(props.salary).toFixed(2)}</h5>
              <h5>Taxes: ${Number(props.oasdiTaxes + props.hiTaxes + props.fedTaxes).toFixed(2)}</h5>
              <h5>Earnings: ${Number(props.salary - (props.oasdiTaxes + props.hiTaxes + props.fedTaxes)).toFixed(2)}</h5>
              <Link style={{ textDecoration: 'none', color: 'blue' }} to="/paycheck">View Check</Link>
            </div>
        </div>
    </li>
  )
}

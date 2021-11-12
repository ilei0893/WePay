import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

import { Link } from 'react-router-dom'
import "./PayrollItem.css";
export default function PayrollItem(props) {
  return (
    <li>
        <div>
            <div className="salary-item">
              <img className="payroll-img" src={props.image} alt={props.name} />
              <div className="salary-item-desc">
              <h3>{props.name}</h3>
              Salary: ${Number(props.salary).toFixed(2)}<br />
              Taxes: ${Number(props.oasdiTaxes + props.hiTaxes + props.fedTaxes).toFixed(2)}<br />
              Earnings: ${Number(props.salary - (props.oasdiTaxes + props.hiTaxes + props.fedTaxes)).toFixed(2)}<br />
              <Link style={{ textDecoration: 'none', color: 'blue' }} to="/paycheck">View Check</Link>
            </div>
            </div>
        </div>
    </li>
  );
}

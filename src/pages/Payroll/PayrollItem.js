import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import "./PayrollItem.css";

export default function PayrollItem(props) {
  return (
    <li>
        <div>
            <div className="">
              <img src={props.image} alt={props.name} />
              <h3>{props.name}</h3>
              <h5>Salary: ${props.salary}</h5>
              <h5>Taxes: ${props.taxes}</h5>
              <h5>Earnings: ${props.earnings}</h5>
            </div>
        </div>
    </li>
  )
}
import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import PayrollItem from "./PayrollItem";
import "./PayrollList.css";

export default function PayrollList(props) {
  if (props.items.length === 0) {
    return (
      <Card>
        <Card.Body>This is some text within a card body.</Card.Body>
        <div className="center">
          <h2>No User's to see!</h2>
        </div>
      </Card>
    );
  }
console.log(props.items);
  return (
    <Container>
      {props.items.map((user) => (
        <div className="users-list">
          <Card>
            <Card.Body>
              <PayrollItem
                key={user.id}
                id={user.id}
                image={user.image}
                name={user.name}
                employeeType={user.employeeType}
                position={user.position}
                salary={user.salary}
                workState={user.workState}
                oasdiTaxes={user.salary * 0.062}
                hiTaxes={user.salary * 0.0145}
                hoursWorked={user.hoursWorked}
                hourlyRate={user.hourlyRate}
                workingHours={user.workingHours}
              />
            </Card.Body>
          </Card>
        </div>
      ))}
    </Container>
  );
}
//taxes that need to be listed
/*
FICA-OASDI: 6.2%
FICA-HI: 1.45%
FEDERAL: 
*/

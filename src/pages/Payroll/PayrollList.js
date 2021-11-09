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
  const fed= 0;
  if(props.salary >= 0 && props.salary <= 9875) {
    fed = .1;
  } else if (props.salary >= 9876 && props.salary <= 40125) {
    fed = (props.salary * .12) + 987.50;
  } else if (props.salary >= 40126 && props.salary <= 85525) {
    fed = (props.salary * .22) + 4617.50;
  } else if (props.salary >= 85526 && props.salary <= 163300) {
    fed = (props.salary * .24) + 14605.50;
  } else if (props.salary >= 163301 && props.salary <= 207350) {
    fed = (props.salary * .32) + 33271.50;
  } else if (props.salary >= 207351 && props.salary <= 518400) {
    fed = (props.salary * .35) + 47367.50;
  } else if (props.salary >= 518401) {
    fed = (props.salary * .37) + 156235;
  }
  return (
      <Container>
    <ul className="users-list">
      {props.items.map((user) => (
          <Card>
        <PayrollItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          salary={user.salary}
          oasdiTaxes={user.salary * 0.062}
          hiTaxes={user.salary * 0.0145}
          fedTaxes={fed}
        />
        </Card>
      ))}
    </ul>
    </Container>
  );
}
//taxes that need to be listed 
/*
FICA-OASDI: 6.2%
FICA-HI: 1.45%
FEDERAL: 
*/
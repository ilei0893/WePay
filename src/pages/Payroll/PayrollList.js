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
                salary={user.salary}
                oasdiTaxes={user.salary * 0.062}
                hiTaxes={user.salary * 0.0145}
              />
            </Card.Body>
          </Card>
        </div>
      ))}
    </Container>
  );
      
}

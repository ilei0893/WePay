import React from "react";
import { Card, Button } from "react-bootstrap";
export default function EmployeeMenu() {
  return (
    <>
      <Card>
        <Card.Title style={{textAlign:"center"}}>Employee Menu</Card.Title>
        <Card.Body style={{padding:"10px 20px"}}>
          <div className="d-grid gap-2">
            <Button variant="secondary" size="lg" href="/add-employee">
              Add Employee
            </Button>
            <Button variant="secondary" href="/modify-employee" size="lg">
              Modify Employee
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

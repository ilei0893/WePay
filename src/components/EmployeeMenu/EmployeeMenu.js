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
            <Button variant="secondary" size="lg" href="#">
              Modify Employee
            </Button>
            <Button variant="secondary" size="lg" href="#">
              Search Employee
            </Button>
            <Button variant="secondary" size="lg" href="#">
              Delete Employee
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

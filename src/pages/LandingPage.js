import React, { Component } from "react";
import { Container, Navbar, Nav, NavbarBrand, Button } from "react-bootstrap";

export default class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <Navbar bg="light" light expand="md">
          <Container md={4}>
            <NavbarBrand href="/">WePAY</NavbarBrand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <Nav.Link href="#pricing">About Us</Nav.Link>
            </Nav>
            <Button variant="primary">Sign Up</Button>
            <Button variant="primary">Log In</Button>
          </Container>
        </Navbar>
      </div>
    );
  }
}

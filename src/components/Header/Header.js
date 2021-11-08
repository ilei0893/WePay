import React from "react";
import {
  Collapse,
  Navbar,
  Nav,
} from "react-bootstrap";
import { IconContext } from "react-icons";
import { FcMenu } from "react-icons/fc";

export default function Header(props) {
  return (
    <div className="header">
      <Navbar color="light" light expand="md">
        <IconContext.Provider
          value={{ size: "2em", className: "toggle-button" }}
        >
          <FcMenu onClick={props.collapseHandler} />
        </IconContext.Provider>
        {/* <NavbarBrand href="/">WePAY</NavbarBrand> */}
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

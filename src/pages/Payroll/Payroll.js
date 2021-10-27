import React, { Component } from "react";
import { Container, Row, Col, Card, Image, Table } from "react-bootstrap";
import Calendar from "react-calendar";
import PayrollList from "../Payroll/PayrollList";
//css
import "./Payroll.css";
import "react-calendar/dist/Calendar.css";
//DUMMY DATA
const USERS = [
  {
    id: "u1",
    name: "Chris Artrip",
    image:
      "https://i1.wp.com/www.natureswaycolonic.co.uk/wp-content/uploads/2018/10/avatar-anonymous-300x300.png",
    salary: 123242,
    earnings: 10000,
    taxes: 9997,
  },
  {
    id: "u2",
    name: "Ivan Lei",
    image:
      "https://i1.wp.com/www.natureswaycolonic.co.uk/wp-content/uploads/2018/10/avatar-anonymous-300x300.png",
    salary: 43534,
    earnings: 0,
    taxes: 0,
  },
  {
    id: "u3",
    name: "Giselle Domingo",
    image:
      "https://i1.wp.com/www.natureswaycolonic.co.uk/wp-content/uploads/2018/10/avatar-anonymous-300x300.png",
    salary: 546543,
    earnings: 0,
    taxes: 0,
  },
  {
    id: "u4",
    name: "Naeim Salib",
    image:
      "https://i1.wp.com/www.natureswaycolonic.co.uk/wp-content/uploads/2018/10/avatar-anonymous-300x300.png",
    salary: 356744,
    earnings: 0,
    taxes: 0,
  },
  {
    id: "u5",
    name: "Chris Artrip(Again :P)",
    image:
      "https://i1.wp.com/www.natureswaycolonic.co.uk/wp-content/uploads/2018/10/avatar-anonymous-300x300.png",
    salary: 3456452,
    earnings: 0,
    taxes: 0,
  },
];
export default class Payroll extends Component {
  render(props) {
    return (
      <PayrollList items={USERS} />
    );
  }
}

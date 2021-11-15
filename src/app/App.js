//comment one or the other to check diff pages
import Layout from "../pages/Layout";
import Home from "../pages/LandingPage/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Employement from "../pages/Employement/Employment";
import AddEmployee from "../pages/AddEmployee/AddEmployee";
import Inbox from "../pages/Inbox/Inbox";
import Payroll from "../pages/Payroll/Payroll";
import Benefits from "../pages/Benefits/Benefits";
import ModifyEmployee from "../pages/ModifyEmployee/ModifyEmployee";
import PayCheck from "../pages/Paycheck/PayCheck";

import EmployeeLayout from "../employee-pages/EmployeeLayout";
import EmployeeDashboard from "../employee-pages/Dashboard/EmployeeDashboard";
import EmployeeView from "../employee-pages/EmployeeView/EmployeeView";

import { Login } from "../components";

import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import useToken from './useToken';

function App() {

  const { token, setToken } = useToken();
  if (!token) {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login setToken={setToken} />
          </Route>
        </Switch>
      </Router>
    );
  } else
    return (
      <Router>
        <Switch>
        <Route exact path="/">
            <Home />
          </Route>
          <Route path="/dashboard">
            <Layout page={<Dashboard />} />
          </Route>
          <Route path="/employment">
            <Layout page={<Employement />} />
          </Route>
          <Route path="/inbox">
            <Layout page={<Inbox />} />
          </Route>
          <Route path="/add-employee">
            <Layout page={<AddEmployee />} />
          </Route>
          <Route path="/modify-employee">
            <Layout page={<ModifyEmployee />} />
          </Route>
          <Route path="/payroll">
            <Layout page={<Payroll />} />
          </Route>
          <Route path="/benefits">
            <Layout page={<Benefits />} />
          </Route>
          <Route path="/check">
            <Layout page={<PayCheck />} />
          </Route>
          <Route exact path="/employee-dashboard">
            <EmployeeLayout page={<EmployeeDashboard />} />
          </Route>
          <Route exact path="/employee-view">
            <EmployeeLayout page={<EmployeeView />} />
          </Route>
        </Switch>
      </Router>
    );
}

export default App;

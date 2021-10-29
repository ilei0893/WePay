//comment one or the other to check diff pages
import Layout from "../pages/Layout";
import Home from "../pages/LandingPage/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Employement from "../pages/Employement/Employment";
import AddEmployee from "../pages/AddEmployee/AddEmployee";
import Inbox from "../pages/Inbox/Inbox";
import Payroll from "../pages/Payroll/Payroll";
import Benefits from "../pages/Benefits/Benefits";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
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
        <Route path="/Payroll">
          <Layout page={<Payroll />} />
        </Route>
        <Route path="/Benefits">
          <Layout page={<Benefits />} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

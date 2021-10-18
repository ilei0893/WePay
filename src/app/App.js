//comment one or the other to check diff pages
<<<<<<< HEAD:src/App.js
import Layout from "./pages/Layout";
import Home from "./pages/LandingPage/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Employement from "./pages/Dashboard/Employment";
import AddEmployee from "./pages/Dashboard/AddEmployee";
import Inbox from "./pages/Dashboard/Inbox";
=======
import Layout from "../pages/Layout";
import Home from "../pages/LandingPage/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Employement from "../pages/Dashboard/Employment";
import Inbox from "../pages/Dashboard/Inbox";
>>>>>>> c5a2046a2bf6cb6d40d4a47e798136f7fd4e87c9:src/app/App.js
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
          <Layout page={<Dashboard />}/>
        </Route>
        <Route path="/employment">
          <Layout page={<Employement />}/>
        </Route>
        <Route path="/inbox">
          <Layout page={<Inbox />}/>
        </Route>
        <Route path="/add-employee">
          <Layout page={<AddEmployee />}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

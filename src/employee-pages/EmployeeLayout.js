import React, { Component } from "react";
import { EmployeeSidebar, EmployeeHeader } from "../employee-components";


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// This is the basic layout of the dashboard, the sidebar and header will stay consistent every new page
export default class EmployeeLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false,
    };
    this.collapseHandler = this.collapseHandler.bind(this);
  }

  collapseHandler = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });

    const main = document.querySelector('.main');
    if(this.state.isCollapsed == false){
      main.classList.add('main-collapsed');
    } else {
      main.classList.remove('main-collapsed');
    }
  };

  render() {
    return (
      <div className="test">
        <div>
          <EmployeeSidebar isCollapsed={this.state.isCollapsed} />
        </div>
        <div className="main">
          <EmployeeHeader
            isCollapsed={this.state.isCollapsed}
            collapseHandler={this.collapseHandler}
          />
          {this.props.page}
        </div>
      </div>
    );
  }
}

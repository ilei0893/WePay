import React, { Component } from "react";
import { Sidebar, Header } from "../components";


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// This is the basic layout of the dashboard, the sidebar and header will stay consistent every new page
export default class Layout extends Component {
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
  };

  render() {
    return (
      <div className="test">
        <div>
          <Sidebar isCollapsed={this.state.isCollapsed} />
        </div>
        <div className="main">
          <Header
            isCollapsed={this.state.isCollapsed}
            collapseHandler={this.collapseHandler}
          />
          {this.props.page}
        </div>
      </div>
    );
  }
}

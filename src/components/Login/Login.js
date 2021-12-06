import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import axios from "axios";
import OnlineReportImage from "../../assets/Online_report_Outline.png"; //logo img

import PropTypes from "prop-types"; //USE NPM START IF U DONT HAVE THISSSS

import "./Login.css";

export default function Login(props) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [isValidated, setIsValidated] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  /// FIXME: causes infinite loop !!!!!!!!!!!  this is supposed to redirect the user if they are already logged in
  // useEffect(() => {
  //   if(props.token){
  //     const tokenString = sessionStorage.getItem('token');
  //     const token = JSON.parse(tokenString);
  //     if(token.data.User_Type === 'HR'){
  //       window.document.location = '/dashboard'
  //     } else{
  //       window.document.location = '/employee-dashboard'
  //     }
  //   }  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setIsValidated(true);

    const token = await loginUser({
      username,
      password,
    });
    console.log(token.data);
    if(token.data === undefined){
      setUserNotFound(true)
    } else {
      setUserNotFound(false)
      if(token.data.User_Type === 'HR'){
        window.location.href = '/dashboard'
      } else{
        window.location.href = '/employee-dashboard'
      }
      props.setToken(token);
    }

  };
  
  async function loginUser(credentials) {
    return fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }
if(userNotFound === false){
  return (
    <div>
      <Form className="login-form" onSubmit={handleSubmit} validated={isValidated}>
      <img src={OnlineReportImage} width="150px" />
        <h1>Log In</h1>
        <Form.Label>
          Username
          <Form.Control
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </Form.Label>
        <Form.Label>
          <p>Password</p>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Label>
        <div>
          <Button type="button" href="/" style={{ marginRight: "10px" }}>
            Go Back
          </Button>
          <Button type="submit">Log In</Button>
        </div>
      </Form>
    </div>
  )} else return(
    <div>
    <Form className="login-form" onSubmit={handleSubmit} validated={isValidated}>
    <img src={OnlineReportImage} width="150px" />
      <h1>Log In</h1>
      <Form.Label>
        Username
        <Form.Control
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </Form.Label>
      <Form.Label>
        <p>Password</p>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Label>
      <div>User not found, please make sure the information is correct</div>
      <div>
        <Button type="button" href="/" style={{ marginRight: "10px" }}>
          Go Back
        </Button>
        <Button type="submit">Log In</Button>
      </div>
    </Form>
  </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import axios from "axios";

import PropTypes from "prop-types"; //USE NPM START IF U DONT HAVE THISSSS

import "./Login.css";

export default function Login(props) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  /// FIXME: causes infinite loop !!!!!!!!!!!
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
    const token = await loginUser({
      username,
      password,
    });
    console.log(token.data.User_Type);
    if(token.data.User_Type === 'HR'){
      window.location.href = '/dashboard'
    } else{
      window.location.href = '/employee-dashboard'
    }
    props.setToken(token);
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

  return (
    <div>
      <Form className="login-form" onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <Form.Label>
          Username
          <Form.Control
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Label>
        <Form.Label>
          <p>Password</p>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
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
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

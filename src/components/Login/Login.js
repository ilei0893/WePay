import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";

import PropTypes from "prop-types"; //USE NPM START IF U DONT HAVE THISSSS

import "./Login.css";


export default function Login({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
    window.location.href = '/dashboard';
  };


  async function loginUser(credentials) {
    return fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }
  
  return (
    <div>
      <Form className="login-form" onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <Form.Label>
          Email
          <Form.Control type="text" onChange={e => setUserName(e.target.value)} />
        </Form.Label>
        <Form.Label>
          <p>Password</p>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Label>
        <div>
        <Button type="button" href="/" style={{ marginRight: "10px" }}>
            Go Back
          </Button>
          <Button type="submit">
            Log In
          </Button>
        </div>
      </Form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
}
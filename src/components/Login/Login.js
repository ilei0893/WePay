import React, { useState } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";

async function loginUser(credentials) {
  return fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };
  return (
    <div className="login">
      <Modal
        show={this.state.showLogin}
        fullscreen={false}
        onHide={this.handleLoginModal}
        className="login"
        onSubmit={handleSubmit}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Container
            style={{
              width: "300px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Form>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  type="username"
                  placeholder="Enter Username"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Form>
            <br />
            <Button
              variant="primary"
              type="submit"
              href="/dashboard"
              // onClick={this.handleSubmit}
            >
              Log In
            </Button>
          </Container>
        </Modal.Body>
      </Modal>

      <Modal
        show={this.state.showSignUp}
        fullscreen={false}
        onHide={this.handleSignUpModal}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Container
            style={{
              width: "300px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Form>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  type="username"
                  placeholder="Enter Username"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              {/* <Form.Group>
        <Form.Label>User Type</Form.Label>
        <FloatingLabel
          controlId="select-type"
          label="Select your type"
        >
          <Form.Select
            name="userType"
            type="radio"
            onChange={this.handleChange}
          >
            <option>Select a user type</option>
            <option>Employee</option>
            <option>HR</option>
          </Form.Select>
        </FloatingLabel>
      </Form.Group> */}
              <br />
              <Button
                variant="primary"
                type="submit"
                href="/employee-dashboard"
                // onClick={this.handleSubmit}
              >
                Log In
              </Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

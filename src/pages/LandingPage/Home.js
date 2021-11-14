import React, { Component, useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavbarBrand,
  Button,
  Image,
  Modal,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import OnlineReportImage from "../../assets/Online_report_Outline.png";
import AOS from "aos";
import "aos/dist/aos.css";
import "./LandingPage.css";
//icons
import { FaLock, FaHouseUser, FaLaptop, FaRing } from "react-icons/fa";

async function loginUser(credentials) {
  return fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      showLogin: false,
      showSignUp: false,
      username: "",
      password: "",
      userType: "",
    };
    this.handleLoginModal = this.handleLoginModal.bind(this);
    this.handleSignUpModal = this.handleSignUpModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    AOS.init({
      duration: 2000,
    });
  }

  handleLoginModal() {
    this.setState({
      showLogin: !this.state.showLogin,
    });
  }

  handleSignUpModal() {
    this.setState({
      showSignUp: !this.state.showSignUp,
    });
  }

  handleChange(event) {
    const target = event.target;
    console.log(target);
    const value = target.type === "radio" ? target.checked : target.value;
    console.log(value);
    const name = target.name;
    console.log(name);
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(event) {
    // alert(
    //   "A name was submitted:" +
    //     this.state.username +
    //     " " +
    //     this.state.password +
    //     " " +
    //     this.state.userType
    // );
    event.preventDefault();
  }

  render() {
    function Login({ setToken }) {
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
    return (
      <div className="landing-page">
        <Login />
        {/* NAVBAR */}
        <Navbar variant="light" expand="md" className="landing-nav">
          <Container md={4}>
            <NavbarBrand href="/">WePAY</NavbarBrand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Button
                className="landing-button"
                variant="primary"
                onClick={this.handleSignUpModal}
              >
                Employee Log In
              </Button>
              <Button
                className="landing-button"
                variant="primary"
                onClick={this.handleLoginModal}
              >
                HR Log In
              </Button>
            </Navbar.Collapse>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Container>
        </Navbar>

        {/* MAIN PAGE */}
        <div className="main_landing">
          <Image
            className="main__img"
            data-aos="fade-right"
            src={OnlineReportImage}
            fluid
          />
          <div className="overlay" data-aos="fade-up">
            <div className="headline">WePAY, A new payroll system for you.</div>
            <div className="description">Better payroll. Better you.</div>
          </div>
        </div>
        <div className="about">
          <div
            className="headline"
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            What we offer
          </div>
          <div className="about-cards">
            <div className="about-card">
              <FaLock className="about-icons" />
              <p>
                We offer a system that keeps your employers information and
                paystub secure.
              </p>
            </div>
            <div className="about-card">
              <FaHouseUser className="about-icons" />
              <p>Perfect for any business, big or small.</p>
            </div>
            <div className="about-card">
              <FaLaptop className="about-icons" />
              <p>Easy to use UI for quicker approvals and quicker payments.</p>
            </div>
          </div>
        </div>
        <div className="pricing">
          <div
            className="headline"
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            Pricing
          </div>
          <div className="about-cards">
            <div className="pricing-card">
              <h6 style={{ textAlign: "center" }}>$25/month</h6>
              <ul>
                <li>- Payroll Service</li>
                <li>- Advanced Product Support</li>
              </ul>
            </div>
            <div className="pricing-card">
              <h6 style={{ textAlign: "center" }}>$40/month</h6>
              <ul>
                <li>- Health Benefits</li>
                <li>- Next-day Direct Deposit</li>
                <li>- Plus everything included in the previous tiers</li>
              </ul>
            </div>
            <div className="pricing-card">
              <h6 style={{ textAlign: "center" }}>$70/month</h6>
              <ul>
                <li>- Same-day direct deposit</li>
                <li>- Personal HR Advisor</li>
                <li>- Plus everything included in the previous tiers</li>
              </ul>
            </div>
          </div>
        </div>
        {/* FOOTER */}
        <div className="footer">
          <h1>Interested? Contact us.</h1>
          <div>
            We can be reached at <b>wePayTeam@wePay.com</b>
          </div>
        </div>
      </div>
    );
  }
}

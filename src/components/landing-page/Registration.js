import React from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios';

class Registration extends React.Component {
  state = {
    date: new Date(),
    gender: ""
  };

  submitRegistration = e => {
    //TODO: validate form (check if empty)

    let registration = {}
    registration.firstName = e.target.formGridFirstName.value
    registration.lastName = e.target.formGridLastName.value
    registration.email = e.target.formGridEmail.value
    registration.password = e.target.formGridPassword.value
    registration.birthday = e.target.datePicker.value
    registration.gender = this.state.gender

    Axios.post('/registration', registration)
    .then(res => {
      console.log("Successfully sent registration data to backend", registration)
      console.log(res)
    })
    .catch(err => {
      console.error("Failed to send registration data to backend", err)
    })

    e.preventDefault()
  }

  render() {
    return (
      <div style={{ backgroundColor: "#e9ebee", height: "100%", width: "100%" }}>
        <Container>
          <div style={styles.registration}>
            <h3 style={{ color: "#343a40" }}>Create an account</h3>

            <Form onSubmit={this.submitRegistration} style={styles.form}>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Control required type="text" placeholder="First Name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Control required type="text" placeholder="Last Name" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Control required style={{ width: "50%" }} type="email" placeholder="Email" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Control required type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridRepeatPassword">
                  <Form.Control required type="password" placeholder="Repeat password" />
                </Form.Group>
              </Form.Row>

              <h5 style={{ marginBottom: '20px', marginTop: '10px', color: "#343a40" }}>Birthday</h5>

              <Form.Row>
                <DatePicker id="datePicker" selected={this.state.date} onChange={(newDate) => this.setState({date: newDate})} />
              </Form.Row>

              <Form.Row>
                <div style={{ margin: "30px 0 0 0" }} key={'inline-radio'} className="mb-3">
                  <Form.Check
                    checked={this.state.gender === "Male"}
                    onChange={() => this.setState({gender: "Male"})}
                    inline
                    label="Male"
                    type='radio'
                    id={"inline-radio-1"}
                  />
                  <Form.Check
                    checked={this.state.gender === "Female"}
                    onChange={() => this.setState({gender: "Female"})}
                    inline
                    label="Female"
                    type='radio'
                    id={"inline-radio-2"}
                  />
                  <Form.Check
                    checked={this.state.gender === "Other"}
                    onChange={() => this.setState({gender: "Other"})}
                    inline
                    label="Other"
                    type='radio'
                    id={"inline-radio-3"}
                  />
                </div>
              </Form.Row>

              <Button size="lg" style={{ marginTop: "25px" }} variant="primary" type="submit">Register</Button>

            </Form>
          </div>
        </Container>
      </div>
    );
  }
}

const styles = {
  form: {
    paddingTop: "20px",
    paddingBottom: "40px"
  },
  registration: {
    paddingTop: "50px",
    paddingBottom: "200px"
  }
};


export default Registration;
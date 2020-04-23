import React from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios';

import { sendLog, consoleLog } from '../../../../utils';


class Registration extends React.Component {
  state = {
    date: new Date("August 3, 1997"),
    gender: "Male"
  };

  submitRegistration = e => {
    const form = e.target;

    if (form.formGridPassword.value !== form.formGridRepeatPassword.value) {
      this.props.showPasswordsDontMatchAlert(true);
    } else {
      let registrationData = {};
      registrationData.firstName = form.formGridFirstName.value;
      registrationData.lastName = form.formGridLastName.value;
      registrationData.email = form.formGridEmail.value;
      registrationData.password = form.formGridPassword.value;
      registrationData.birthday = form.datePicker.value;
      registrationData.gender = this.state.gender;

      Axios.post('/users', registrationData)
        .then(res => {
          consoleLog(res);
          this.props.showEmailVerificationAlert(true);
        })
        .catch(err => {
          this.props.showSomethingWentWrongAlert(true, err.response.data.message);
          sendLog(err, "registration error");
        });
    }

    e.preventDefault();
  };

  render() {
    return (
      <Container>
        <div style={styles.registration}>
          <h3 style={styles.title}>Create an account</h3>

          <Form style={styles.form} onSubmit={this.submitRegistration}>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Control required
                  type="text"
                  placeholder="First Name"
                  pattern="[a-zA-Z_0-9]*"
                  minLength="3"
                  maxLength="20"
                  title="[a-zA-Z_0-9]*" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Control required
                  type="text"
                  placeholder="Last Name"
                  pattern="[a-zA-Z_0-9]*"
                  minLength="3"
                  maxLength="20"
                  title="[a-zA-Z_0-9]*" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Control required
                  style={{ width: "50%" }}
                  type="email"
                  placeholder="Email"
                  maxLength="254" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Control required
                  type="password"
                  placeholder="Password"
                  minLength="8"
                  maxLength="256"
                  pattern="[a-zA-Z0-9_$!%^*#/\()?]*"
                  title="[a-zA-Z0-9_$!%^*#/\()?]*" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRepeatPassword">
                <Form.Control required
                  type="password"
                  placeholder="Repeat password"
                  minLength="8"
                  maxLength="256"
                  pattern="[a-zA-Z0-9_$!%^*#/\()?]*"
                  title="[a-zA-Z0-9_$!%^*#/\()?]*" />
              </Form.Group>
            </Form.Row>

            <h5 style={{ marginBottom: '20px', marginTop: '10px', color: "#343a40" }}>Birthday</h5>

            <Form.Row>
              <DatePicker id="datePicker"
                selected={this.state.date}
                onChange={(newDate) => this.setState({ date: newDate })} />
            </Form.Row>

            <Form.Row>
              <div style={{ margin: "30px 0 0 0" }} key={'inline-radio'} className="mb-3">
                <Form.Check
                  checked={this.state.gender === "Male"}
                  onChange={() => this.setState({ gender: "Male" })}
                  inline
                  label="Male"
                  type='radio'
                  id={"inline-radio-1"}
                />
                <Form.Check
                  checked={this.state.gender === "Female"}
                  onChange={() => this.setState({ gender: "Female" })}
                  inline
                  label="Female"
                  type='radio'
                  id={"inline-radio-2"}
                />
                <Form.Check
                  checked={this.state.gender === "Other"}
                  onChange={() => this.setState({ gender: "Other" })}
                  inline
                  label="Other"
                  type='radio'
                  id={"inline-radio-3"}
                />
              </div>
            </Form.Row>

            <Button size="lg" style={styles.registerButton} variant="primary" type="submit">Register</Button>

          </Form>
        </div>
      </Container>
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
  },
  title: {
    color: "#343a40"
  },
  registerButton: {
    marginTop: "25px"
  }
};

export default Registration;

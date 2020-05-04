import React from 'react';
import { Container, Alert, Form, Button, Col, Navbar } from "react-bootstrap";
import Axios from 'axios';

import { PasswordsDontMatchAlert, SomethingWentWrongAlert } from '../../shared/Alerts';

import { sendLog } from '../../../utils';

class ResetPasswordPage extends React.Component {

  state = {
    passwordsDontMatchAlert: false,
    somethingWentWrongAlert: false,
    confirmationAlert: false
  }

  showPasswordsDontMatchAlert = (show) => {
    this.setState({ passwordsDontMatchAlert: show });
  };

  showSomethingWentWrongAlert = (show) => {
    this.setState({ somethingWentWrongAlert: show });
  };

  submit = (e) => {
    const password = e.target.formGridPassword.value;

    if (password !== e.target.formGridRepeatPassword.value) {
      this.showPasswordsDontMatchAlert(true);
    }

    Axios.put(process.env.REACT_APP_NODE_URL + '/reset-password', { newPassword: password, resetIDHash: this.state.resetIDHash })
      .then(res => {
        this.setState({
          confirmationAlert: true
        })
      })
      .catch(() => {
        this.showSomethingWentWrongAlert(true);
      });

    e.preventDefault();
  }

  componentDidMount() {
    Axios.get(process.env.REACT_APP_NODE_URL + '/reset-password', {
      params: {
        resetID: this.props.match.params.resetID
      }
    })
      .then(res => {
        this.setState({
          resetIDValid: true,
          resetIDHash: res.data.resetIDHash
        });

      }).catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            this.setState({
              resetIDValid: false
            });
          } else { // no connection from backend
            this.showSomethingWentWrongAlert(true);
            sendLog(err, "connection error");
          }
        }
      });
  }

  render() {

    const ResetPassword = () => {
      return (
        <Container style={{ marginTop: "50px", width: "600px" }}>
          <Form onSubmit={this.submit}>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Control required
                  type="password"
                  placeholder="New password"
                  minLength="8"
                  maxLength="72"
                  pattern="[a-zA-Z0-9_$!%^*#/\()?]*"
                  title="[a-zA-Z0-9_$!%^*#/\()?]*" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRepeatPassword">
                <Form.Control required
                  type="password"
                  placeholder="Repeat new password"
                  minLength="8"
                  maxLength="72"
                  pattern="[a-zA-Z0-9_$!%^*#/\()?]*"
                  title="[a-zA-Z0-9_$!%^*#/\()?]*" />
              </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit">Submit</Button>

          </Form>
        </Container>
      );
    }

    const InvalidInfo = () => {
      return (
        <Container style={{ width: "600px" }}>
          <Alert className="mt-5" variant="danger">
            <Alert.Heading>Invalid!</Alert.Heading>
            <p>
              The password reset link is invalid or already expired.
            </p>
          </Alert>
        </Container>
      );
    }

    const ConfirmationAlert = () => {
      return (
        <Container style={{ width: "600px" }}>
          <Alert className="mt-5" variant="success">
            <Alert.Heading>Password changed!</Alert.Heading>
            <p>
              Your password got changed. You can now go and log in!
            </p>
            <hr />
            <a href="/">Back to sign-in</a>
          </Alert>
        </Container>
      )
    }

    return (
      <React.Fragment>
        <Navbar style={{ padding: '10px' }} bg="dark" variant="dark">
          <Container>
            <Navbar.Brand style={{ fontSize: '30px' }} href="#home">Social-Network</Navbar.Brand>
          </Container>
        </Navbar>

        {this.state.somethingWentWrongAlert ? <SomethingWentWrongAlert
          showAlert={this.showSomethingWentWrongAlert} /> : null}

        {this.state.passwordsDontMatchAlert ? <PasswordsDontMatchAlert
          showAlert={this.showPasswordsDontMatchAlert} /> : null}
        
        {this.state.confirmationAlert ? <ConfirmationAlert/> : null}

        {typeof this.state.resetIDValid !== 'undefined' && !this.state.confirmationAlert ? this.state.resetIDValid ?
          <ResetPassword /> : <InvalidInfo /> : null}

      </React.Fragment>
    );
  }

}

export default ResetPasswordPage;
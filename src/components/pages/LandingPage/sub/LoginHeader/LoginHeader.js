import React from 'react';
import { Modal, Navbar, Container, Form, FormControl, Button, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

import { sendLog, consoleLog } from '../../../../../utils';
import './LoginHeader.css';

class LoginHeader extends React.Component {

  state = {
    show: false
  }

  handleClose = () => this.setState({show: false});
  handleShow = () => this.setState({show: true});

  sendPasswordResetEmail = e => {
    const data = {email: e.target.email.value}

    Axios.post('/reset-password', data)
      .then(_ => {
        this.handleClose();
      })
      .catch(err => {
        sendLog(err, "connection error");
      });

    e.preventDefault();
  }

  login = e => {

    let loginData = {}
    loginData.email = e.target.email.value;
    loginData.password = e.target.password.value;
        
    Axios.post('/login', loginData)
      .then(res => {
        consoleLog(res);
        this.props.history.push('/frontpage');
        this.setState({
          loggedIn: true
        });
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 403){
            this.props.showEmailVerificationAlert(true); // account not active
          } else {
            this.props.showLoginFailedAlert(true); // wrong credentials
          }
        } else if (err.request) { // no connection from backend
          this.props.showLoginFailedAlert(true);
          sendLog(err, "connection error");
        }
      });

    e.preventDefault();
  };

  render() {
    return (
      <React.Fragment>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Reset Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Please enter your email address. We'll send you a link to reset your password via email.</p>

            <Form onSubmit={this.sendPasswordResetEmail}>
              <Form.Row>
                <Form.Group as={Col} controlId="email">
                  <Form.Control required
                      style={{ width: "100%" }}
                      type="email"
                      placeholder="Email"
                      maxLength="254" />
                </Form.Group>
              </Form.Row>
            
            <hr></hr>

            <div style={{float: "right"}}>
              <Button style={{marginRight: "10px"}} variant="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Send
              </Button>
            </div>

            </Form>
          </Modal.Body>
        </Modal>

        <Navbar style={this.styles.navbar} bg="dark" variant="dark">
          <Container>
            <Navbar.Brand style={this.styles.logo} href="#home">Social-Network</Navbar.Brand>
            <Form onSubmit={this.login} inline>
              <FormControl style={{maxWidth: "250px"}} maxLength="254"
                id="email"
                type="email"
                placeholder="Email"
                className="mr-sm-2" />
              <FormControl style={{maxWidth: "250px"}} minLength="8"
                maxLength="256"
                pattern="[a-zA-Z0-9_$!%^*#/\()?]*"
                title="[a-zA-Z0-9_$!%^*#/\()?]*"
                id="password"
                type="password"
                placeholder="Password"
                className="mr-sm-2" />
              <Button id="login" type="submit">Log In</Button>
            </Form>
            <Button style={{textDecoration: "none"}} onClick={this.handleShow} variant="link">Forgot your password?</Button>
          </Container>
        </Navbar>
      </React.Fragment>
    )
  }

  styles = {
    navbar: {
      padding: '10px'
    },
    logo: {
      fontSize: '30px'
    }
  };
}

export default withRouter(LoginHeader);

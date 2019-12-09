import React from 'react';
import { Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

import { sendLog, consoleLog } from '../../../../../utils';
import './LoginHeader.css';

class LoginHeader extends React.Component {

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
        // wrong credentials
        if (err.response) {
          this.props.showLoginFailedAlert(true);
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
                maxLength="25"
                pattern="[a-zA-Z0-9_$!%^*#/\()?]*"
                title="[a-zA-Z0-9_$!%^*#/\()?]*"
                id="password"
                type="password"
                placeholder="Password"
                className="mr-sm-2" />
              <Button id="login" type="submit">Log In</Button>
            </Form>
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

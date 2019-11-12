import React from 'react';
import { Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

class Header extends React.Component {

  login = e => {
    let loginData = {}
    loginData.email = e.target.email.value;
    loginData.password = e.target.password.value;

    Axios.post('/login', loginData)
      .then(res => {
        console.log("Successful logged in!")
        this.props.history.push('/frontpage')
      })
      .catch((error) => {
        this.props.showLoginFailedAlert();
        console.error(error.response);
      });

    e.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <Navbar style={{ padding: '10px' }} bg="dark" variant="dark">
          <Container>
            <Navbar.Brand style={{ fontSize: '30px' }} href="#home">Social-Network</Navbar.Brand>
            <Form onSubmit={this.login} inline>
              <FormControl maxLength="254"
                id="email"
                type="email"
                placeholder="Email"
                className=" mr-sm-2" />
              <FormControl minLength="8"
                maxLength="25"
                pattern="[a-zA-Z0-9_$!%^*#/\()?]*"
                title="[a-zA-Z0-9_$!%^*#/\()?]*"
                id="password"
                type="password"
                placeholder="Password"
                className=" mr-sm-2" />
              <Button type="submit">Log In</Button>
            </Form>
          </Container>
        </Navbar>
      </React.Fragment>
    )
  }
}

export default withRouter(Header);
import React from 'react';
import { Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

class Header extends React.Component {

  login = e => {
    let loginData = {}
    loginData.username = e.target.username.value;
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
              <FormControl id="username" type="text" placeholder="Username" className=" mr-sm-2" />
              <FormControl id="password" type="password" placeholder="Password" className=" mr-sm-2" />
              <Button type="submit">Log In</Button>
            </Form>
          </Container>
        </Navbar>
      </React.Fragment>
    )
  }
}

export default withRouter(Header);
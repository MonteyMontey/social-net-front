import React from 'react';
import { Navbar, Form, FormControl, Nav, Dropdown } from 'react-bootstrap';
import Axios from 'axios';

import { removeAccessToken } from '../../utils';


class NavHeader extends React.Component {

  componentDidMount() {
    console.log("mounted")
    this.checkForNotifications();
    setInterval(() => this.checkForNotifications(), 10000);
  }

  componentWillUnmount() {
    console.log("unmounted")
    clearInterval();
  }

  checkForNotifications = () => {
    Axios.get('/notifications')
      .then(res => {
        console.log(res);
        // go on...
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="ml-sm-5" style={this.styles.logo} href="/frontpage">Social-Network</Navbar.Brand>
        <Form inline>
          <FormControl style={this.styles.search} type="text" placeholder="Search" className="ml-sm-5" />
        </Form>
        <Nav className="ml-auto mr-sm-5">
          <Nav.Link href="#FriendRequests"><i className="fas fa-users fa-lg"></i></Nav.Link>
          <Nav.Link href="#Messages"><i className="fas fa-comments fa-lg"></i></Nav.Link>
          <Nav.Link href="#Alerts"><i className="fas fa-bell fa-lg"></i></Nav.Link>
          <Dropdown>
            <Dropdown.Toggle className="ml-sm-5 mr-sm-5" variant="primary" id="dropdown-basic" />
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1"><i className="mr-3 fas fa-cog"></i>Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/" onClick={() => removeAccessToken()}><i className="mr-3 fas fa-power-off"></i>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar>
    );
  }

  styles = {
    logo: {
      fontSize: '30px'
    },
    search: {
      width: "400px",
      height: "35px"
    }

  }
}

export default NavHeader;
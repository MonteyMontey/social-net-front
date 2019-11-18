import React from 'react';
import { Navbar, Form, FormControl, Nav, Dropdown } from 'react-bootstrap';

import { removeAccessToken } from '../../utils';


export default function NavHeader() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand className="ml-sm-5" style={styles.logo} href="/frontpage">Social-Network</Navbar.Brand>
      <Form inline>
        <FormControl style={styles.search} type="text" placeholder="Search" className="ml-sm-5" />
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

const styles = {
  logo: {
    fontSize: '30px'
  },
  search: {
    width: "400px", 
    height: "35px"
  }

}

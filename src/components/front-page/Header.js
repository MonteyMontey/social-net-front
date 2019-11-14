import React from 'react'
import { Navbar, Form, FormControl, Nav, Dropdown } from 'react-bootstrap';
import cookie from 'react-cookies';

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand className="ml-sm-5" style={{ fontSize: '30px' }} href="#home">Social-Network</Navbar.Brand>
      <Form inline>
        <FormControl style={{ width: "400px", height: "35px" }} type="text" placeholder="Search" className="ml-sm-5" />
      </Form>
      <Nav className="ml-auto mr-sm-5">
        <Nav.Link href="#FriendRequests"><i className="fas fa-users fa-lg"></i></Nav.Link>
        <Nav.Link href="#Messages"><i className="fas fa-comments fa-lg"></i></Nav.Link>
        <Nav.Link href="#Alerts"><i className="fas fa-bell fa-lg"></i></Nav.Link>

        <Dropdown>
          <Dropdown.Toggle className="ml-sm-5 mr-sm-5" variant="primary" id="dropdown-basic" />
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1"><i style={{ marginRight: "15px" }} className="fas fa-cog"></i>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/" onClick={() => cookie.remove('token', {path: '/'})}><i style={{ marginRight: "15px" }} className="fas fa-power-off"></i>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      </Nav>

    </Navbar>
  )
}

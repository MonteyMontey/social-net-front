import React from 'react';
import { Navbar, Form, FormControl, Nav, Dropdown } from 'react-bootstrap';
import Axios from 'axios';

import { removeAccessToken, parseForNewNotifications } from '../../../utils';
import NotificationDropdown from './NotificationDropdown/NotificationIconDropdown.js';


class NavHeader extends React.Component {

  state = {
    newFriendRequest: false,
    friendRequests: []
  }

  toggleFriendRequestDropdown = (show) => {
    if (show) {
      this.setState({
        newFriendRequest: false
      });

      const idArray = this.state.friendRequests
        .map(friendRequest => friendRequest.isRead ? null : friendRequest._id)
        .filter(el => {
          return el != null;
        });

      if (idArray.length > 0) {
        Axios.post('/notifications', idArray)
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }

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
        this.setState({ friendRequests: res.data });

        if (res.data.length > 0 && parseForNewNotifications(res.data)) {
          this.setState({
            newFriendRequest: true
          });
        }
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
          <NotificationDropdown
            id="friendRequests"
            newNotification={this.state.newFriendRequest}
            iconClass="fas fa-users fa-lg"
            notifications={this.state.friendRequests}
            toggle={this.toggleFriendRequestDropdown} />
          <NotificationDropdown id="messages" iconClass="fas fa-comments fa-lg" />
          <NotificationDropdown id="alerts" iconClass="fas fa-bell fa-lg" />
          <Dropdown>
            <Dropdown.Toggle className="ml-sm-5 mr-sm-5" variant="primary" id="dropdown-basic" />
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1"><i className="mr-3 fas fa-cog"></i>Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/" onClick={() => removeAccessToken()}><i className="mr-3 fas fa-power-off"></i>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar >
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
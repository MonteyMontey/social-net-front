import React from 'react';
import { Navbar, Form, Nav, Dropdown } from 'react-bootstrap';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import { removeAccessToken, parseForNewNotifications } from '../../../utils';
import NotificationDropdown from './NotificationDropdown/NotificationIconDropdown.js';
import Searchbar from './Searchbar/Searchbar';

import { sendLog } from '../../../utils';


class NavHeader extends React.Component {

  state = {
    newFriendRequest: false,
    friendRequests: [],
    alerts: []
  }

  toggleAlertDropdown = (show) => {
    if (show) {
      this.setState({
        newAlert: false
      });

      const idArray = this.state.alerts
        .map(alert => alert.isRead ? null : alert._id)
        .filter(el => {
          return el != null;
        });

      if (idArray.length > 0) {
        Axios.put(process.env.REACT_APP_NODE_URL + '/notifications/alerts', { ids: idArray, update: { isRead: true } }, {withCredentials: true})
          .catch((err) => {
            sendLog(err, "connection error");
          });
      }
    }
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
        Axios.put(process.env.REACT_APP_NODE_URL + '/notifications/friendRequests', { ids: idArray, update: { isRead: true } }, {withCredentials: true})
          .catch((err) => {
            sendLog(err, "connection error");
          });
      }
    }
  }

  componentDidMount() {
    this.checkForFriendRequestNotifications();
    this.checkForAlerts();
    setInterval(() => this.checkForFriendRequestNotifications(), 5000);
    setInterval(() => this.checkForAlerts(), 5000);
  }

  componentWillUnmount() {
    clearInterval();
  }

  checkForAlerts = () => {
    Axios.get(process.env.REACT_APP_NODE_URL + '/notifications/alerts', {withCredentials: true})
      .then(res => {
        this.setState({ alerts: res.data });
        if (res.data.length > 0 && parseForNewNotifications(res.data)) {
          this.setState({
            newAlert: true
          })
        }
      })
      .catch((err) => {
        sendLog(err, "connection error");
      });
  }

  checkForFriendRequestNotifications = () => {
    Axios.get(process.env.REACT_APP_NODE_URL + '/notifications/friendRequests', {withCredentials: true})
      .then(res => {
        this.setState({ friendRequests: res.data });

        if (res.data.length > 0 && parseForNewNotifications(res.data)) {
          this.setState({
            newFriendRequest: true
          });
        }
      })
      .catch((err) => {
        sendLog(err, "connection error");
      });
  }

  friendRequestAccepted = (id, sender, receiver) => {
    const updatedFriendRequests = this.state.friendRequests;
    for (let i = 0; i < updatedFriendRequests.length; i++) {
      if (updatedFriendRequests[i]._id === id) {
        updatedFriendRequests[i].accepted = true
      }
    }
    this.setState({
      friendRequests: updatedFriendRequests
    });
    Axios.put(process.env.REACT_APP_NODE_URL + '/notifications/friendRequests', {  sender: sender, receiver: receiver, ids: [id], update: { accepted: true } }, {withCredentials: true})
      .catch((err) => {
        sendLog(err, "connection error");
      });
    Axios.put(process.env.REACT_APP_NODE_URL + '/neo4j/friendRequest', { sender: sender, receiver: receiver, status: "accepted" }, {withCredentials: true})
      .catch((err) => {
        sendLog(err, "connection error");
      });
  };

  friendRequestDeclined = (id, sender, receiver) => {
    const updatedFriendRequests = this.state.friendRequests;
    for (let i = 0; i < updatedFriendRequests.length; i++) {
      if (updatedFriendRequests[i]._id === id) {
        updatedFriendRequests[i].declined = true
      }
    }
    this.setState({
      friendRequests: updatedFriendRequests
    });
    Axios.put(process.env.REACT_APP_NODE_URL + '/notifications/friendRequests', { sender: sender, receiver: receiver, ids: [id], update: { declined: true } }, {withCredentials: true})
      .catch((err) => {
        sendLog(err, "connection error");
      });
    Axios.put(process.env.REACT_APP_NODE_URL + '/neo4j/friendRequest', { sender: sender, receiver: receiver, status: "declined" }, {withCredentials: true})
      .catch((err) => {
        sendLog(err, "connection error");
      });
  };

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Link to="/frontpage">
          <Navbar.Brand className="ml-sm-5" style={this.styles.logo}>Social-Network</Navbar.Brand>
        </Link>
        <Form inline>
            <Searchbar></Searchbar>
        </Form>
        <Nav className="ml-auto mr-sm-5">
          <NotificationDropdown
            id="friendRequests"
            newNotification={this.state.newFriendRequest}
            iconClass="fas fa-users fa-lg"
            notifications={this.state.friendRequests}
            toggle={this.toggleFriendRequestDropdown}
            friendRequestAccepted={this.friendRequestAccepted}
            friendRequestDeclined={this.friendRequestDeclined} />
          <NotificationDropdown notifications={[]} id="messages" iconClass="fas fa-comments fa-lg" />
          <NotificationDropdown 
            notifications={this.state.alerts} 
            newNotification={this.state.newAlert}
            toggle={this.toggleAlertDropdown}
            id="alerts" 
            iconClass="fas fa-bell fa-lg" />
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
    }
  }
}

export default NavHeader;
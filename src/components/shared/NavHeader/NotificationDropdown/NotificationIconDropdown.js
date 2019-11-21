import React from 'react';
import { Dropdown } from 'react-bootstrap';

import './NotificationDropdown.css';

class NotificationDropdown extends React.Component {

  render() {
    return (
      <Dropdown onToggle={this.props.toggle}>
        <Dropdown.Toggle variant="" className="dropdownToggle">
          <i style={{ color: "grey" }} className={this.props.iconClass}></i>
          {this.props.newNotification ? <i style={{ color: 'red', marginLeft: "3px" }} className="fas fa-exclamation"></i> : null}
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdownMenu">
          {this.props.notifications ? this.props.notifications.map((notification, index) => (
            <React.Fragment key={Math.floor(Math.random() * 1000000)}>
              {index === 0 ? null : <Dropdown.Divider />}
              <Dropdown.Item key={index}>
                {notification.sender.firstName + " " + notification.sender.lastName + " sent you a friend request!"}
              </Dropdown.Item>
            </React.Fragment>
          )) : <Dropdown.Item>No new notifications</Dropdown.Item>}
        </Dropdown.Menu>
      </Dropdown>
    )
  }

}

export default NotificationDropdown;

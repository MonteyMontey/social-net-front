import React from 'react';
import { Dropdown } from 'react-bootstrap';

import './NotificationDropdown.css';

class NotificationDropdown extends React.Component {

  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="" className="dropdownToggle">
          <i style={{ color: "grey" }} className={this.props.iconClass}></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdownMenu">
          <Dropdown.Item>Notification</Dropdown.Item>
          <Dropdown.Item>Another Notification</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }

}

export default NotificationDropdown;

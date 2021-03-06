import React from 'react';
import { Button } from 'react-bootstrap';


class FriendRequest extends React.Component {
  state = {
    buttonsDisabled: false,
    accepted: false,
    declined: false,
    dangerText: "Decline",
    successText: "Accept",
  }

  componentDidMount() {
    this.setState({
      accepted: this.props.isAccepted,
      declined: this.props.isDeclined,
      buttonsDisabled: this.props.isAccepted || this.props.isDeclined ? true : false
    });
  }

  accept = (e) => {
    this.setState({
      buttonsDisabled: true,
      accepted: true,
      successText: "Accepted"
    });
    this.props.accepted();
    e.stopPropagation();
  };

  decline = (e) => {
    this.setState({
      buttonsDisabled: true,
      declined: true,
      dangerText: "Declined"
    });
    this.props.declined();
    e.stopPropagation();
  };

  render() {
    return (
      <div>
        {this.props.firstName + " " + this.props.lastName + " sent you a friend request.."}
        <br></br>
        <Button disabled={this.state.buttonsDisabled}
          onClick={this.accept}
          className="mr-2 mt-2"
          variant="success">{this.state.successText} {this.state.accepted ? <i className="fas fa-check"></i> : null}</Button>
        <Button disabled={this.state.buttonsDisabled}
          onClick={this.decline}
          className="mt-2"
          variant="danger">{this.state.dangerText} {this.state.declined ? <i className="fas fa-times"></i> : null}</Button>
      </div>
    );
  }
}

export default FriendRequest;
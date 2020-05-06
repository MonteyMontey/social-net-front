import React from 'react';
import userProfile from '../../../images/user_profile.png';
import NavHeader from '../../shared/NavHeader/NavHeader';
import ScrollFeed from '../../shared/ScrollFeed/ScrollFeed';
import { Container, Row, Col, Button } from "react-bootstrap";
import Axios from 'axios';

import { sendLog, consoleLog } from '../../../utils';

class UserPage extends React.Component {

  state = {
    buttonDisabled: false
  }

  sendFriendRequest = () => {
    Axios.post(process.env.REACT_APP_NODE_URL + '/neo4j/friendRequest', { personId: this.state.userID }, { withCredentials: true })
      .then(res => {
        consoleLog(res);
      })
      .catch((err) => {
        sendLog(err, "connection error");
      });

    this.setState({
      buttonDisabled: true
    });
  };

  componentDidMount() {

    this.setState({
      userID: this.props.match.params.userId
    });

    Axios.get(process.env.REACT_APP_NODE_URL + '/users', {
      params: {
        id: this.props.match.params.userId
      },
      withCredentials: true
    })
      .then(res => {
        consoleLog(res);
        this.setState({
          name: res.data.firstName + " " + res.data.lastName
        });
      })
      .catch((err) => {
        sendLog(err, "connection error");
      });


    Axios.get(process.env.REACT_APP_NODE_URL + '/neo4j/relationToPerson', {
      params: {
        personId: this.props.match.params.userId
      },
      withCredentials: true
    })
      .then(res => {
        if (res.data === "FriendRequest" || res.data === "Friends") {
          this.setState({
            buttonDisabled: true
          });
        }
        this.setState({
          relation: res.data
        });
      })
      .catch((err) => {
        sendLog(err.response, "connection error");
      });
  }

  render() {

    const FriendsButton = () => {
      return (
        <Button disabled={true}
          className="mt-2"
          variant="primary">
          Friends <i className="ml-sm-2 fas fa-check"></i>
        </Button>
      )
    }

    const FriendRequestButton = () => {
      return (
        <Button onClick={this.sendFriendRequest}
          disabled={this.state.buttonDisabled}
          className="mt-2"
          variant="primary">
          Add <i className="ml-sm-2 fas fa-user-plus"></i>
        </Button>
      )
    }

    return (
      <React.Fragment>
        <NavHeader />
        <Container fluid >
          <Row>
            <Col>
              <img style={this.styles.profileImage} alt="profile" src={userProfile} />
              <div style={this.styles.profileDescription}>
                <h1>{this.state.name}</h1>
                {this.state.relation === "Friends" ? <FriendsButton /> : <FriendRequestButton />}
              </div>
            </Col>
            <Col xs={5}>
              <div style={this.styles.scrollFeed}>
                <ScrollFeed style={{ height: "85vh" }} userID={this.props.match.params.userId} />
              </div>
            </Col>
            <Col />
          </Row>
        </Container>
      </React.Fragment>
    );
  }

  styles = {
    profileImage: {
      marginTop: "50px",
      display: "block",
      marginRight: "auto",
      marginLeft: "auto",
      height: "400px",
      width: "400px"
    },
    profileDescription: {
      marginTop: "25px",
      textAlign: "center"
    },
    scrollFeed: {
      marginTop: "50px"
    }
  };
}

export default UserPage;
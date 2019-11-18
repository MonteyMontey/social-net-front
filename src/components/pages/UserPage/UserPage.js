import React from 'react';
import userProfile from '../../../images/user_profile.png';
import NavHeader from '../../shared/NavHeader';
import ScrollFeed from '../../shared/ScrollFeed/ScrollFeed';
import { Container, Row, Col, Button } from "react-bootstrap";
import Axios from 'axios';

class UserPage extends React.Component {

  state = {

  }

  componentDidMount() {
    this.setState({
      userID: this.props.match.params.userId
    });

    Axios.get('/users', {
      params: {
        id: this.props.match.params.userId
      }
    })
      .then(res => {
        console.log("res", res)
        this.setState({
          name: res.data.firstName + " " + res.data.lastName
        });
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  render() {
    return (
      <React.Fragment>
        <NavHeader />
        <Container fluid >
          <Row>
            <Col>
              <img style={this.styles.profileImage} alt="profile" src={userProfile} />
              <div style={this.styles.profileDescription}>
                <h1>{this.state.name}</h1>
                <Button className="mt-2" variant="primary">Add <i className="ml-sm-2 fas fa-user-plus"></i></Button>
              </div>
            </Col>
            <Col xs={5}>
              <div style={this.styles.scrollFeed}>
                <ScrollFeed userID={this.props.match.params.userId} />
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
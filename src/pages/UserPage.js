import React from 'react';
import userProfile from '../images/user_profile.png';
import Header from '../components/front-page/Header';
import ScrollFeed from '../components/front-page/ScrollFeed';
import { Container, Row, Col, Button } from "react-bootstrap";
import Axios from 'axios';

class Home extends React.Component {

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
        <Header />
        <Container fluid >
          <Row>
            <Col>
              <div>
                <img style={{ marginTop: "50px", display: "block", marginRight: "auto", marginLeft: "auto", height: "400px", width: "400px" }}
                  alt="profile" src={userProfile} />
                <div style={{ marginTop: "25px", textAlign: "center" }}>
                  <h1>{this.state.name}</h1>
                  <Button  style={{ marginTop: "10px" }} variant="primary">Add <i className="ml-sm-2 fas fa-user-plus"></i></Button>
                </div>
              </div>
            </Col>
            <Col xs={5}>
              <div style={{ marginTop: "50px" }}>
                <ScrollFeed userID={this.props.match.params.userId} />
              </div>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Home;
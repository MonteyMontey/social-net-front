import React from 'react';
import userProfile from '../images/user_profile.png';
import Header from '../components/front-page/Header';
import ScrollFeed from '../components/front-page/ScrollFeed';
import { Container, Row, Col, Button } from "react-bootstrap";

class Home extends React.Component {

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
                  <div style={{marginTop: "25px", textAlign: "center"}}>
                    <h1>Dominik Klein</h1>
                    <Button variant="outline-primary">Add <i style={{marginLeft: "5px"}} className="ml-sm-1 fas fa-user-plus"></i></Button>
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
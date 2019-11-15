import React from 'react';
import { Container} from "react-bootstrap";

import ScrollFeed from '../components/front-page/ScrollFeed';
import Header from '../components/front-page/Header';

class FrontPage extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Header />
        <Container style={{ width: "900px" }}>
          <ScrollFeed createPostPrompt/>
        </Container>
      </React.Fragment>
    );
  }
}

export default FrontPage;
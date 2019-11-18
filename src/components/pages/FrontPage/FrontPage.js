import React from 'react';
import { Container } from "react-bootstrap";

import ScrollFeed from '../../shared/ScrollFeed/ScrollFeed';
import NavHeader from '../../shared/NavHeader';


class FrontPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavHeader />
        <Container style={styles.container}>
          <ScrollFeed postPrompt />
        </Container>
      </React.Fragment>
    );
  }
}

const styles = {
  container: {
    width: "900px"
  }
};

export default FrontPage;

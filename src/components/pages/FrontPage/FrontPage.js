import React from 'react';
import { Container } from "react-bootstrap";

import ScrollFeed from '../../shared/ScrollFeed/ScrollFeed';
import NavHeader from '../../shared//NavHeader/NavHeader';


class FrontPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavHeader />
        <Container style={styles.container}>
          <ScrollFeed style={{height: "90vh"}} postPrompt />
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

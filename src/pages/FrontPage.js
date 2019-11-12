import React from 'react'

import ScrollFeed from '../components/front-page/ScrollFeed';
import Header from '../components/front-page/Header';

class FrontPage extends React.Component {

  render() {
    return (
      <div style={{ backgroundColor: "#e9ebee", height: "100vh", width: "100wh" }}>
        <Header />
        <ScrollFeed />
      </div>
    );
  }
}

export default FrontPage;
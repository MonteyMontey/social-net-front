import React from 'react'

import Header from '../components/landing-page/Header';
import Registration from '../components/landing-page/Registration';
import Footer from '../components/landing-page/Footer';


class LandingPage extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Header />
        <Registration />
        <Footer />
      </React.Fragment>
    );
  }
}

export default LandingPage;
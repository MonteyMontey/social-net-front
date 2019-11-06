import React from 'react'

import Header from '../components/landing-page/Header';
import Registration from '../components/landing-page/Registration';
import Footer from '../components/landing-page/Footer';


class LandingPage extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Registration />
        <Footer />
      </div>
    );
  }
}

export default LandingPage;
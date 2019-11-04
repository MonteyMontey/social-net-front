import React from 'react'

import Header from './sub-components/Header';
import Main from './sub-components/Main';
import Footer from './sub-components/Footer';


class LandingPage extends React.Component {
  state = {
    date: new Date(),
    gender: ""
  };

  setGender = gender => {
    this.setState({
      gender: gender
    });
  };

  setDate = date => {
    this.setState({
      date: date
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Main setDate={this.setDate} setGender={this.setGender} date={this.state.date} gender={this.state.gender} />
        <Footer />
      </div>
    );
  }
}

export default LandingPage;
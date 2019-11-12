import React from 'react'

import Header from '../components/landing-page/Header';
import Registration from '../components/landing-page/Registration';
import Footer from '../components/landing-page/Footer';
import { Alert } from "react-bootstrap";

class LandingPage extends React.Component {

  state = {
    passwordsDontMatchAlert: false,
    somethingWentWrongAlert: false,
    loginFailedAlert: false
  };

  showPasswordsDontMatchAlert = () => {
    this.setState({
      passwordsDontMatchAlert: true
    });
  }

  showSomethingWentWrongAlert = () => {
    this.setState({
      somethingWentWrongAlert: true
    });
  }

  showLoginFailedAlert = () => {
    this.setState({
      loginFailedAlert: true
    });
  }

  PasswordsDontMatchAlert = () => {
    return (
      <Alert style={{ margin: "0px" }}
        dismissible
        onClose={() => this.setState({ passwordsDontMatchAlert: false })}
        variant="danger">
        Your passwords don't match!
      </Alert>
    )
  }

  SomethingWentWrongAlert = () => {
    return (
      <Alert style={{ margin: "0px" }}
        dismissible
        onClose={() => this.setState({ somethingWentWrongAlert: false })}
        variant="danger">
        Oops, something went wrong! Please try again.
      </Alert>
    )
  }

  LoginFailedAlert = () => {
    return (
      <Alert style={{ margin: "0px" }}
        dismissible
        onClose={() => this.setState({ loginFailedAlert: false })}
        variant="danger">
        Login failed, username or password is not valid.
      </Alert>
    )
  }

  render() {
    return (
      <React.Fragment>
        <Header showLoginFailedAlert={this.showLoginFailedAlert} />
        {this.state.loginFailedAlert ? <this.LoginFailedAlert /> : null}
        {this.state.somethingWentWrongAlert ? <this.SomethingWentWrongAlert /> : null}
        {this.state.passwordsDontMatchAlert ? <this.PasswordsDontMatchAlert /> : null}
        <Registration
          showSomethingWentWrongAlert={this.showSomethingWentWrongAlert}
          showPasswordsDontMatchAlert={this.showPasswordsDontMatchAlert} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default LandingPage;
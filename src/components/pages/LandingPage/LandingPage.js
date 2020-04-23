import React from 'react';
import { withRouter } from 'react-router-dom';

import LoginHeader from './sub/LoginHeader/LoginHeader';
import Registration from './sub/Registration';
import {
  PasswordsDontMatchAlert,
  LoginFailedAlert,
  SomethingWentWrongAlert,
  EmailVerificationAlert
} from '../../shared/Alerts';


class LandingPage extends React.Component {

  state = {
    passwordsDontMatchAlert: false,
    somethingWentWrongAlert: false,
    somethingWentWrongMessage: "",
    loginFailedAlert: false,
    emailVerificationAlert: false
  };

  showPasswordsDontMatchAlert = (show) => {
    this.setState({ passwordsDontMatchAlert: show });
  };

  showSomethingWentWrongAlert = (show, message) => {
    this.setState({ 
      somethingWentWrongAlert: show,
      somethingWentWrongMessage: message
    });
  };

  showLoginFailedAlert = (show) => {
    this.setState({ loginFailedAlert: show });
  };

  showEmailVerificationAlert = (show) => {
    this.setState({ emailVerificationAlert: show });
  }

  render() {
    return (
      <React.Fragment>

        <LoginHeader showLoginFailedAlert={this.showLoginFailedAlert}
          showEmailVerificationAlert={this.showEmailVerificationAlert} />

        {this.state.emailVerificationAlert ? <EmailVerificationAlert
          showAlert={this.showEmailVerificationAlert} /> : null}

        {this.state.loginFailedAlert ? <LoginFailedAlert
          showAlert={this.showLoginFailedAlert} /> : null}

        {this.state.somethingWentWrongAlert ? <SomethingWentWrongAlert
          showAlert={this.showSomethingWentWrongAlert} message={this.state.somethingWentWrongMessage} /> : null}

        {this.state.passwordsDontMatchAlert ? <PasswordsDontMatchAlert
          showAlert={this.showPasswordsDontMatchAlert} /> : null}

        <Registration
          showSomethingWentWrongAlert={this.showSomethingWentWrongAlert}
          showPasswordsDontMatchAlert={this.showPasswordsDontMatchAlert}
          showEmailVerificationAlert={this.showEmailVerificationAlert} />
      </React.Fragment>
    );
  }

  styles = {
    trademark: {
      marginTop: "35px",
      fontSize: "14px",
      textAlign: "center"
    }
  }
}

export default withRouter(LandingPage);

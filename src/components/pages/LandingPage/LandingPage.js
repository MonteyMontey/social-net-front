import React from 'react';
import { withRouter } from 'react-router-dom';

import LoginHeader from './sub/LoginHeader';
import Registration from './sub/Registration';
import {
  PasswordsDontMatchAlert,
  LoginFailedAlert,
  SomethingWentWrongAlert
} from '../../shared/Alerts';


class LandingPage extends React.Component {

  state = {
    passwordsDontMatchAlert: false,
    somethingWentWrongAlert: false,
    loginFailedAlert: false
  };

  showPasswordsDontMatchAlert = (show) => {
    this.setState({ passwordsDontMatchAlert: show });
  };

  showSomethingWentWrongAlert = (show) => {
    this.setState({ somethingWentWrongAlert: show });
  };

  showLoginFailedAlert = (show) => {
    this.setState({ loginFailedAlert: show });
  };

  render() {
    return (
      <React.Fragment>
        <LoginHeader showLoginFailedAlert={this.showLoginFailedAlert} />

        {this.state.loginFailedAlert ? <LoginFailedAlert
          showAlert={this.showLoginFailedAlert} /> : null}

        {this.state.somethingWentWrongAlert ? <SomethingWentWrongAlert
          showAlert={this.showSomethingWentWrongAlert} /> : null}

        {this.state.passwordsDontMatchAlert ? <PasswordsDontMatchAlert
          showAlert={this.passwordsDontMatchAlert} /> : null}

        <Registration
          registered={() => this.props.history.push('/frontpage')}
          showSomethingWentWrongAlert={this.showSomethingWentWrongAlert}
          showPasswordsDontMatchAlert={this.showPasswordsDontMatchAlert} />
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

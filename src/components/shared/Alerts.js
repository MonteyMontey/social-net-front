import React from 'react';
import { Alert } from "react-bootstrap";

const LoginFailedAlert = (props) => {
  return (
    <Alert style={styles.alertMargin}
      dismissible
      onClose={() => props.showAlert(false)}
      variant="danger">
      Login failed! Please try again.
    </Alert>
  );
};

const PasswordsDontMatchAlert = (props) => {
  return (
    <Alert style={styles.alertMargin}
      dismissible
      onClose={() => props.showAlert(false)}
      variant="danger">
      Your passwords don't match!
    </Alert>
  );
};

const SomethingWentWrongAlert = (props) => {
  return (
    <Alert style={styles.alertMargin}
      dismissible
      onClose={() => props.showAlert(false)}
      variant="danger">
      Oops, something went wrong! {props.message}
    </Alert>
  );
};


const EmailVerificationAlert = (props) => {
  return (
    <Alert 
      style={styles.alertMargin} 
      variant="success"
      dismissible
      onClose={() => props.showAlert(false)}>
      <Alert.Heading>We've sent you an email!</Alert.Heading>
      <p>
        Please check your email and verify your account. If you don't see our email, check your junk folder. 
      </p>
    </Alert>
  );
};

const styles = {
  alertMargin: {
    margin: "0px"
  }
};

export { LoginFailedAlert, PasswordsDontMatchAlert, SomethingWentWrongAlert, EmailVerificationAlert };

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
      Oops, something went wrong! Please try again.
    </Alert>
  );
};

const styles = {
  alertMargin: {
    margin: "0px"
  }
};

export { LoginFailedAlert, PasswordsDontMatchAlert, SomethingWentWrongAlert };

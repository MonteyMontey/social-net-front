import React from 'react';
import { Container, Alert } from "react-bootstrap";
import Axios from 'axios';


import { sendLog } from '../../../utils';

class VerifyEmailPage extends React.Component {

  state = {

  }

  componentDidMount() {
    Axios.get('/activate-account', {
      params: {
        activationCode: this.props.match.params.activationCode
      }
    })
      .then(_ => {
        this.setState({
          activationCodeValid: true
        });

      }).catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            this.setState({
              activationCodeValid: false
            });
          }
        } else { // no connection from backend
          sendLog(err, "connection error");
        }

      });
  }

  render() {

    const AccountActivatedInfo = () => {
      return (
        <Container style={{ width: "600px" }}>
          <Alert className="mt-5" variant="success">
            <Alert.Heading>Account activated!</Alert.Heading>
            <p>
              Your account got activated. You can now go and log in!
            </p>
            <hr />
            <a href="/">Back to sign-in</a>
          </Alert>
        </Container>
      );
    }

    const InvalidInfo = () => {
      return (
        <Container style={{ width: "600px" }}>
          <Alert className="mt-5" variant="danger">
            <Alert.Heading>Invalid!</Alert.Heading>
            <p>
              The activation code is invalid.
            </p>
          </Alert>
        </Container>
      );
    }

    const SomethingWentWrongAlert = () => {
      return (
        <Alert style={{margin: "0px"}}
          variant="danger">
          Oops, something went wrong! Please try again.
        </Alert>
      );
    };


    return (
      <React.Fragment>
        {typeof this.state.activationCodeValid !== 'undefined' ? this.state.activationCodeValid ?
         <AccountActivatedInfo /> : <InvalidInfo/> : <SomethingWentWrongAlert/> }
      </React.Fragment>
    );
  }

}

export default VerifyEmailPage;
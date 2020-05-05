import React from 'react';
import { Container, Alert, Navbar } from "react-bootstrap";
import Axios from 'axios';


import { sendLog } from '../../../utils';

class VerifyEmailPage extends React.Component {

  state = {
    showSomethingWentWrong: false
  }

  componentDidMount() {
    Axios.get(process.env.REACT_APP_NODE_URL + '/activate-account', {
      params: {
        activationCode: this.props.match.params.activationCode
      }
    }, { withCredentials: true })
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
          this.setState({
            showSomethingWentWrong: true
          });
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
        <Alert style={{ margin: "0px" }}
          variant="danger">
          Oops, something went wrong! Please try again.
        </Alert>
      );
    };


    return (
      <React.Fragment>
        <Navbar style={{ padding: '10px' }} bg="dark" variant="dark">
          <Container>
            <Navbar.Brand style={{ fontSize: '30px' }} href="#home">Social-Network</Navbar.Brand>
          </Container>
        </Navbar>
        {this.state.showSomethingWentWrong ? <SomethingWentWrongAlert /> : null}
        {typeof this.state.activationCodeValid !== 'undefined' ? this.state.activationCodeValid ?
          <AccountActivatedInfo /> : <InvalidInfo /> : null}
      </React.Fragment>
    );
  }

}

export default VerifyEmailPage;

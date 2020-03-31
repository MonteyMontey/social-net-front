import React from 'react';
import { withRouter } from 'react-router-dom';
import { Alert, Container, Button} from "react-bootstrap";


class ConfirmPage extends React.Component {

  state = {
  
  };

  render() {
    return (
      <React.Fragment>
        <Container style={{width: "600px"}}>
          <Alert className="mt-5" variant="dark">
            <Alert.Heading>We've sent you an email!</Alert.Heading>
            <p>
              Please check your email and verify your account. If you don't see our email, check your junk folder. 
            </p>
            <hr />
            <Button variant="dark">Resend verification email</Button>
            <a style={{marginLeft: "30px"}} href="#">Back to sign-in</a>
          </Alert>
        </Container>
      </React.Fragment>
    );
  }

  styles = {
    
  }
}

export default withRouter(ConfirmPage);

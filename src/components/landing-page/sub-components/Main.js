import React from "react";
import { Container, Form, Button, Col } from "react-bootstrap";

export default function Main() {
  return (
    <div style={{ backgroundColor: "#e9ebee", height: "100%", width: "100%" }}>
      <Container>
        <div style={styles.registration}>
          <h3 style={{color: "#343a40"}}>Create an account</h3>
          <Form style={styles.form}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Max" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Mustermann"/>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Berlin"/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" placeholder="Berlin"/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control type="number" placeholder="12681"/>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="max.mustermann@gmail.com"/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
            </Form.Row>

            <h5 style={{marginBottom: '20px', marginTop: '10px', color: "#343a40"}}>Birthday</h5>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Control as="select">
                  <option>Day...</option>
                  <option>1</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Control as="select">
                  <option>Month...</option>
                  <option>...</option>
                </Form.Control>
              </Form.Group>
              
              <Form.Group as={Col} controlId="formGridState">
                <Form.Control as="select">
                  <option>Year...</option>
                  <option>...</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <div style={{marginTop: "10px"}} key={'inline-radio'} className="mb-3">
              <Form.Check
                inline
                label="Male"
                type='radio'
                id={"inline-radio-1"}
              />
              <Form.Check
                inline
                label="Female"
                type='radio'
                id={"inline-radio-2"}
              />
              <Form.Check
                inline
                label="Other"
                type='radio'
                id={"inline-radio-3"}
              />
            </div>

            <Button size="lg" style={{marginTop: "20px"}} variant="primary" type="submit">
              Register
            </Button>

          </Form>
        </div>
      </Container>
    </div>
  );
}

const styles = {
  form: {
    paddingTop: "20px",
    paddingBottom: "40px"
  },
  registration: {
    paddingTop: "50px",
    paddingBottom: "40px"
  }
};

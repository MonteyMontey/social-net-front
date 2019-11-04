import React from "react";
import { Container, Form, Button, Col } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Main(props) {

  return (
    <div style={{ backgroundColor: "#e9ebee", height: "100%", width: "100%" }}>
      <Container>
        <div style={styles.registration}>
          <h3 style={{ color: "#343a40" }}>Create an account</h3>
          <Form style={styles.form}>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Control type="text" placeholder="First Name" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Control type="text" placeholder="Last Name" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Control style={{ width: "50%" }} type="email" placeholder="Email" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Control type="password" placeholder="Repeat password" />
              </Form.Group>
            </Form.Row>

            <h5 style={{ marginBottom: '20px', marginTop: '10px', color: "#343a40" }}>Birthday</h5>

            <Form.Row>
              <DatePicker selected={props.date} onChange={props.setDate} />
            </Form.Row>

            <Form.Row>
              <div style={{ margin: "30px 0 0 0" }} key={'inline-radio'} className="mb-3">
                <Form.Check
                  checked={props.gender === "Male"}
                  onChange={() => props.setGender("Male")}
                  inline
                  label="Male"
                  type='radio'
                  id={"inline-radio-1"}
                />
                <Form.Check
                  checked={props.gender === "Female"}
                  onChange={() => props.setGender("Female")}
                  inline
                  label="Female"
                  type='radio'
                  id={"inline-radio-2"}
                />
                <Form.Check
                  checked={props.gender === "Other"}
                  onChange={() => props.setGender("Other")}
                  inline
                  label="Other"
                  type='radio'
                  id={"inline-radio-3"}
                />
              </div>
            </Form.Row>


            <Button size="lg" style={{ marginTop: "25px" }} variant="primary" type="submit">Register</Button>


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
    paddingBottom: "200px"
  }
};

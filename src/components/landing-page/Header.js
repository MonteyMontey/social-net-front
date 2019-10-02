import React from 'react'
import { Navbar, Container, Form, FormControl, Button} from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar style={{padding: '10px'}} bg="dark" variant="dark">
      <Container>
        <Navbar.Brand style={{fontSize: '30px'}} href="#home">Social-Network</Navbar.Brand>
        <Form inline>
          <FormControl type="text" placeholder="Username" className=" mr-sm-2" />
          <FormControl type="password" placeholder="Password" className=" mr-sm-2" />
          <Button type="submit">Log In</Button>
        </Form>
      </Container>
    </Navbar>
  )
}

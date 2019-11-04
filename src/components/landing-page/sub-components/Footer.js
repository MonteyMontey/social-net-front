import React from 'react'
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <div>
       <Container>
        <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between'}}>
          <a href="#">Register</a>
          <a href="#">Login</a>
          <a href="#">Contact</a>
          <a href="#">Cookies</a>
          <a href="#">Privacy</a>
          <a href="https://en.wikipedia.org/wiki/Piracy">Piracy</a>
          <a href="#">Service</a>
          <a href="#">Career</a>
          <a href="#">Help</a>
        </div>
        <p style={{marginTop: "35px", fontSize: "14px", textAlign: "center"}}>
          Social-Network © 2019
        </p>
      </Container>
    </div>
  )
}


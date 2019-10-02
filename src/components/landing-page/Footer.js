import React from 'react'
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <div>
      <Container>
        <div style={{marginTop: '10px', display: 'flex', justifyContent: 'space-between'}}>
          <a href="#">Über uns</a>
          <a href="#">Hilfe-Center</a>
          <a href="#">Blog Status</a>
          <a href="#">Jobs</a>
          <a href="#">Bedingungen</a>
          <a href="#">Datenschutzrichtlinien</a>
          <a href="#">Impressum</a>
          <a href="#">Cookies</a>
          <a href="#">Info zu Anzeigen</a>
        </div>
        <p style={{marginTop: "50px", textAlign: "center"}}>
          Social Network © 2019
        </p>
      </Container>
    </div>
  )
}


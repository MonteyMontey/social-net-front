import React from 'react'
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <div>
      <Container>
        <div style={{marginTop: '10px', display: 'flex', justifyContent: 'space-between'}}>
          <a href="#">Link #1</a>
          <a href="#">Link #2</a>
          <a href="#">Link #3</a>
          <a href="#">Link #4</a>
          <a href="#">Link #5</a>
          <a href="#">Link #6</a>
          <a href="#">Link #7</a>
          <a href="#">Link #8</a>
          <a href="#">Link #9</a>
        </div>
        <p style={{marginTop: "50px", textAlign: "center"}}>
          Social Network © 2019
        </p>
      </Container>
    </div>
  )
}


import React from 'react'
import {Form, Button } from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroll-component';

class CreatePostPrompt extends React.Component {

  render() {
    return (
      <Form style={{borderStyle: "solid", borderWidth: "1px", borderColor: "LightGray", borderRadius: "5px",
       marginTop: "20px", marginBottom: "50px", padding: "15px", backgroundColor: "white"}}>
        <Form.Group>
          <Form.Control as="textarea" rows="3" maxLength={4}
            placeholder="What did you do today?" />
        </Form.Group>
        <Button variant="primary" type="submit">Post</Button>
      </Form>

    )
  }
}

export default CreatePostPrompt;
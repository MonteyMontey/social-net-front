import React from 'react'
import { Form, Button } from "react-bootstrap";
import Axios from 'axios';

class CreatePostPrompt extends React.Component {

  submitPost = e => {
    let post = {};
    post.body = e.target.post.value;

    Axios.post('/posts', post)
      .then(res => {
        console.log("Successfully sent post to backend", res);
        // go on ...
      })
      .catch((error) => {
        console.log("Something went wrong", error.response);
      });

    e.preventDefault()
  }

  render() {
    return (
      <Form onSubmit={this.submitPost}
        style={{
          borderStyle: "solid", borderWidth: "1px", borderColor: "LightGray", borderRadius: "5px",
          marginTop: "20px", marginBottom: "50px", padding: "15px", backgroundColor: "white"
        }}>
        <Form.Group>
          <Form.Control id="post" as="textarea" rows="3" maxLength={280}
            placeholder="What's on your mind?" />
        </Form.Group>
        <Button variant="primary" type="submit">Post</Button>
      </Form>

    )
  }
}

export default CreatePostPrompt;
import React from 'react'
import { Container, Card } from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroll-component';
import Axios from 'axios';
import CreatePostPrompt from './CreatePostPrompt';

class ScrollFeed extends React.Component {

  state = {
    posts: [
      "post1", "post2", "post3", "post4", "post5", "post6", "post7"
    ]
  }

  fetchMorePosts = () => {
    Axios.get('/posts')
      .then(res => {
        console.log("Successfully fetched posts data from backend", res);
        this.setState({
          posts: this.state.posts.concat(res.data[0].body)
        });
      })
      .catch((error) => {
        console.log("Couldn't fetch post data from backend", error.response);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Container style={{ width: "900px" }}>
          <InfiniteScroll
            style={{ scrollbarWidth: "none" }} // only implemented for firefox right now
            height="800px"
            dataLength={this.state.posts.length}
            next={this.fetchMorePosts}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }>

            <CreatePostPrompt />
            {
              this.state.posts.map((post, index) => (
                <Card key={index} style={{ width: '100%', margin: 'auto', marginTop: '1rem' }}>
                  <Card.Body>
                    <Card.Title>Post 1</Card.Title>
                    <Card.Text>
                      {post}
                    </Card.Text>
                    <Card.Text>
                      <small className="text-muted">3 mins ago</small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))
            }

          </InfiniteScroll>
        </Container>
      </React.Fragment>
    );
  }
}

export default ScrollFeed;
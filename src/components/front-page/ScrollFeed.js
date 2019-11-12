import React from 'react'
import { Container, Card } from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroll-component';
import Axios from 'axios';
import CreatePostPrompt from './CreatePostPrompt';

class ScrollFeed extends React.Component {

  state = {
    numberOfPostsToFetch: 5,
    posts: [],
    hasMore: true
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    Axios.get('/posts', { 
      params: {  
        oldestFetchedPostID: this.state.oldestFetchedPostID,
        numberOfPostsToFetch: this.state.numberOfPostsToFetch
      }
    })
      .then(res => {
        console.log("Successfully fetched posts data from backend", res);
        if (res.data.length === 0){
          this.setState({
            hasMore: false
          });
        }
        this.setState({
          posts: this.state.posts.concat(res.data.map(post => post.body)),
          oldestFetchedPostID: res.data.slice(-1)[0]._id
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
            next={this.fetchPosts}
            hasMore={this.state.hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ marginTop: '20px', textAlign: 'center' }}>
                <b>Nothing more to see.</b>
              </p>
            }>

            <CreatePostPrompt />
            {
              this.state.posts.map((post, index) => (
                <Card key={index} style={{ width: '100%', margin: 'auto', marginTop: '1rem' }}>
                  <Card.Body>
                    <Card.Title>Username</Card.Title>
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
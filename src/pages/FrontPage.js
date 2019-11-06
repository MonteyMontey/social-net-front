import React from 'react'
import { Container, Card } from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroll-component';

class FrontPage extends React.Component {

  state = {
    posts: [
      "post1", "post2", "post3", "post4", "post5", "post6", "post7"
    ]
  }

  fetchMorePosts = () => {
    setTimeout(() => {
      this.setState({
        posts: this.state.posts.concat(["new Post", "new Post", "new Post", "new Post", "new Post"])
      });
    }, 1500);
  }

  render() {
    return (
      <React.Fragment>
        <h1 style={{ textAlign: 'center', 'marginTop': '20px' }}>Test</h1>
        <Container>
          <InfiniteScroll
            style={{scrollbarWidth: "none"}} // only implemented for firefox right now
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

            {
              this.state.posts.map((post, index) => (
                <Card key={index} style={{ width: '30rem', margin: 'auto', marginTop: '3rem' }}>
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

export default FrontPage;
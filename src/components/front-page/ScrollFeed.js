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

// shamelessly copied (and then modified) from https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best
  timeSince = (date) => {
    const now = new Date();
    const secondsPast = (now.getTime() - date.getTime()) / 1000;

    if (secondsPast < 60) {
      const parsed = parseInt(secondsPast);
      return parsed <= 1 ? '1 second ago' : parsed + ' seconds ago';
    }
    if (secondsPast < 3600) {
      const parsed = parseInt(secondsPast / 60);
      return parsed === 1 ? '1 minute ago' : parsed + ' minutes ago';
    }
    if (secondsPast <= 86400) {
      const parsed = parseInt(secondsPast / 3600);
      return parsed === 1 ? '1 hour ago' : parsed + ' hours ago';
    }
    if (secondsPast > 86400) {
      const day = date.getDate();
      const month = date.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
      const year = date.getFullYear() === now.getFullYear() ? "" : " " + date.getFullYear();
      return day + " " + month + year;
    }
  }

  addNewPost = (post) => {
    this.setState({
      posts: [post].concat(this.state.posts)
    });
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
        if (res.data.length === 0) {
          this.setState({
            hasMore: false
          });
        }
        this.setState({
          posts: this.state.posts.concat(res.data),
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
            <CreatePostPrompt addNewPost={this.addNewPost} />
            {
              this.state.posts.map((post, index) => (
                <Card key={index} style={{ width: '100%', margin: 'auto', marginTop: '1rem' }}>
                  <Card.Body>
                    <Card.Title>{post.user.firstName + " " + post.user.lastName}</Card.Title>
                    <Card.Text>
                      {post.body}
                    </Card.Text>
                    <Card.Text>
                      <small className="text-muted">{this.timeSince(new Date(post.date))}</small>
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
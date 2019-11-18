import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Axios from 'axios';

import PostPrompt from '../../pages/FrontPage/sub/PostPrompt';
import Post from './sub/Post';


class ScrollFeed extends React.Component {

  state = {
    numberOfPostsToFetch: 10,
    posts: [],
    hasMore: true
  };

  componentDidMount() {
    this.fetchPosts();
  }

  addNewPost = (post) => {
    this.setState({
      posts: [post].concat(this.state.posts)
    });
  };

  fetchPosts = () => {
    Axios.get('/posts', {
      params: {
        oldestFetchedPostID: this.state.oldestFetchedPostID,
        numberOfPostsToFetch: this.state.numberOfPostsToFetch,
        userID: this.props.userID
      }
    })
      .then(res => {
        console.log(res);
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
        console.error(error);
      });
  };

  render() {
    return (
      <InfiniteScroll
        style={this.styles.scrollbar}
        height="800px"
        dataLength={this.state.posts.length}
        next={this.fetchPosts}
        hasMore={this.state.hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={this.styles.endMessage}>
            <b>Nothing more to see.</b>
          </p>
        }>
        {this.props.postPrompt ? <PostPrompt addNewPost={this.addNewPost} /> : null}
        {this.state.posts.map((post, index) => (
          <Post index={index}
            firstName={post.user.firstName}
            lastName={post.user.lastName}
            date={new Date(post.date)}
            userId={post.user._id}
            body={post.body}
            key={index} />
        ))}
      </InfiniteScroll>
    );
  }

  styles = {
    scrollbar: {
      scrollbarWidth: "none" // only implemented for firefox right now
    },
    endMessage: {
      marginTop: '20px',
      textAlign: 'center'
    }
  };
}

export default ScrollFeed;

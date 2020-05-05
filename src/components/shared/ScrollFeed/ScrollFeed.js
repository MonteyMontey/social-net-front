import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Axios from 'axios';

import PostPrompt from '../../pages/FrontPage/sub/PostPrompt';
import Post from './sub/Post';

import { sendLog, consoleLog } from '../../../utils';

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
    Axios.get(process.env.REACT_APP_NODE_URL + '/posts', {
      params: {
        oldestFetchedPostID: this.state.oldestFetchedPostID,
        numberOfPostsToFetch: this.state.numberOfPostsToFetch,
        userID: this.props.userID
      }
    }, {credentials: 'include'})
      .then(res => {
        consoleLog(res);
        if (res.data.length === 0) {
          this.setState({
            hasMore: false
          });
        }
        this.setState({
          posts: this.state.posts.concat(res.data),
          oldestFetchedPostID: res.data.length > 0 ? res.data.slice(-1)[0]._id : null
        });
      })
      .catch((error) => {
        sendLog(error, "connection error");
      });
  };

  render() {
    return (
      <InfiniteScroll
        style={{scrollbarWidth: "none", ...this.props.style}}
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
    endMessage: {
      marginTop: '20px',
      textAlign: 'center'
    }
  };
}

export default ScrollFeed;

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function withoutAuth(ComponentToProtect) {

  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      fetch(process.env.REACT_APP_NODE_URL + '/checkToken')
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false, redirect: true });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(_ => { 
          this.setState({ loading: false});
        });
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) return null;
      if (redirect) return <Redirect to="/frontpage" />;

      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}
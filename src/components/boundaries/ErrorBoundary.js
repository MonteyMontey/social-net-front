import React from 'react';

import { sendLog } from '../../utils';
 
class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(err) {
     sendLog(err);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{textAlign: "center", marginTop: "50px"}}>
          <h1>Oops something went wrong, sorry!</h1>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
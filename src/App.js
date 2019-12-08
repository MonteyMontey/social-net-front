import React from 'react';
import Landing from './components/pages/LandingPage/LandingPage';
import Home from './components/pages/FrontPage/FrontPage';
import UserPage from './components/pages/UserPage/UserPage';
import withAuth from './components/auth/withAuth';
import withoutAuth from './components/auth/withoutAuth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ErrorBoundary from './components/boundaries/ErrorBoundary';


function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Switch>
          <Route path="/" component={withoutAuth(Landing)} exact />
          <Route path="/frontpage" component={withAuth(Home)} exact />
          <Route path="/user/:userId" component={withAuth(UserPage)} exact />
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

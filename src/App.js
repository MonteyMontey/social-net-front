import React from 'react';
import Landing from './components/pages/LandingPage/LandingPage';
import Home from './components/pages/FrontPage/FrontPage';
import User from './components/pages/UserPage/UserPage';
import withAuth from './components/auth/withAuth';
import withoutAuth from './components/auth/withoutAuth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router forceRefresh={true}>
      <Switch>
        <Route path="/" component={withoutAuth(Landing)} exact />
        <Route path="/frontpage" component={withAuth(Home)} exact />
        <Route path="/user/:userId" component={withAuth(User)} exact />
      </Switch>
    </Router>
  );
}

export default App;

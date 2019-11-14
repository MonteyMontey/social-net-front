import React from 'react';
import LandingPage from './pages/LandingPage';
import FrontPage from './pages/FrontPage';
import withAuth from './components/withAuth';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/frontpage" component={withAuth(FrontPage)} exact />
      </Switch>
    </Router>
  );
}


export default App;

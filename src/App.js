import React from 'react';
import LandingPage from './pages/LandingPage';
import FrontPage from './pages/FrontPage';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/frontpage" exact>
          <FrontPage />
        </Route>
      </Switch>
    </Router>
  );
}


export default App;

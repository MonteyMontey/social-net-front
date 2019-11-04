import React from 'react';
import LandingPage from './components/landing-page/LandingPage';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>

        <Route path="/" exact>
          <LandingPage />
        </Route>

      </Switch>
    </Router>
  );
}


export default App;

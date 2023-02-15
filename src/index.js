import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import Nav from './Nav.js';



ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    
    <Router>
    
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route> 
      </Switch>
        
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);


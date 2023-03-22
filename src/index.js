import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home';
import Provlist from './Provlist';
import Nav from './Nav.js';

import Provmed from './Provmed'
import Provmed2 from './Provmed2'
import Edulist from './Edulist'
import LineChart from './LineChart'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import Signup from './Signup';
import Login from './Login';




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
          <Route exact path="/newprov">
          <Provlist />
            {/* <p>Hello new Provider</p> */}
          </Route>
          <Route path="/home">
            <>
            <Nav location="home" />
            <p>Hello World Home</p>
            </>
          </Route>
          <Route path="/opsmon">
            <p>Hello ops mon</p>
            <LineChart />
          </Route>
          
          <Route path="/edoutreach">
            <Edulist />
            {/* <p>Hello education and outreach</p> */}
          </Route>
          <Route path="/appeals">
            <>
            <Nav location="appeals" />
            <p>Hello appeals</p>
            </>
          </Route>
          <Route path="/comprpt">
            <>
              <Nav location="comprpt"/>
            <p>Hello compr eport</p>
            </>
          </Route>
          <Route path="/region">
            <>
              <Nav location="region"/>
            </>
            <p>Hello region</p>
          </Route>
          <Route path="/logout">
            <p>Hello logout</p>
          </Route>
          <Route path="/issues">
            <Nav />
            <p>Hello issues</p>
          </Route>
          <Route path="/ods">
          <Nav />
            <p>Hello ODS Team</p>
          </Route>
          <Route path="/provmed">
            <Provmed />
          </Route>
          <Route path="/provmed2">
            <Provmed2 />
          </Route>
          
      </Switch>
        
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);


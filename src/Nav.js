import './App.css';
import axios from 'axios';
import Provlist from './Provlist'
import Provmed from './Provmed'
import Provmed2 from './Provmed2'
import Edulist from './Edulist'
import LineChart from './LineChart'
import React, {
  useState,
  useEffect
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function Nav() {
  const [responsivenav, setresponsivenav] = useState("topnav")
  const [activelink, setactivelink] = useState("home")

  const handleClick = (e) => {
    console.log(e.target.id)
    setactivelink(e.target.id)
  }

  return (
    <div>
 <div className="header">
     {/* <!-- <img src="building1.jpg" alt="building"> --> */}
     <h2>The Department</h2>
     <p>This is some words, and more wordses</p>
  </div>

  <Router>
  <nav className="navbar">
  <div className={responsivenav} id="myTopnav">

  <Link className={activelink==="home"?"active":"notactive"} to="/home" id="home" onClick={handleClick}>Home</Link>
    <Link className={activelink==="opsmon"?"active":"notactive"} to="/opsmon" id="opsmon" onClick={handleClick}>Operational Monitoring</Link>
    <Link className={activelink==="newprov"?"active":"notactive"} to="/newprov" id="newprov"  onClick={handleClick}>New Provider Training</Link>
    <Link className={activelink==="edoutreach"?"active":"notactive"} to="/edoutreach" id="edoutreach" onClick={handleClick}>Education & Outreach</Link>
    <Link className={activelink==="appeals"?"active":"notactive"} to="/appeals" id="appeals" onClick={handleClick}>Appeals</Link>
    <Link className={activelink==="comprpt"?"active":"notactive"} to="/comprpt" id="comprpt" onClick={handleClick}>Completion Report</Link>
    <Link className={activelink==="region"?"active":"notactive"} to="/region" id="region" onClick={handleClick}>Region</Link>
    <div className="dropdown right">
      <button className="dropbtn">Logout/Help 
        <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-content">
        {/* <a href="#">Logout</a> */}
        <Link to="/logout">Logout</Link>
        {/* <a href="#">Issues</a> */}
        <Link to="/issues">Issues</Link>
        {/* <a href="#">ODS Team</a> */}
        <Link to="/ods">ODS Team</Link>
      </div>
    </div> 

    <a href="javascript:void(0);" style={{fontSize:"15px"}} className="icon" onClick={() => setresponsivenav(responsivenav === "topnav" ? "topnav responsive" : "topnav") }>&#9776;</a>
  </div>
  </nav>
      <div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/home">
            <p>Hello World Home</p>
          </Route>
          <Route path="/opsmon">
            <p>Hello ops mon</p>
            <LineChart />
          </Route>
          <Route exact path="/newprov">
            <Provlist />
            {/* <p>Hello new Provider</p> */}
          </Route>
          <Route path="/edoutreach">
            <Edulist />
            {/* <p>Hello education and outreach</p> */}
          </Route>
          <Route path="/appeals">
            <p>Hello appeals</p>
          </Route>
          <Route path="/comprpt">
            <p>Hello compreport</p>
          </Route>
          <Route path="/region">
            <p>Hello region</p>
          </Route>
          <Route path="/logout">
            <p>Hello logout</p>
          </Route>
          <Route path="/issues">
            <p>Hello issues</p>
          </Route>
          <Route path="/ods">
            <p>Hello ODS Team</p>
          </Route>
          <Route path="/provmed">
            <Provmed />
          </Route>
          <Route path="/provmed2">
            <Provmed2 />
          </Route>
        </Switch>
      </div>
  </Router>


    </div>




  );
}

export default Nav;
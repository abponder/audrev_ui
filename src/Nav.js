import './App.css';
import axios from 'axios';
import Provlist from './Provlist'
import Provmed from './Provmed'
import Provmed2 from './Provmed2'
import Edulist from './Edulist'
import LineChart from './LineChart'
import Signup from './Signup'
import Login from './Login'
import React, {
  useState,
  useEffect
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";


function Nav({location}) {
  const [responsivenav, setresponsivenav] = useState("topnav")
  const [activelink, setactivelink] = useState(location||"home")
  const history = useHistory();

  const handleClick = (e) => {
    console.log(e.target.id, activelink)
    // setactivelink(e.target.id)
    setactivelink(()=>e.target.id)
  }

  const handleLogout = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/api/logout`)
    history.push('/')
  }

  return (
    <div>
 <div className="header">
     {/* <!-- <img src="building1.jpg" alt="building"> --> */}
     <h2>The Department</h2>
     <p>This is some words, and more wordses</p>
  </div>

  {/* <Router> */}
  <nav className="navbar">
  <div className={responsivenav} id="myTopnav">

  <Link className={activelink==="home"?"active":"notactive"} to="/home" id="home" onClick={(e)=>setactivelink(e.target.id)}>Home</Link>
    <Link className={activelink==="opsmon"?"active":"notactive"} to="/opsmon" id="opsmon" onClick={(e)=>setactivelink(e.target.id)}>Operational Monitoring</Link>
    <Link className={activelink==="newprov"?"active":"notactive"} to="/newprov" id="newprov"  onClick={(e)=>setactivelink(e.target.id)}>New Provider Training</Link>
    <Link className={activelink==="edoutreach"?"active":"notactive"} to="/edoutreach" id="edoutreach" onClick={(e)=>setactivelink(e.target.id)}>Education & Outreach</Link>
    <Link className={activelink==="appeals"?"active":"notactive"} to="/appeals" id="appeals" onClick={(e)=>setactivelink(e.target.id)}>Appeals</Link>
    <Link className={activelink==="comprpt"?"active":"notactive"} to="/comprpt" id="comprpt" onClick={(e)=>setactivelink(e.target.id)}>Completion Report</Link>
    <Link className={activelink==="region"?"active":"notactive"} to="/region" id="region" onClick={(e)=>setactivelink(e.target.id)}>Region</Link>
    <div className="dropdown right">
      <button className="dropbtn">Logout/Help 
        <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-content">
        {/* <a href="#">Logout</a> */}
        <p onClick={handleLogout}>Logout</p>
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
        {/* <Switch>
          
        </Switch> */}
      </div>
  {/* </Router> */}


    </div>




  );
}

export default Nav;
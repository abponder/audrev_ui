import './App.css';
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
import axios from 'axios';
import React, {
  useState,
  useEffect
} from 'react';


// https://codebrahma.com/build-table-componenet-with-react-hooks/
//commentsss
export default function Home() {

  return(
    <div className="container">
      
        <div className="jumbotron text-center">
            <h1><span className="fa fa-lock"></span> Node Authentication</h1>

            <p>Login or Register with:</p>
            <Link to="/login" className="btn btn-default"><span className="fa fa-user"></span> Local Login</Link>
            <Link to="/signup" className="btn btn-default"><span className="fa fa-user"></span> Local Signup</Link>

        </div>
        
    </div>
  )
}


import './App.css';
import Nav from './Nav.js';
import axios from 'axios';
import React, {
  useState,
  useEffect
} from 'react';
import {
  Link
} from "react-router-dom";

// https://codebrahma.com/build-table-componenet-with-react-hooks/
//commentsss
export default function Login() {
  return(
    <div class="container">
        <div class="col-sm-6 col-sm-offset-3">
            <h1><span class="fa fa-sign-in"></span> Login</h1>

            <form action="/login" method="post">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" class="form-control" name="username"/>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" name="password"/>
                </div>
                <div class="form-group">
                    <label>Remember Me</label>
                    <input type="checkbox" class="form-control" name="remember" value="yes"/>
                </div>

                <button type="submit" class="btn btn-warning btn-lg">Login</button>
            </form>

            <hr/>

            <p>Need an account? <a href="/signup">Signup</a></p>
            <p>Or go <a href="/">home</a>.</p>
        </div>
    </div>
  )
}
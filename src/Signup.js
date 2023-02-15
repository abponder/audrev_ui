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
export default function Signup() {
  return(
    <div class="container">

<div class="col-sm-6 col-sm-offset-3">

	<h1><span class="fa fa-sign-in"></span> Signup</h1>

	<form action="/signup" method="post">
		<div class="form-group">
			<label>Username</label>
			<input type="text" class="form-control" name="username"/>
		</div>
		<div class="form-group">
			<label>Password</label>
			<input type="password" class="form-control" name="password"/>
		</div>

		<button type="submit" class="btn btn-warning btn-lg">Signup</button>
	</form>

	<hr/>

	<p>Already have an account? <a href="/login">Login</a></p>
	<p>Or go <a href="/">home</a>.</p>

</div>

</div>
  )
}
import './App.css';
import Nav from './Nav.js';
import axios from 'axios';
import React, {
  useState,
  useEffect
} from 'react';
import {
  Link,
	useHistory
} from "react-router-dom";

// https://codebrahma.com/build-table-componenet-with-react-hooks/
//commentsss
export default function Login() {
  const [creds, setCreds] = useState({});
	const history = useHistory();

	const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, creds)
		history.push('/home')
  }

	const handleChange = (e) => {
		
    const name = e.target.name;
    const value = e.target.value;
    setCreds(values => ({...values, [name]: value}))
  }


  return(
    <div className="container">

<div className="col-sm-6 col-sm-offset-3">

	<h1><span className="fa fa-sign-in"></span> Signup</h1>

	<form onSubmit={handleSubmit}>
		<div className="form-group">
			<label>Username</label>
			<input onChange = {handleChange} type="text" className="form-control" name="username"/>
		</div>
		<div className="form-group">
			<label>Password</label>
			<input onChange = {handleChange} type="password" className="form-control" name="password"/>
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
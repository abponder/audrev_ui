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
export default function Signup() {
  const [creds, setCreds] = useState({});
	const [err, setErr] = useState(null);
	const history = useHistory();

	const handleSubmit = async (e) => {
    e.preventDefault()
		try{	
			const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/signup`, creds)	
			history.push('/home')
		}catch(e){
			setErr(true)
		}
    
		
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

		<button type="submit" className="btn btn-warning btn-lg">Signup</button>
	</form>
		{err && <p>user name is taken</p>}
	<hr/>

	<p>Already have an account? <a href="/login">Login</a></p>
	<p>Or go <a href="/">home</a>.</p>

</div>

</div>
  )
}
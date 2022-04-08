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

function Provlist() {
  const [provdata, setprovdata] = useState([]);
  const [tblheadings, settblheadings] = useState([]);
  useEffect(()=> {
    async function fetchdata(){
      const response = await axios.get('/api/provlist')
      //console.log(response)
      settblheadings(Object.keys(response.data[0]))
      setprovdata(response.data)
    }
    fetchdata()
  },[]) 


  return (
    <div>
      <br></br>
      <h3>NEW PROVIDER TRAINING BY MEDICAL CENTER</h3>
      <br></br>
      <table>
      <thead>
        <tr>{tblheadings.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
    })}</tr>
      </thead>
    <tbody>
    {provdata.map((obj, idx) => (
        <tr>
          <td >
          <Link to={{pathname:"/provmed",state:{medctr:obj.MedCtr, provdata}}}>{obj.MedCtr}</Link>
          </td>
          <td >{obj.TotalOpen}</td>
          <td >{obj.TotalCompleted}</td>
      </tr>
      ))}
    </tbody>
</table>
     
    </div>
  );
}

export default Provlist;
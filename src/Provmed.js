import './App.css';
import axios from 'axios';
import React, {
  useState,
  useEffect
} from 'react';
import {useLocation, Link} from "react-router-dom";


// https://codebrahma.com/build-table-componenet-with-react-hooks/

function Provmed() {
  const [provdata, setprovdata] = useState([]);
  const [tblheadings, settblheadings] = useState([]);
  const location = useLocation();
  console.log('test')
  console.log(location.state)
  useEffect(()=> {
    async function fetchdata(){
      const response = await axios.get(`/api/provmed/${location.state.medctr}`)
      console.log(response.data)
      // console.log(Object.keys(response.data))
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
          })}
        </tr>
      </thead>
    <tbody>
    {provdata.map((obj, idx) => (
        <tr key={idx}>
          <td >{obj.ID}</td>
          <td >{obj.MedCtr}</td>
          <td >{obj.MOB}</td>
          <td >
            <Link to={{pathname:"/provmed2",state:{ID_newprov:obj.ID, MOB:obj.MOB, provider:obj.Provider, provdata}}}>
            {obj.Provider}
            </Link>
          </td> 
          <td >{obj.Role}</td>
          <td >{obj.Specialty}</td>
          <td >{obj.HireDate}</td>
          <td >{obj.CPMID}</td>
          <td >{obj.NUID}</td>
          <td >{obj.Status}</td>
          <td >{obj.StatusDate}</td>
      </tr>
     
       ))} 
    </tbody>
</table>
     
    </div>
  );
}

export default Provmed;
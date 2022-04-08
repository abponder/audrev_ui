import './App.css';
import axios from 'axios';
import React, {
  useState,
  useEffect
} from 'react';
import {useLocation, Link} from "react-router-dom";


// https://codebrahma.com/build-table-componenet-with-react-hooks/

function Provmed2() {
  const [provdata, setprovdata] = useState([]);
  const [tblheadings, settblheadings] = useState([]);
  const [xMedCtr, setxMedCtr] = useState([]);
  const location = useLocation();
  // console.log('test')
  // console.log(location.state)
  //console.log(xMedCtr)
  useEffect(()=> {
    async function fetchdata(){
      const response = await axios.get(`/api/provmed2/${location.state.ID_newprov}`)
      //console.log(response.data[0])
      // console.log(Object.keys(response.data))
      settblheadings(Object.keys(response.data[0]))
      setprovdata(response.data)
      setxMedCtr(response.data[0])
    }
    fetchdata()
  },[]) 


  return (
    <div>
      <br></br>
      <h3>NEW PROVIDER TRAINING BY PHASE</h3>
      <h4>PROVIDER: {xMedCtr.ProvName}</h4>
      <h4>Medical Center: {xMedCtr.MedOffice}</h4>
      <br></br>
      <table>
      <thead>
        <tr>{tblheadings.slice(1,7,8).map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
    })}</tr>
      </thead>
    <tbody>
    {provdata.map((obj, idx) => (
          
        <tr key={idx}>
          <td ><Link to={{pathname:"/provmed3",state:{medctr:obj.MedCtr, provdata}}}>{obj.ID_newprov}</Link></td>
          <td >{obj.phase}</td>
          <td >{obj.status}</td>
          <td >{obj.status_date}</td>
          <td >{obj.reviewer}</td>
          <td >{obj.comments}</td>
      </tr>
      
       ))} 
    </tbody>
</table>
     
    </div>
  );
}

export default Provmed2;
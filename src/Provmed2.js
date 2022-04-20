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
  const location = useLocation();
  const [showform, setshowform] = useState(false)
  const [currentformdata, setcurrentformdata] = useState(null)
  // console.log('test')
  console.log(location.state)
  useEffect(()=> {
    async function fetchdata2(){
      const response = await axios.get(`/api/provmed2/${location.state.ID_newprov}`)
      console.log((response.data))
      settblheadings(Object.keys(response.data[0]))
      setprovdata(response.data)
    }
    fetchdata2()
  },[]) 

  const handleclick = (e, rowData) => {
    e.preventDefault() //stops page from refreshing
    console.log("clicked", rowData)
    setshowform(true)
    setcurrentformdata(rowData)
  }

  return (
    <div>
      <br></br>
      <h3>NEW PROVIDER TRAINING BY PHASE</h3>
      <h4>PROVIDER: {location.state.provider}</h4>
      <h4>Medical Center: {location.state.MOB}</h4>
      <br></br>
      {showform && (
        <p>this is form spot {currentformdata.comments}</p>
        // <form>

        // </form>
      )}
      {!showform && <table>
      <thead>
        <tr>{tblheadings.slice(1,7,8).map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
    })}</tr>
      </thead>
    <tbody>
    {provdata.map((obj, idx) => (
          
        <tr onClick={(e)=>handleclick(e,obj)} key={idx}>
          <td >{obj.ID_newprov}</td>
          <td >{obj.phase}</td>
          <td >{obj.status}</td>
          <td >{obj.status_date}</td>
          <td >{obj.reviewer}</td>
          <td >{obj.comments}</td>
      </tr>
      
       ))} 
    </tbody>
</table>}
     
    </div>
  );
}

export default Provmed2;
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
  const [providers, setproviders] = useState([]);
  const [tblheadings, settblheadings] = useState([]);
  const [showform, setshowform] = useState(false)
  const [inputs, setInputs] = useState({});

  useEffect(()=> {
    async function fetchdata(){
      const response = await axios.get('/api/provlist')
      const providers = await axios.get('/api/providers')
      console.log('providers: ', providers)
      settblheadings(Object.keys(response.data[0]))
      setprovdata(response.data)
      setInputs({provider:providers.data[0].ProvName})
      setproviders(providers.data)
    }
    fetchdata()
  },[]) 

  const handleclick = (e) => {
    e.preventDefault() //stops page from refreshing
    setshowform(true)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("submit", inputs)
    await axios.post(`/api/addmtg`,inputs)
    const updatedProvdata = provdata.map(record => {
      if (record.ID_phase === inputs.ID_phase) {
        return inputs
      }
      // return record
    })
    setprovdata(updatedProvdata)
    // console.log("submit", [inputs])
    setshowform(false)
  }
  const handleChange = (e) => {
    console.log("providers",inputs.providers)
    console.log("etargetname",e.target.name)
    console.log("etargetvalue",e.target.value)
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  return (
    <div>
      <h3>NEW PROVIDER TRAINING BY MEDICAL CENTER</h3>
    {!showform && (
      <div>
      <br></br>
      <br></br>
      <button onClick={handleclick}>Add New Meeting</button>
      <br></br><br></br>
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
    )}

      {showform && (
        <form onSubmit={handleSubmit}>
        <br />
        <label for="providers">Providers:</label>
        <br />
        <select name='provider' onChange={handleChange} >
          {providers.map(provider =>(
          <option key={provider.ProvName} value={provider.ProvName}>{provider.ProvName}</option>
          ))}
        </select>
        
        <br />
        
        <br />
        <label>Reviewer:
        <br />
        <input 
          type="text" 
          name="reviewer" 
          value={inputs.reviewer} 
          onChange={handleChange}
        />
        </label>
        <br />
        <br />
          
          <input type="button" value="Cancel" onClick={()=> setshowform(false)} />
          <input type="submit" />

      </form>
      )}

    </div>
  );
}

export default Provlist;
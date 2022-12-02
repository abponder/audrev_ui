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
  const [inputs, setInputs] = useState({});
  const [statuses, setstatuses] = useState([]);
  // console.log('test')
  console.log("location:", useLocation())
  useEffect(()=> {
    async function fetchdata2(){
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/provmed2/${location.state.ID_newprov}`)
      const statusdrpdwn = await axios.get(`${process.env.REACT_APP_API_URL}/api/provmed3Status`)
      console.log(statusdrpdwn)
      console.log((response.data))
      settblheadings(Object.keys(response.data[0]))
      setprovdata(response.data)
      setstatuses(statusdrpdwn.data)
    }
    fetchdata2()
  },[]) 

  const handleclick = (e, rowData) => {
    e.preventDefault() //stops page from refreshing
    console.log("clicked", rowData)
    setshowform(true)
    setcurrentformdata(rowData)
    setInputs(rowData)
  }

  const handleSubmit = async (e, topic) => {
    e.preventDefault()
    console.log("inputs", inputs)
    await axios.put(`${process.env.REACT_APP_API_URL}/provmed2/edit`,inputs)
    const updatedProvdata = provdata.map(record => {
      if (record.ID_phase === inputs.ID_phase) {
        return inputs
      }
      return record
    })
    setprovdata(updatedProvdata)
    console.log("updatedProvdata 1", updatedProvdata)
    const overallstatus = updatedProvdata.filter(prov => prov.status === "Completed" || prov.status === "Training not Provided").length===3
    console.log("overallstatus", overallstatus)

      await axios.put(`${process.env.REACT_APP_API_URL}/api/provmed2/completed`,{
        status:overallstatus? "Completed":"In Progress",
        ID_newprov:updatedProvdata[0].ID_newprov
      })
    
    console.log("updatedProvdata ID", updatedProvdata[0].ID_newprov)
    setshowform(false)
  }

  const handleChange = (e) => {
    console.log("etargetname",e.target.name)
    console.log("etargetvalue",e.target.value)
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  return (
    <div>
      <br></br>
      <h3>NEW PROVIDER TRAINING BY PHASE</h3>
      <h4>PROVIDER: {location.state.provider}</h4>
      <h4>Medical Center: {location.state.MOB}</h4>
      
      <br></br>
      {showform && (
        <div>
        <h4>Phase: {currentformdata.phase}</h4>
        {/* // ID_newprov: 1
        // ID_phase: 2
        // MedOffice: "Darpa"
        // ProvName: "O. K. Roberts"
        // comments: "done with phase 2!"
        // phase: 2
        // reviewer: "Lisa Te"
        // status: "Completed"
        // status_date: "2022-01-15T08:00:00.000Z" */}
        <form onSubmit={handleSubmit}>
        <label>Comments:
        <br />
        <input 
          type="text" 
          name="comments" 
          value={inputs.comments} 
          onChange={handleChange}

        />
        </label>
        <br />
        <label for="status">Phase Status:</label>
        <br />
        <select name='status' onChange={handleChange} value={inputs.status}>
          {statuses.map(status =>(
            <option value={status.statusDesc}>{status.statusDesc}</option>
          ))}
        </select>
        {/* <label>Status:
        <br />
        <input 
          type="text" 
          name="status" 
          value={inputs.status} 
          onChange={handleChange}
        />
        </label> */}
        <br />
        <label>Status Date:
        <br />
        <input 
          type="text" 
          name="status_date" 
          value={currentformdata.status_date} 
          disabled
        />
        </label>
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
      </div>
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
import './App2.css';
import axios from 'axios';
import React, {
  useState,
  useEffect
} from 'react';
import {useLocation, Link} from "react-router-dom";

//randoms
// https://codebrahma.com/build-table-componenet-with-react-hooks/

function Provmed() {
  const [provdata, setprovdata] = useState([]);
  const [tblheadings, settblheadings] = useState([]);
  const location = useLocation();
  const [showmodal, setshowmodal] = useState(false)
  const [medctrchoice, setmedctrchoice] = useState('');
  const [curritem, setcurritem] = useState([]);
  const [citydata, setcitydata] = useState({});
  console.log('test')
  console.log(location.state)
  useEffect(()=> {
    async function fetchdata(){
      const response = await axios.get(`/api/provmed/${location.state.medctr}`)
      console.log(response.data)
      // console.log(Object.keys(response.data))
      settblheadings(Object.keys(response.data[0]))
      setprovdata(response.data)
      setcitydata({[location.state.medctr]: response.data})
    }
    fetchdata()
  },[]) 

  const handleChange = async (e) => {
    console.log(e.target.value)
    const name = e.target.name;
    const value = e.target.value;
    setmedctrchoice(values => ({[name]: value}))
    if(citydata[value]){
      setprovdata(citydata[value])
    }else {
      const response = await axios.get(`/api/provmed/${value}`)
      setprovdata(response.data)
      setcitydata(values => ({
        ...values,
        [value]:response.data
      }))
    }
  }

  const deletemeeting = async (id) => {
    console.log(id)
      await axios.delete('/api/deletemtg',{data:{idnewprov:id}})
      setshowmodal(false)
      setprovdata(provdata.filter(record => record.ID !== id ))
  }

  return (
    <div>
      <br></br>
      <h3>NEW PROVIDER TRAINING BY MEDICAL CENTER</h3>
      <br></br>
        <select name='medctr' onChange={handleChange} value={medctrchoice}>
        <option>Choose Medical Center</option>
            {location.state.provdata.map(medctrX =>(
            <option value={medctrX.MedCtr}>{medctrX.MedCtr}</option>
          ))}
        </select>
      <br></br>
      <table>
      <thead>
        <tr>{tblheadings.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
          })}
          <th >DELETE</th>

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
          <td ><button onClick={()=>{
            setshowmodal(true);
            setcurritem(obj.ID);
            }} >delete</button></td>
      </tr>
     
       ))} 
    </tbody>
</table>
     
      {showmodal && (
        
        <div id="id01" className="modal">
          <span className="close" title="Close Modal" onClick={()=>setshowmodal(false)}>×</span>
          <form className="modal-content" >
            <div className="container">
              <h1>Delete Account</h1>
              <p>Are you sure you want to delete this Meeting?</p>
            
              <div className="clearfix">
                <button type="button" className="cancelbtn" onClick={()=>setshowmodal(false)}>Cancel</button>
                <button type="button" className="deletebtn" onClick={()=>deletemeeting(curritem)}>Delete</button>
              </div>
            </div>
          </form>
        </div>



      )}


    </div>
  );
}

export default Provmed;
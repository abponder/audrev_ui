import './App.css';
import Nav from './Nav.js';
import axios from 'axios';
import React, {
  useState,
  useEffect
} from 'react';



function Provlist() {
  const [provdata, setprovdata] = useState([]);
  useEffect(()=> {
    async function fetchdata(){
      const response = await axios.get('/api/provlist')
      console.log(response)
      setprovdata(response.data)
    }
    fetchdata()
  },[]) 
  return (
    <div>
      {provdata.map((obj, idx) => (
        <div key={idx}>{obj.MedCtr}</div>
      ))}
    </div>
  );
}

export default Provlist;
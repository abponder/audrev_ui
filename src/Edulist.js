import './App.css';
import Nav from './Nav.js';
import axios from 'axios';
import React, {
  useState,
  useEffect
} from 'react';



function Edulist() {
  const [edudata, setprovdata] = useState([]);
  useEffect(()=> {
    async function fetchdata(){
      const response = await axios.get('/api/edulist')
      console.log(response)
      setprovdata(response.data)
    }
    fetchdata()
  },[]) 
  return (
    <div>
      {edudata.map((obj, idx) => (
        <div key={idx}>{obj.specialty}</div>
      ))}
    </div>
  );
}

export default Edulist;
import './App.css';
import Nav from './Nav.js';
import axios from 'axios';
import React, {
  useState,
  useEffect
} from 'react';

function Edulist() {

  const defaultSelectValue = ["Select a Specialty"]
  const [speclist, setspeclist] = useState([]);
  const [selected, setSelected] = useState(defaultSelectValue[0])
  

  useEffect(()=> {
      async function fetchdata(){
        const response = await axios.get('/api/edulist')
        console.log('/api/edulist', response)
        // setprovdata(response.data)
        setspeclist(response.data)
      }
      fetchdata()
    },[]) 


  return (
    <>
      <h3>Specialties</h3>
      <br />
      <label name="Spec">Specialty:</label>{' '}
      <select

        defaultValue={selected}
        style={{ color: selected === defaultSelectValue[0] ? "DodgerBlue" : "Black" }}
        onChange={e => setSelected(e.target.value)}
      >
        <option>{defaultSelectValue}</option>
        {speclist.map((obj, idx) => (
        <option key={idx}>{obj.specialty}</option>
      ))}
      </select>

      <h4>Selected: {selected === defaultSelectValue[0] ? <span>_ _ _</span> : selected}</h4>

    
    </>
  );
}

export default Edulist;
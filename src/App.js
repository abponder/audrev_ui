import './App.css';
import axios from 'axios';
import React, {
  useState,
  useEffect
} from 'react';


function App() {
  const [testdata, settestdata] = useState([]);
  useEffect(()=> {
    async function fetchdata(){
      const response = await axios.get('/api')
      console.log(response)
      settestdata(response.data)
    }
    fetchdata()
  },[])
  return (
    <div>
      {testdata.map((obj, idx) => (
        <div>{obj.ProvName}</div>
      ))}
    </div>
  );
}

export default App;

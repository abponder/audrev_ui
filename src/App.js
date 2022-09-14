// import './App.css';
import Nav from './Nav.js';
import axios from 'axios';
import React, {
  useState,
  useEffect
} from 'react';



function App() {
  // const [testdata, settestdata] = useState([]);
  // useEffect(()=> {
  //   async function fetchdata(){
  //     const response = await axios.get('/api')
  //     console.log(response)
  //     settestdata(response.data)
  //   }
  //   fetchdata()
  // },[])
  return (
    <div>
      <Nav />
      {/* {testdata.map((obj, idx) => (
        <div key={idx}>{obj.MedCenter}</div>
      ))} */}
    </div>
  );
}

export default App;

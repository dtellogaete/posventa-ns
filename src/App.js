import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Components/Home';

import {  BrowserRouter,  Route, Routes, Link } from 'react-router-dom';
import FormService from './Components/Form';


const App = () => {
  return ( 
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />      
          <Route path="/service" element={<FormService/>} />      
        </Routes>      
      </BrowserRouter>    
    </div>   
    
  );
}

export default App;

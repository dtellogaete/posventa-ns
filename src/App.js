import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Components/Home';

import {  BrowserRouter,  Route, Routes, Link } from 'react-router-dom';
import FormService from './Components/FormService';
import FormCapacitacion from './Components/FormCapacitacion';


const App = () => {
  return ( 
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />      
          <Route path="/servicio" element={<FormService/>} />     
          <Route path="/capacitacion" element={<FormCapacitacion/>} />   
        </Routes>      
      </BrowserRouter>    
    </div>   
    
  );
}

export default App;

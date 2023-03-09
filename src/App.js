import 'bootstrap/dist/css/bootstrap.min.css';

import {  BrowserRouter,  Route, Routes} from 'react-router-dom';

import FormService from './views/FormService';
import FormCapacitacion from './views/FormCapacitacion';
import Admin from './views/Admin';
import Home from './views/Home';


const App = () => {
  return ( 
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />      
          <Route path="/servicio" element={<FormService/>} />     
          <Route path="/capacitacion" element={<FormCapacitacion/>} />   
          <Route path="/admin" element={<Admin/>} />   
        </Routes>      
      </BrowserRouter>    
    </div>   
    
  );
}

export default App;

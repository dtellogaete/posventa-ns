import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col} from 'react-bootstrap';
import NavbarNs from './Components/Nav';
import ServiceCard from './Components/Services';
import Footer from './Components/Footer';
import FormService from './Pages/Form';

import {  BrowserRouter,  Route, Routes, Link } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        
    
        <NavbarNs></NavbarNs>
        <h1 className='home' style={{textAlign: "center", paddingTop:'25px'}}>Selecciona el Servicio Deseado</h1>
        <Container className='home'  style = {{display:"flex"}}>
          <Row style={{display: "flex",  }}>
            <Col >
              <ServiceCard title="Solicita un Servicio" img="img/service.jpg" url="/about"></ServiceCard>
            </Col>
            <Col >
              <ServiceCard title="Solicita una Capacitación" img="img/capacitacion.jpg"></ServiceCard>  
            </Col>          
          </Row>      
        </Container>
        <Footer style={{minHeight: '100vh'}}></Footer>
        

        <Routes>
        
        <Route path="/about" element={<FormService />} />

        </Routes>


        
        
        
      
      </div>
    </BrowserRouter>
  );
}

export default App;

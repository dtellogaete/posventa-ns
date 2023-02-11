import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col} from 'react-bootstrap';
import NavbarNs from './Nav';
import ServiceCard from './Services';
import Footer from './Footer';


import {  BrowserRouter,  Route, Routes, Link } from 'react-router-dom';


const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', minWidth: '100%' }}>
        <NavbarNs/>
        <h1 className='home' style={{ flex: 1, textAlign: "center", paddingTop:'25px'}}>Selecciona el Servicio Deseado</h1>
        <Container className='home'  style={{ display: 'flex', flex: 1 }}>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col >
                    <ServiceCard title="Solicita un Servicio" img="img/service.jpg" url="/servicio"></ServiceCard>
                </Col>
                <Col >
                    <ServiceCard title="Solicita una Capacitación" img="img/capacitacion.jpg" url="/capacitacion"></ServiceCard>  
                </Col>          
            </Row>      
        </Container>
        <Footer/>
    </div>  
  );
}

export default Home;
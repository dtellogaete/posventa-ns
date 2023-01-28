import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import NavbarNs from './Components/Nav';
import ServiceCard from './Components/Services';


function App() {
  return (
    <div className="App">
      <NavbarNs></NavbarNs>
      <h1 className='home'>Selecciona el Servicio Deseado</h1>
      <Container className='home' style = {{display:"flex"}}>
        <ServiceCard title="Solicita un Servicio"></ServiceCard>
        <ServiceCard title="Solicita una Capacitación"></ServiceCard>     
      </Container>

    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

/* CSS */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

/*Components*/
import NavbarNs from '../components/Nav';
import Footer from '../components/Footer';
import Axios from 'axios'

/* Bootstrap */
import { Container, Row, Button, Form} from 'react-bootstrap';

/* Datos */
import {getSoftware} from '../Data/software';
import {getSoftwareId} from '../Data/softwareid';
import {getMaxCustomer} from '../Data/maxcustomer';
import {createPDFCapa} from '../Pdf/capacitacion';


function FormCapacitacion() { 
  
  /* Obtener listado de softwares*/
  const [softList,setSoftList] = useState([]);  
  const [maxCust, setMaxCust] = useState(0);
  const [softName, setSoftName] = useState('');
  
  useEffect(() => {
    getSoftware().then(data => setSoftList(data));    
    getMaxCustomer().then(data => setMaxCust(data));
        
  }, []);

/* Forms */
const [formData, setFormData] = useState({
  id: '', 
  name: '',
  contact: '',
  service: '',
  address: '',
  phone: '',
  email: '',
  work: '',
  system: '',
  kind: 'Capacitación',
  folio: '',
  soft:'',   
})

const handleChange = async (event) => {
  const { id, value } = event.target;
  const softName = await getSoftwareId(Number(formData.system) + 1);  
  setFormData({ ...formData, [id]: value, soft: softName[0] });
};

  /* Button */
  const handleClick = () => {  
    if (!formData.name || !formData.contact || !formData.phone || !formData.email || !formData.service || !formData.system || !formData.work || !formData.folio) {
      alert('Por favor, complete todos los campos obligatorios');
      return;
    }
    
    window.open('https://nationalsoft.openser.com/indexPublic.html#PortalPublic', '_blank');      
    handleSubmitCustomer();  
    handleSubmit();
    createPDFCapa(formData);   
    alert("Generando PDF...");
    window.location.href = '/'    
  };

  /* Enviar datos a la base de datos */
  const handleSubmit = () => {    
    Axios.post('http://localhost:3002/api/servicecap',
    {      
      service: formData.service,
      idsoft: formData.system,
      idcustomer: maxCust[0] + 1,         
      work: formData.work,      
      kind: "Capacitación",
      folio: formData.folio
         
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  };

   /* Enviar datos a la base de datos clientes */
   const handleSubmitCustomer = () => {    
    Axios.post('http://localhost:3002/api/cliente',
    {
      name: formData.name,      
      contact: formData.contact,      
      address: formData.address,
      phone: formData.phone,
      email: formData.email,      
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }; 

  console.log(softList)
  console.log(formData)  
  console.log(softName[0])


  return (      
    <div className=" App FormService">          
    <NavbarNs></NavbarNs>        
      <Container className='home'  style = {{ width: 'auto'}}>
        <Row style={{display: "flex"}}>
          <Form style={{textAlign: 'left'}}>
            <Form.Group className="mb-3" id="formBasicName">
              <Form.Label>Nombre Comercial<span className="required"> *</span></Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Nombre del Negocio"
                value={formData.name}
                onChange={handleChange}
                id = "name" 
                required />        
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Contacto <span className="required"> *</span></Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Nombre"
                id = "contact"                  
                value={formData.contact}
                onChange={handleChange} 
                required/>        
            </Form.Group>              
            <Form.Group className="mb-3"   type="text">
              <Form.Label>Dirección</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Dirección"
                id="address"
                value={formData.address} 
                required 
                onChange ={handleChange}
                />        
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Teléfono <span className="required"> *</span></Form.Label>
              <Form.Control 
                type="tel" 
                placeholder="Teléfono"
                id="phone"
                value={formData.phone}
                onChange ={handleChange}
                required/>        
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Correo Electrónico <span className="required"> *</span></Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Ingresar Email"
                id="email" 
                value={formData.email}
                onChange={handleChange}
                required/>                
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Servicio <span className="required"> *</span></Form.Label>
              <Form.Control as="select" name="service" required onChange={handleChange} id="service" value={formData.service}>
                <option value="">Selecciona una opción</option>
                <option>En Línea</option>
                <option>En Sitio</option>
              </Form.Control>
            </Form.Group>              
            <Form.Group className="mb-3" >
              <Form.Label>Elabora <span className="required"> *</span></Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Nombre de Ejecutivo de Ventas"
                id="work"
                value={formData.work}
                onChange={handleChange}
                required />        
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Sistema <span className="required"> *</span></Form.Label>
              <Form.Control 
                as="select"
                id="system"
                value={formData.system}
                onChange={handleChange}
                required>
                <option value="">Selecciona una opción</option>
                {softList.map(item =>{                    
                    return (<option value={item.idsoft}>{item.name}</option>)
                })}                   
              </Form.Control>
            </Form.Group>              
            <Form.Group className="mb-3">
              <Form.Label>Folio Factura <span className="required"> *</span></Form.Label>
              <Form.Control 
                type="text" 
                placeholder="ST 000123"
                id="folio"
                value={formData.folio}
                onChange={handleChange}
                required/>        
            </Form.Group>                 
            <Button variant="danger" type="submit" onClick={handleClick}>
              Enviar Formulario
            </Button>
          </Form>        
        </Row>      
      </Container>
      <Footer style={{minHeight: '100vh'}}></Footer>         
    </div>
    
  );
}
  
export default FormCapacitacion;
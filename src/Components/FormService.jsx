import React, { useState, useEffect } from 'react';

/* CSS */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

/*Components*/
import NavbarNs from './Nav';
import Footer from './Footer';
import Axios from 'axios'

/* Bootstrap */
import { Container, Row, Button, Form, Modal, Toast} from 'react-bootstrap';


/* Datos */
import {getSoftware} from '../Data/software';
import { getMaxVals } from '../Data/maxvals';
import {getMaxCustomer} from '../Data/maxcustomer';
import {createPDFServ} from '../Pdf/service';

function FormService() { 
  
  /* Obtener listado de softwares*/
  const [softList,setSoftList] = useState([]);
  const [maxVals, setMaxVals] = useState(0);
  const [maxCust, setMaxCust] = useState(0);

  
  useEffect(() => {
    getSoftware().then(data => setSoftList(data));
    getMaxVals().then(data => setMaxVals(data));
    getMaxCustomer().then(data => setMaxCust(data));    
  }, []);

/*Toast*/
const [showA, setShowA] = useState(true);
const toggleShowA = () => setShowA(!showA);
  
/* Forms */

const [checkComp, setcheckComp] = useState({
  cServer: {processor: false, ram:false, memory: false, os: false, internet:false},
  cStation: {processor: false, ram:false, memory: false, os: false},
});

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
  kind: '',
  folio: '',
  qEquipment: '',
  qLogo: '',
  qReq: '',
  qCSD: '',
  qNode: '',
  qNotification: '',
  cServer: checkComp.cServer,
  cStation: checkComp.cStation,
})

const handleChange = (event) => {
  setFormData({
    ...formData,
    [event.target.id]: event.target.value,
  });
}

const handleChangeCompu = (event) => {
  const { id, name, checked } = event.target;
  setcheckComp((prevState) => ({
    ...prevState,
    [id]: {
      ...prevState[id],
      [name]: checked,
    },
  }));
};

  /* Button */
  const handleClick = () => {   
    if (!formData.name || 
      !formData.contact || 
      !formData.phone || 
      !formData.email || 
      !formData.service || 
      !formData.system || 
      !formData.work || 
      !formData.folio ||
      !formData.qCSD ||
      !formData.qEquipment ||
      !formData.qLogo ||
      !formData.qNode ||
      !formData.qNotification ||
      !formData.qReq) {
      alert('Por favor, complete todos los campos obligatorios');
      return;
    }
    createPDFServ(formData, checkCompVal);
    alert("Generando PDF...");
    window.open('https://nationalsoft.openser.com/indexPublic.html#PortalPublic', '_blank');    
    handleSubmitCustomer();
    handleSubmitValidations();  
    handleSubmit();
     
    window.location.href = '/' 
  };

  /* Enviar datos a la base de datos */
  const handleSubmit = () => {    
    Axios.post('http://localhost:3002/api/service', 
    {      
      service: formData.service,
      idsoft: formData.system,
      idcustomer: maxCust[0] + 1,
      idvals: maxVals[0]+1,     
      work: formData.work,
      system: formData.system,
      kind: formData.kind,
      folio: formData.folio.toUpperCase(),         
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

  var checkCompVal = {cServer: {        
    processor: checkComp.cServer.processor === true ? "Procesador Intel/amd i/ryzen 3+" : "",
    ram: checkComp.cServer.ram === true ? "Memoria Ram 4GB +" : "",
    memory: checkComp.cServer.memory === true ? "HDD 64GB+" : "",
    os: checkComp.cServer.os === true ? "Windows 8+ Home/PRO" : "",
    internet:checkComp.cServer.internet === true ? "Internet Explorer 9+" : "",
  },
  cStation: {        
      processor: checkComp.cStation.processor === true ? "Procesador Intel/amd i/ryzen 3+" : "",
      ram: checkComp.cStation.ram === true ? "Memoria Ram 4GB +" : "",
      memory: checkComp.cStation.memory === true ? "HDD 64GB+" : "",
      os: checkComp.cStation.os === true ? "Windows 8+ Home/PRO" : "",  
  }}

  /* Enviar datos a la base de datos validations */
  const handleSubmitValidations = () => {    
    Axios.post('http://localhost:3002/api/val', 
    {
      qEquipment: parseInt(formData.qEquipment),
      qLogo: parseInt(formData.qLogo),
      qReq: parseInt(formData.qReq),
      qCSD: parseInt(formData.qCSD),
      qNode: parseInt(formData.qNode),
      qNotification: parseInt(formData.qNotification),
      cserver_processor: checkComp.cServer.processor === true ? "Procesador Intel/amd i/ryzen 3+" : "",
      cserver_ram: checkComp.cServer.ram === true ? "Memoria Ram 4GB +" : "",
      cserver_memory: checkComp.cServer.memory === true ? "HDD 64GB+" : "",
      cserver_os: checkComp.cServer.os === true ? "Windows 8+ Home/PRO" : "",
      cserver_internet: checkComp.cServer.internet === true ? "Internet Explorer 9+" : "",
      cstation_processor: checkComp.cStation.processor === true ? "Procesador Intel/amd i/ryzen 3+" : "",
      cstation_ram: checkComp.cStation.ram === true ? "Memoria Ram 4GB +" : "",
      cstation_memory: checkComp.cStation.memory === true ? "HDD 64GB+" : "",
      cstation_os: checkComp.cStation.os === true ? "Windows 8+ Home/PRO" : "",      
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  };

  console.log(formData)
  console.log(checkComp)

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
 

  return (      
    <div className=" App FormService">          
    <NavbarNs></NavbarNs>        
      <Container className='home'  style = {{ width: 'auto'}}>
        <Row style={{display: "flex"}}>     
          <Form style={{textAlign: 'left'}}>
          <Form.Group className="mb-3" id="formBasicName" required>
              <Toast show={showA} onClose={toggleShowA} style={{ width: 'auto' }} className="toastNote">
                <Toast.Header>
                  <strong className="me-auto"> &#128308; Nota Informativa</strong>
                </Toast.Header>
                <Toast.Body>
                  El servicio sera realizado siempre y cuando el equipo cuente con algunos de los siguientes sistemas operativos:
                  <ul>
                    <li>Windows 8.1 Pro</li>
                    <li>Windows 10 Enterprise</li>
                    <li>Windows 10 Pro</li>
                    <li>Windows 10 LSTC</li>
                    <li>Windows 11 Enterprise</li>
                    <li>Windows 11Pro</li>
                    <li>Windows 11 LTSC</li>
                    <li>Windows server 2022</li>
                  </ul>          
                </Toast.Body>
              </Toast>
          </Form.Group>           
          <Form.Group className="mb-3" id="formBasicName" required>
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
                type="number"
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
            <Form.Group className="mb-3" >
              <Form.Label>Tipo de Servicio <span className="required"> *</span></Form.Label>
              <Form.Control as="select"
                id="kind"
                value={formData.kind}
                onChange={handleChange}
                required>
                <option value="">Selecciona una opción</option>
                <option>Instalación</option>
                <option>Migración</option>
                <option>Cambio de Servidor</option>               
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
            <Form.Group className="mb-3" >
              <Form.Label>Los equipos de computo <span className="required"> *</span></Form.Label>
                {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    required
                    inline
                    label="El cliente no adquirió los equipos" 
                    name="qEquipment"
                    type={type}
                    id="qEquipment"
                    value='0' 
                    checked={formData.qEquipment === "0"}
                    onChange={handleChange}
                  />
                  <Form.Check
                    inline
                    label="Solicitarlos en almacén" 
                    name="qEquipment"
                    type={type}
                    id="qEquipment"
                    value='1' 
                    checked={formData.qEquipment  === "1"}
                    onChange={handleChange}
                  />
                  <Form.Check
                    inline                    
                    label="Ya fueron entregados al cliente" 
                    name="qEquipment"
                    type={type}
                    id="qEquipment"
                    value='2' 
                    checked={formData.qEquipment === "2"}
                    onChange={handleChange}
                  />
                </div>
              ))}                
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicHardware">
              <Form.Label>¿El cliente cuenta con su logo en formato editable PNG/JPEG?<span className="required"> *</span></Form.Label>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    required
                    inline
                    label="Si"                      
                    type={type}
                    id="qLogo"
                    name="qLogo"
                    value= "1" 
                    checked={formData.qLogo === "1"}        
                    onChange={handleChange}                      
                  />
                  <Form.Check
                    inline
                    label="No"                    
                    type={type}
                    id="qLogo"
                    name="qLogo"
                    value= "0" 
                    checked={formData.qLogo === "0"}    
                    onChange={handleChange} 
                  />                                   
                </div>
              ))}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicInformedCustomer">
              <Form.Label>¿El cliente cuenta con energía eléctrica?<span className="required"> *</span></Form.Label>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    required
                    inline
                    label="Si"                      
                    type={type}
                    id="qReq"
                    name="qReq"
                    value= "1" 
                    checked={formData.qReq === "1"}    
                    onChange={handleChange} 
                  />
                  <Form.Check
                    inline
                    label="No"                    
                    type={type}
                    id="qReq"
                    name="qReq"
                    value= "0" 
                    checked={formData.qReq === "0"}    
                    onChange={handleChange} 
                  />                                   
                </div>
              ))}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCSD">
              <Form.Label>¿El cliente cuenta con sus archivos de facturacion CSD? <span className="required"> *</span></Form.Label>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    required
                    inline
                    label="Si"                      
                    type={type}
                    id="qCSD"
                    name="qCSD"
                    value= "1"     
                    checked={formData.qCSD === "1"}    
                    onChange={handleChange} 
                  />
                  <Form.Check
                    inline
                    label="No"                     
                    type={type}
                    id="qCSD"
                    name="qCSD"
                    value= "0"     
                    checked={formData.qCSD === "0"}    
                    onChange={handleChange} 
                  />                                   
                </div>
              ))}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNodes">
              <Form.Label>¿El cliente cuenta con nodos de red funcionales? <span className="required"> *</span> </Form.Label>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    required
                    inline
                    label="Si"                  
                    type={type}
                    id="qNode"
                    name="qNode"
                    value= "1"
                    checked={formData.qNode === "1"}         
                    onChange={handleChange}
                  />
                  <Form.Check
                    inline
                    label="No"                     
                    type={type}
                    id="qNode"
                    name="qNode"
                    value= "0"
                    checked={formData.qNode === "0"}     
                    onChange={handleChange}
                  />                                   
                </div>
              ))}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNodes">
              <Form.Label>Se notificó por correo los requisitos para realizar el servicio <span className="required"> *</span></Form.Label>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    required
                    inline
                    label="Si"                     
                    type={type}
                    id="qNotification"
                    name="qNotification"
                    value= "1"
                    checked={formData.qNotification === "1"}         
                    onChange={handleChange}
                  />
                  <Form.Check
                    inline
                    label="No"                    
                    type={type}
                    id="qNotification"
                    name="qNotification"
                    value= "0"
                    checked={formData.qNotification === "0"}     
                    onChange={handleChange}
                  />                                   
                </div>
              ))}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNodes">
              <Form.Label>Marca las casillas que cumplen con los requisitos de instalación para el servidor</Form.Label>
              {['checkbox'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    inline
                    label="Procesador Intel/amd i/ryzen 3+"                      
                    type={type}
                    id="cServer"
                    name="processor"
                    value= "Procesador Intel/amd i/ryzen 3+"                     
                    checked={checkComp.cServer.processor}    
                    onChange={handleChangeCompu}
                  />
                  <Form.Check
                    inline
                    label="Memoria Ram 4GB +"                     
                    type={type}
                    id="cServer"
                    name="ram"
                    value= "Memoria Ram 4GB +" 
                    checked={checkComp.cServer.ram}     
                    onChange={handleChangeCompu}
                  />
                  <Form.Check
                    inline
                    label="HDD 64GB+"                      
                    type={type}
                    id="cServer"
                    name="memory"
                    value= "HDD 64GB+" 
                    checked={checkComp.cServer.memory}     
                    onChange={handleChangeCompu}
                  />
                  <Form.Check
                    inline
                    label="Windows 8+ Home/PRO"                     
                    type={type}
                    id="cServer"
                    name="os"
                    value= "Windows 8+ Home/PRO" 
                    checked={checkComp.cServer.os}     
                    onChange={handleChangeCompu}
                  />
                  <Form.Check
                    inline
                    label="Internet Explorer 9+"                      
                    type={type}
                    id="cServer"
                    name="internet"
                    value= "Internet Explorer 9+" 
                    checked={checkComp.cServer.internet} 
                    onChange={handleChangeCompu}
                  />                                                                
                </div>
              ))}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNodes">
              <Form.Label>Marca las casillas que cumplen con los requisitos de instalación para los comandero</Form.Label>
              {['checkbox'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    inline
                    label="Procesador Intel/amd i/ryzen 3+"                      
                    type={type}
                    id="cStation"
                    name="processor"
                    value= "Procesador Intel/amd i/ryzen 3+" 
                    checked={checkComp.cStation.processor}    
                    onChange={handleChangeCompu}
                  />
                  <Form.Check
                    inline
                    label="Memoria Ram 4GB +"                     
                    type={type}
                    id="cStation"
                    name="ram"
                    value= "Memoria Ram 4GB +" 
                    checked={checkComp.cStation.ram}     
                    onChange={handleChangeCompu}
                  />
                  <Form.Check
                    inline
                    label="HDD 64GB+"                      
                    type={type}
                    id="cStation"
                    name="memory"
                    value= "HDD 64GB+" 
                    checked={checkComp.cStation.memory}     
                    onChange={handleChangeCompu}
                  />
                  <Form.Check
                    inline
                    label="Windows 8+ Home/PRO"                     
                    type={type}
                    id="cStation"
                    name="os"
                    value= "Windows 8+ Home/PRO" 
                    checked={checkComp.cStation.os}     
                    onChange={handleChangeCompu}
                  />                                                                            
                </div>
              ))}
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
  
export default FormService;
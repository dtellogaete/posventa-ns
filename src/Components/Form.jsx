import  { useState } from 'react';
import { useFormik } from 'formik';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Container, Row, Col} from 'react-bootstrap';
import NavbarNs from './Nav';
import Footer from './Footer';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {  FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


/* Generador de PDF */
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


function FormService() {

  const createPDF = () => {
    const documentDefinition = { 
        content: 'Hello World'
    };
    pdfMake.createPdf(documentDefinition).download();
}
  const [selectedOption, setSelectedOption] = useState("");
  const [visibleAdd, setVisibleaAdd] = useState(false);

  const formik = useFormik({
    initialValues: {
      example: ''
    },
    onSubmit: values => {
      console.log(values);
    },
  });



  /* Campo Address Deshabilitdo */
  const [disabled, setDisabled] = useState(true);

  const handleSelectChange = event => {
    if (event.target.value === "En Sitio") {
        setDisabled(true);
    } else {
        setDisabled(false);
    }
};

/*
const handleChange = event => {
  console.log(event.target.value);
  formik.setFieldValue(event.target.name, event.target.value);
};
*/

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
  kind: '',
  folio: '',
  qEquipment: '',
  qLogo: '',
  qReq: '',
  qCSD: '',
  qNodes: '',
  qNotification: '',
  cServer: {processor: '', ram:'', memory: '', os: '', internet:''},
  cStation: {processor: '', ram:'', memory: '', os: ''},
})

const handleChange = (event) => {
  setFormData({
    ...formData,
    [event.target.id]: event.target.value
  });
}

console.log(formData)

    return (
      
      <div className=" App FormService">          
       <NavbarNs></NavbarNs>        
        <Container className='home'  style = {{display:"flex"}}>
          <Row style={{display: "flex"}}>
            <Form style={{textAlign: 'left'}}>
              <Form.Group className="mb-3" controlId="formBasicName" required>
                <Form.Label>Nombre Comercial<span class="required"> *</span></Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Nombre del Negocio"
                  value={formData.name}
                  onChange={handleChange}
                  id = "name" 
                  required />        
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicContact">
                <Form.Label>Contacto <span class="required"> *</span></Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Nombre del Negocio"
                  id = "contact"                  
                  value={formData.contact}
                  onChange={handleChange} 
                  required/>        
              </Form.Group>
              <Form.Group className="mb-3" controlId="formImplementation">
                <Form.Label>Servicio <span class="required"> *</span></Form.Label>
                <Form.Control as="select" name="service" required onChange={handleChange} id="service">
                  <option value="">Selecciona una opción</option>
                  <option value={formData.service}>En Línea</option>
                  <option value={formData.service}>En Sitio</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicAddress"  type="text">
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
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Teléfono <span class="required"> *</span></Form.Label>
                <Form.Control 
                  type="tel" 
                  placeholder="Teléfono"
                  id="phone"
                  value={formData.phone}
                  onChange ={handleChange}
                  required/>        
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo Electrónico <span class="required"> *</span></Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Ingresar Email"
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required/>                
              </Form.Group>              
              <Form.Group className="mb-3" controlId="formBasicEjecutivo">
                <Form.Label>Elabora <span class="required"> *</span></Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Nombre de Ejecutivo de Ventas"
                  id="work"
                  value={formData.work}
                  onChange={handleChange}
                  required />        
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSoft">
                <Form.Label>Sistema <span class="required"> *</span></Form.Label>
                <Form.Control 
                  as="select"
                  id="system"
                  value={formData.system}
                  onChange={handleChange}
                  required>
                  <option value="">Selecciona una opción</option>
                  <option>Soft Restaurant</option>
                  <option>Soft Restaurant Movil</option>
                  <option>On The Minute</option>
                  <option>NS Hoteles</option>
                  <option>E-Delivery</option>
                  <option>Autofactura / Analytics </option>
                </Form.Control>
              </Form.Group>              
              <Form.Group className="mb-3" controlId="formKindService">
                <Form.Label>Tipo de Servicio <span class="required"> *</span></Form.Label>
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
              <Form.Group className="mb-3" controlId="formBasicFolio">
                <Form.Label>Folio Factura <span class="required"> *</span></Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="ST 000123"
                  id="folio"
                  value={formData.folio}
                  onChange={handleChange}
                  required/>        
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicHardware">
                <Form.Label>Los equipos de computo <span class="required"> *</span></Form.Label>
                  {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        required
                        inline
                        label="El cliente no adquirió los equipos"                     
                        type={type}
                        id="qEquipment"                     
                        value= {formData.qEquipment}
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        label="Solicitarlos en almacén"                    
                        type={type}
                        id="qEquipment"
                        name="qEquipment"
                        value= {formData.qEquipment}   
                        onChange={handleChange}
                      /> 
                      <Form.Check
                        inline
                        label="Ya fueron entregados al cliente"                 
                        type={type}
                        id="qEquipment"
                        name="qEquipment"
                        value= {formData.qEquipment}     
                        onChange={handleChange}
                      />                       
                    </div>
                  ))}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicHardware">
                <Form.Label>¿El cliente cuenta con su logo en formato editable PNG/JPEG?<span class="required"> *</span></Form.Label>
                {['radio'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      required
                      inline
                      label="Si"                      
                      type={type}
                      id={`inline-${type}-1`}
                      name="qLogo"
                      value= "Si"     
                      onChange={handleChange}                      
                    />
                    <Form.Check
                      inline
                      label="No"                    
                      type={type}
                      id={`inline-${type}-2`}
                      name="qLogo"
                      value= "No"     
                      onChange={handleChange} 
                    />                                   
                  </div>
                ))}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicInformedCustomer">
                <Form.Label>¿Se le informo al cliente los requisitos para realizar el servicio?<span class="required"> *</span></Form.Label>
                {['radio'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      required
                      inline
                      label="Si"                      
                      type={type}
                      id={`inline-${type}-1`}
                      name="qReq"
                      value= "Si"     
                      onChange={handleChange} 
                    />
                    <Form.Check
                      inline
                      label="No"                    
                      type={type}
                      id={`inline-${type}-2`}
                      name="qReq"
                      value= "No"     
                      onChange={handleChange}
                    />                                   
                  </div>
                ))}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCSD">
                <Form.Label>¿El cliente cuenta con sus archivos de facturacion CSD? <span class="required"> *</span></Form.Label>
                {['radio'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      required
                      inline
                      label="Si"                      
                      type={type}
                      id={`inline-${type}-1`}
                      name="qCSD"
                      value= "Si"     
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="No"                     
                      type={type}
                      id={`inline-${type}-2`}
                      name="qCSD"
                      value= "No"     
                      onChange={handleChange}
                    />                                   
                  </div>
                ))}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNodes">
                <Form.Label>¿El cliente cuenta con nodos de red funcionales? <span class="required"> *</span> </Form.Label>
                {['radio'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      required
                      inline
                      label="Si"                  
                      type={type}
                      id={`inline-${type}-1`}
                      name="qNode"
                      value= "Si"     
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="No"                     
                      type={type}
                      id={`inline-${type}-2`}
                      name="qNode"
                      value= "No"     
                      onChange={handleChange}
                    />                                   
                  </div>
                ))}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNodes">
                <Form.Label>Se notificarón por correo los requisitos para realizar el servicio <span class="required"> *</span></Form.Label>
                {['radio'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      required
                      inline
                      label="Si"                     
                      type={type}
                      id={`inline-${type}-1`}
                      name="qNotification"
                      value= "Si"     
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="No"                    
                      type={type}
                      id={`inline-${type}-2`}
                      name="qNotification"
                      value= "No"     
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
                      id={`inline-${type}-1`}
                      name="cServer.processor"
                      value= "Procesador Intel/amd i/ryzen 3+"     
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="Memoria Ram 4GB +"                     
                      type={type}
                      id={`inline-${type}-2`}
                      name="cServer.ram" 
                      value= "Memoria Ram 4GB +"    
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="HDD 64GB+"                      
                      type={type}
                      id={`inline-${type}-3`}
                      name="cServer.memory" 
                      value= "HDD 64GB+"    
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="Windows 8+ Home/PRO"                     
                      type={type}
                      id={`inline-${type}-4`}
                      name="cServer.so" 
                      value= "Windows 8+ Home/PRO"     
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="Internet Explorer 9+"                      
                      type={type}
                      id={`inline-${type}-5`}                      
                      name="cServer.internet" 
                      value= "Internet Explorer 9+" 
                      onChange={handleChange}
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
                      id={`inline-${type}-1`}
                      name="cStation.processor"
                      value= "Procesador Intel/amd i/ryzen 3+"     
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="Memoria Ram 4GB +"                
                      type={type}
                      id={`inline-${type}-2`}
                      name="cStation.ram" 
                      value= "Memoria Ram 4GB +"    
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="HDD 64GB+"             
                      type={type}
                      id={`inline-${type}-3`}
                      name="cStation.memory" 
                      value= "HDD 64GB+"    
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="Windows 8+ Home/PRO"                     
                      type={type}
                      id={`inline-${type}-4`}
                      name="cStation.so" 
                      value= "Windows 8+ Home/PRO"     
                      onChange={handleChange}
                    />                                                            
                  </div>
                ))}
              </Form.Group>              
              <Button variant="danger" type="submit">
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
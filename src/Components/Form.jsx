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



/* Datos */
import sales from '../Data/sales'

/* Generador de PDF */
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


function FormService() {

  const hola ="holaaa";

  const createPDF = (dataset) => {
    console.log("hola hola")
    const documentDefinition = { 
      content: [
        {
          text: 'Solicitud de Servicio N°10\n',
          style: 'header',
          alignment: 'center'
        },
        {
          style: 'tableExample',
          table: {
            widths: [100, '*', 200, '*'],
            body: [              
              [{text: '1. Datos Generales', style: 'tableHeader', colSpan: 4, bold: true, fillColor:'#F5F5F5', alignment: 'center'}, {}, {}, {}],
              [{text: 'Nombre Comercial: '+dataset.name, colSpan: 4}, {}, {}, {}],              
              [{text: 'Contacto: '+dataset.contact, colSpan: 4,}, {}, {}, {}],
              [{text: 'Dirección: '+dataset.address,},  {text: 'Teléfono: '+dataset.phone,}],
              [{text: 'Teléfono: '+dataset.phone, colSpan: 4,}, {}, {}, {}],
              [{text: 'Correo: '+dataset.email, colSpan: 4,}, {}, {}, {}],
            ]
          }
        },        
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
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

const [checkComp, setcheckComp] = useState({
  cServer: {processor: '', ram:'', memory: '', os: '', internet:''},
  cStation: {processor: '', ram:'', memory: '', os: ''},
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
  const { id, name, value } = event.target;
  setcheckComp((prevState) => ({
    ...prevState,
    [id]: {
      ...prevState[id],
      [name]: value,
    },
  }));
};

  /* Button */
  

  const handleClick = () => {
    window.open('https://nationalsoft.openser.com/indexPublic.html#PortalPublic', '_blank');
    createPDF(formData);
    sales();   
  };


console.log(checkComp)
console.log(formData)
console.log("hola")
    return (      
      <div className=" App FormService">          
       <NavbarNs></NavbarNs>        
        <Container className='home'  style = {{ width: 'auto'}}>
          <Row style={{display: "flex"}}>
            <Form style={{textAlign: 'left'}}>
              <Form.Group className="mb-3" id="formBasicName" required>
                <Form.Label>Nombre Comercial<span class="required"> *</span></Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Nombre del Negocio"
                  value={formData.name}
                  onChange={handleChange}
                  id = "name" 
                  required />        
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Contacto <span class="required"> *</span></Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Nombre"
                  id = "contact"                  
                  value={formData.contact}
                  onChange={handleChange} 
                  required/>        
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Servicio <span class="required"> *</span></Form.Label>
                <Form.Control as="select" name="service" required onChange={handleChange} id="service">
                  <option value="">Selecciona una opción</option>
                  <option value={formData.service}>En Línea</option>
                  <option value={formData.service}>En Sitio</option>
                </Form.Control>
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
                <Form.Label>Teléfono <span class="required"> *</span></Form.Label>
                <Form.Control 
                  type="tel" 
                  placeholder="Teléfono"
                  id="phone"
                  value={formData.phone}
                  onChange ={handleChange}
                  required/>        
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Correo Electrónico <span class="required"> *</span></Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Ingresar Email"
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required/>                
              </Form.Group>              
              <Form.Group className="mb-3" >
                <Form.Label>Elabora <span class="required"> *</span></Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Nombre de Ejecutivo de Ventas"
                  id="work"
                  value={formData.work}
                  onChange={handleChange}
                  required />        
              </Form.Group>
              <Form.Group className="mb-3" >
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
              <Form.Group className="mb-3" >
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
              <Form.Group className="mb-3">
                <Form.Label>Folio Factura <span class="required"> *</span></Form.Label>
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
                      value="El cliente no adquirió los equipos" 
                      checked={formData.qEquipment === "El cliente no adquirió los equipos"}
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="Solicitarlos en almacén" 
                      name="qEquipment"
                      type={type}
                      id="qEquipment"
                      value="Solicitarlos en almacén" 
                      checked={formData.qEquipment  === "Solicitarlos en almacén"}
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline                    
                      label="Ya fueron entregados al cliente" 
                      name="qEquipment"
                      type={type}
                      id="qEquipment"
                      value="Ya fueron entregados al cliente" 
                      checked={formData.qEquipment === "Ya fueron entregados al cliente"}
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
                      id="qLogo"
                      name="qLogo"
                      value= "Si" 
                      checked={formData.qLogo === "Si"}        
                      onChange={handleChange}                      
                    />
                    <Form.Check
                      inline
                      label="No"                    
                      type={type}
                      id="qLogo"
                      name="qLogo"
                      value= "No" 
                      checked={formData.qLogo === "No"}    
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
                      id="qReq"
                      name="qReq"
                      value= "Si" 
                      checked={formData.qReq === "Si"}    
                      onChange={handleChange} 
                    />
                    <Form.Check
                      inline
                      label="No"                    
                      type={type}
                      id="qReq"
                      name="qReq"
                      value= "No" 
                      checked={formData.qReq === "No"}    
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
                      id="qCSD"
                      name="qCSD"
                      value= "Si"     
                      checked={formData.qCSD === "Si"}    
                      onChange={handleChange} 
                    />
                    <Form.Check
                      inline
                      label="No"                     
                      type={type}
                      id="qCSD"
                      name="qCSD"
                      value= "No"     
                      checked={formData.qCSD === "No"}    
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
                      id="qNode"
                      name="qNode"
                      value= "Si"
                      checked={formData.qNode === "Si"}         
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="No"                     
                      type={type}
                      id="qNode"
                      name="qNode"
                      value= "No"
                      checked={formData.qNode === "No"}     
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
                      id="qNotification"
                      name="qNotification"
                      value= "Si"
                      checked={formData.qNotification === "Si"}         
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="No"                    
                      type={type}
                      id="qNotification"
                      name="qNotification"
                      value= "No"
                      checked={formData.qNotification === "No"}     
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
                      checked={checkComp.cServer.processor === "Procesador Intel/amd i/ryzen 3+" }    
                      onChange={handleChangeCompu}
                    />
                    <Form.Check
                      inline
                      label="Memoria Ram 4GB +"                     
                      type={type}
                      id="cServer"
                      name="ram"
                      value= "Memoria Ram 4GB +" 
                      checked={checkComp.cServer.ram === "Memoria Ram 4GB +"  }     
                      onChange={handleChangeCompu}
                    />
                    <Form.Check
                      inline
                      label="HDD 64GB+"                      
                      type={type}
                      id="cServer"
                      name="memory"
                      value= "HDD 64GB+" 
                      checked={checkComp.cServer.memory === "HDD 64GB+"  }     
                      onChange={handleChangeCompu}
                    />
                    <Form.Check
                      inline
                      label="Windows 8+ Home/PRO"                     
                      type={type}
                      id="cServer"
                      name="so"
                      value= "Windows 8+ Home/PRO" 
                      checked={checkComp.cServer.so ==="Windows 8+ Home/PRO"}     
                      onChange={handleChangeCompu}
                    />
                    <Form.Check
                      inline
                      label="Internet Explorer 9+"                      
                      type={type}
                      id="cServer"
                      name="internet"
                      value= "Internet Explorer 9+" 
                      checked={checkComp.cServer.internet ==="Internet Explorer 9+"} 
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
                      checked={checkComp.cStation.processor === "Procesador Intel/amd i/ryzen 3+" }    
                      onChange={handleChangeCompu}
                    />
                    <Form.Check
                      inline
                      label="Memoria Ram 4GB +"                     
                      type={type}
                      id="cStation"
                      name="ram"
                      value= "Memoria Ram 4GB +" 
                      checked={checkComp.cStation.ram === "Memoria Ram 4GB +"  }     
                      onChange={handleChangeCompu}
                    />
                    <Form.Check
                      inline
                      label="HDD 64GB+"                      
                      type={type}
                      id="cStation"
                      name="memory"
                      value= "HDD 64GB+" 
                      checked={checkComp.cStation.memory === "HDD 64GB+"  }     
                      onChange={handleChangeCompu}
                    />
                    <Form.Check
                      inline
                      label="Windows 8+ Home/PRO"                     
                      type={type}
                      id="cStation"
                      name="so"
                      value= "Windows 8+ Home/PRO" 
                      checked={checkComp.cStation.so ==="Windows 8+ Home/PRO"}     
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
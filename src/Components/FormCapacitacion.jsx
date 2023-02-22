import jsPDF from 'jspdf';

import React, { useState, useEffect } from 'react';

/* CSS */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

/*Components*/
import NavbarNs from './Nav';
import Footer from './Footer';
import Axios from 'axios'

/* Bootstrap */
import { Container, Row, Button, Form} from 'react-bootstrap';

/* Datos */
import {getSoftware} from '../Data/software';
import {getMaxCustomer} from '../Data/maxcustomer';

/* Generador de PDF */
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;






function FormCapacitacion() { 
  
  /* Obtener listado de softwares*/
  const [softList,setSoftList] = useState([]);  
  const [maxCust, setMaxCust] = useState(0);

  
  useEffect(() => {
    getSoftware().then(data => setSoftList(data));    
    getMaxCustomer().then(data => setMaxCust(data));    
  }, []);

  const createPDF = () =>{
    
    var doc = new jsPDF();

    // Agrega texto al documento
    doc.setFontSize(10);
    
  
    // Agrega una imagen al documento
    doc.addImage("img/logo.jpg", "jpg", 100, 10, 90, 30);

    // Texto Inicial
    doc.text("Aracelly Ramirez",20, 50);
    doc.text("Ejecutivo Comercial",20, 55);
    doc.text("Ha solicitado un servicio para el sistema: SOFT RESTAURANT®",20, 60);
  
    // Descarga el documento PDF
    doc.save("ejemplo.pdf");
  }

  /*

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
              [{text: '1. Datos Generales', style: 'tableHeader', colSpan: 4, bold: true, fillColor:'#9b9b9b', alignment: 'center'}, {}, {}, {}],
              [{text: 'Nombre Comercial: '+dataset.name, colSpan: 4}, {}, {}, {}],              
              [{text: 'Contacto: '+dataset.contact, colSpan: 4,}, {}, {}, {}],             
              [{text: 'Teléfono: '+dataset.phone, colSpan: 4,}, {}, {}, {}],
              [{text: 'Correo: '+dataset.email, colSpan: 4,}, {}, {}, {}],
              [{text: 'Dirección: '+dataset.address, colSpan: 4,}, {}, {}, {}],
              [{text: 'Correo: '+dataset.email, colSpan: 4,}, {}, {}, {}],
            ]
          }
        }, 
        {
          style: 'tableExample',
          table: {
            widths: [100, '*', 200, '*'],
            body: [              
              [{text: '2. Datos del Servicio', style: 'tableHeader', colSpan: 4, bold: true, fillColor:'#9b9b9b', alignment: 'center'}, {}, {}, {}],
              [{text: 'Elabora: '+dataset.work, colSpan: 4}, {}, {}, {}],   
              [{text: 'Tipo de Servicio: '+dataset.service, colSpan: 4}, {}, {}, {}],              
              [{text: 'Sistema: '+dataset.system, colSpan: 4,}, {}, {}, {}],             
              [{text: 'Tipo de Servicio: '+dataset.kind, colSpan: 4,}, {}, {}, {}],
              [{text: 'Factura: '+dataset.folio, colSpan: 4,}, {}, {}, {}],              
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
  qNode: '',
  qNotification: '',  
})

const handleChange = (event) => {
  setFormData({
    ...formData,
    [event.target.id]: event.target.value,
  });
}
  /* Button */
  const handleClick = () => {
    window.open('https://nationalsoft.openser.com/indexPublic.html#PortalPublic', '_blank');
    createPDF();     
    handleSubmitCustomer();  
    handleSubmit(); 
  };

  /* Enviar datos a la base de datos */
  const handleSubmit = () => {    
    Axios.post('http://localhost:3002/api/servicecap', 
    {      
      service: formData.service,
      idsoft: formData.system,
      idcustomer: maxCust[0] + 1,         
      work: formData.work,
      system: formData.system,
      kind: "Capacitación",
      folio: formData.folio,
         
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

  return (      
    <div className=" App FormService">          
    <NavbarNs></NavbarNs>        
      <Container className='home'  style = {{ width: 'auto'}}>
        <Row style={{display: "flex"}}>
          <Form style={{textAlign: 'left'}}>
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
              <Form.Label>Contacto <span class="required"> *</span></Form.Label>
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
              <Form.Label>Servicio <span class="required"> *</span></Form.Label>
              <Form.Control as="select" name="service" required onChange={handleChange} id="service" value={formData.service}>
                <option value="">Selecciona una opción</option>
                <option>En Línea</option>
                <option>En Sitio</option>
              </Form.Control>
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
                {softList.map(item =>{
                    return (<option value={item.idsoft}>{item.name}</option>)
                })}                   
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
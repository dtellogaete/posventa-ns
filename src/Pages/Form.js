import React, { useState } from 'react';
import { useFormik } from 'formik';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Form.css';
import { Container, Row, Col} from 'react-bootstrap';
import NavbarNs from '../Components/Nav';
import ServiceCard from '../Components/Services';
import Footer from '../Components/Footer';
import Forms from '../Components/Form';

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
    if (event.target.value == "En Sitio") {
        setDisabled(true);
    } else {
        setDisabled(false);
    }
};

const handleChange = event => {
  console.log(event.target.value);
  formik.setFieldValue(event.target.name, event.target.value);
};

    return (
      <div className="FormService">
        <NavbarNs></NavbarNs>        
        <Container className='home'  style = {{display:"flex"}}>
          <Row style={{display: "flex",  }}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName" required>
                <Form.Label>Nombre Comercial<span class="required"> *</span></Form.Label>
                <Form.Control type="text" placeholder="Nombre del Negocio" required />        
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicContact">
                <Form.Label>Contacto <span class="required"> *</span></Form.Label>
                <Form.Control type="text" placeholder="Nombre del Negocio" required/>        
              </Form.Group>
              <Form.Group className="mb-3" controlId="formImplementation">
                <Form.Label>Servicio <span class="required"> *</span></Form.Label>
                <Form.Control as="select" name="select" required onChange={handleSelectChange}>
                  <option value="">Selecciona una opción</option>
                  <option value="En línea">En Línea</option>
                  <option value="En sitio">En Sitio</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicAddress"  type="text"
                name="field"
                disabled={disabled}
                onChange={handleChange}
                value={formik.values.field}>
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" placeholder="Dirección" required disabled={disabled}/>        
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Teléfono <span class="required"> *</span></Form.Label>
                <Form.Control type="tel" placeholder="Teléfono" required/>        
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo Electrónico <span class="required"> *</span></Form.Label>
                <Form.Control type="email" placeholder="Ingresar Email" required/>                
              </Form.Group>              
              <Form.Group className="mb-3" controlId="formBasicEjecutivo">
                <Form.Label>Elabora <span class="required"> *</span></Form.Label>
                <Form.Control type="text" placeholder="Nombre de Ejecutivo de Ventas" />        
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSoft">
                <Form.Label>Sistema <span class="required"> *</span></Form.Label>
                <Form.Control as="select">
                  <option value="selecciona">Selecciona una opción</option>
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
                <Form.Control as="select" required>
                  <option value="selecciona">Selecciona una opción</option>
                  <option>Instalación</option>
                  <option>Migración</option>
                  <option>Cambio de Servidor</option>               
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicFolio">
                <Form.Label>Folio Factura <span class="required"> *</span></Form.Label>
                <Form.Control type="text" placeholder="ST 000123"  required/>        
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicHardware">
                <Form.Label>Los equipos de computo <span class="required"> *</span></Form.Label>
                {['radio'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      required
                      inline
                      label="El cliente no adquirió los equipos"
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="Solicitarlos en almacén"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                    /> 
                    <Form.Check
                      inline
                      label="Ya fueron entregados al cliente"
                      name="group1"
                      type={type}
                      id={`inline-${type}-3`}
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
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
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
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
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
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
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
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
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
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
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
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="Memoria Ram 4GB +"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                    />
                    <Form.Check
                      inline
                      label="HDD 64GB+"
                      name="group1"
                      type={type}
                      id={`inline-${type}-3`}
                    />
                    <Form.Check
                      inline
                      label="Windows 8+ Home/PRO"
                      name="group1"
                      type={type}
                      id={`inline-${type}-4`}
                    />
                    <Form.Check
                      inline
                      label="Internet Explorer 9+"
                      name="group1"
                      type={type}
                      id={`inline-${type}-5`}
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
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="Memoria Ram 4GB +"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                    />
                    <Form.Check
                      inline
                      label="HDD 64GB+"
                      name="group1"
                      type={type}
                      id={`inline-${type}-3`}
                    />
                    <Form.Check
                      inline
                      label="Windows 8+ Home/PRO"
                      name="group1"
                      type={type}
                      id={`inline-${type}-4`}
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
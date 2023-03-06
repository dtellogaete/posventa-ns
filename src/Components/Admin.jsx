import React, { useState, useEffect } from 'react';

/* CSS */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

/*Components*/
import NavbarNs from './Nav';
import Footer from './Footer';


/* Bootstrap */
import { Container, Button, Form, Table, Row, Col} from 'react-bootstrap';


/* Datos */
import {getServices} from '../Data/table';
import {getCapacitacionId} from '../Data/capacitacionid';
import {getServiceId} from '../Data/serviceid';
import {getServiceValsId} from '../Data/servicevalsid';

/*PDF*/
import {createPDFCapa} from '../Pdf/capacitacion';
import createPDFServ from '../Pdf/service';


function Admin() { 
  
  /* Obtener listado de servicios*/
  const [items, setItems] = useState([]);
  
  useEffect(() => {
      
    getServices().then(data => setItems(data));
        
  }, []);

const [dataitem, setData] = useState([]);
const [computer, setComputer] = useState([]);

  /* Button */
const handleClick = async (idservice, service) => {
  console.log(service)
  console.log(idservice)
  
  if (service === 'Capacitación'){
    console.log("djashdskjdjsk")
    const data = await getCapacitacionId(Number(idservice));
    console.log("djashdskjdjsk")
    setData(data[0])  
    console.log(typeof(dataitem))
    createPDFCapa(dataitem);     
  }else{
    console.log("servicio")
    const data = await getServiceId(Number(idservice));
    const data_computer = await getServiceValsId(Number(idservice));
    setData(data[0])
    setComputer(data_computer[0])
    console.log(computer)
    createPDFServ(dataitem,computer);
  }    
};

const formatDate = (dateISO) => {   
  var date = new Date(dateISO);
  
  var day = date.getUTCDate();
  var month = date.getUTCMonth() + 1;
  var year = date.getUTCFullYear();

  var newDate = day + '-' + month + '-' + year;

  return newDate;
}

/* Funcion que ordena la tabla alfabeticamente*/
const [sortOrder, setSortOrder] = useState("asc");

const handleSort = (key) => {
  const sortedItems = [...items].sort((a, b) => {
    if (sortOrder === "asc") {
      if (a[key] > b[key]) return 1;
      if (a[key] < b[key]) return -1;
    } else {
      if (a[key] < b[key]) return 1;
      if (a[key] > b[key]) return -1;
    }
    return 0;
  });
  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  setItems(sortedItems);
};

/*Listado único */
const customerfilter = Array.from(new Set(items.map(item => item.cliente)))
 .filter(activity => activity);

const softfilter = Array.from(new Set(items.map(item => item.name)))
 .filter(activity => activity);

const servicefilter = Array.from(new Set(items.map(item => item.service)))
 .filter(activity => activity);

const kindfilter = Array.from(new Set(items.map(item => item.kind)))
.filter(activity => activity);

/* Filtro */ 
const [filterItems, setFilterItems] = useState(items);


const handleFilter = (event) => {
  const selectedCustomer = document.getElementById("customer").value;
  const selectedSoftware = document.getElementById("software").value;
  let filteredItems = items;
  
  if (selectedCustomer !== "all"){
    filteredItems = filteredItems.filter(item => item.cliente === selectedCustomer);
  }
  

  
  setFilterItems(filteredItems);
};

  return (      
    <div className=" App FormService">          
    <NavbarNs></NavbarNs>        
      <Container className='home'  style = {{ width: 'auto'}}>
      <h1 className="mb-3" style={{paddingTop: '15px'}}>Listado de Servicios Solicitados</h1>
      
      <Row>
        <Col>
        <h3>Filtros</h3>
          <Form  className="mb-3" style={{paddingTop: '15px'}}>
            <Form.Group className="mb-3" style={{diplay: 'flex'}} >
            <Form.Label>Cliente</Form.Label>                        
              <Form.Control as="select" name="customer" id="customer" defaultValue="all"  onChange={handleFilter}>               
                <option value="all">Todos</option>
                {customerfilter.map(item =>{
                      return (<option value={item}>{item}</option>)
                })}                                         
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" style={{diplay: 'flex'}} >
            <Form.Label>Software</Form.Label>                        
              <Form.Control as="select" name="software" id="software" defaultValue="all" onChange={handleFilter} >               
                <option value="all">Todos</option>
                {softfilter.map(item =>{
                      return (<option value={item}>{item}</option>)
                })}                                         
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" style={{diplay: 'flex'}} >
            <Form.Label>Tipo</Form.Label>                        
              <Form.Control as="select" name="supplier" id="supplier" defaultValue="all"  >               
                <option value="all">Todos</option>
                {servicefilter.map(item =>{
                      return (<option value={item}>{item}</option>)
                })}                                         
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" style={{diplay: 'flex'}} >
            <Form.Label>Servicio</Form.Label>                        
              <Form.Control as="select" name="supplier" id="supplier" defaultValue="all"  >               
                <option value="all">Todos</option>
                {kindfilter.map(item =>{
                      return (<option value={item}>{item}</option>)
                })}                                         
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" id="formBasicName">
              <Form.Label>Folio</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="ST10000"               
                id = "name" 
                required />        
            </Form.Group>
          </Form>
            
        </Col>
        <Col>
        <Table striped className="text-center p-6 sTable" style={{width: '100%', height: 'auto'}}>
            <thead>
              <tr>
                <th onClick={() => handleSort("idservices")} >ID</th>
                <th onClick={() => handleSort("cliente")}>Cliente</th>
                <th onClick={() => handleSort("contact")}>Contacto</th>
                <th onClick={() => handleSort("name")}>Software</th>
                <th onClick={() => handleSort("service")}>Tipo</th>
                <th onClick={() => handleSort("kind")}>Servicio</th>
                <th onClick={() => handleSort("folio")}>Folio</th>
                <th onClick={() => handleSort("date")}>Fecha</th>
                <th onClick={() => handleSort("work")}>Elaboró</th>
                <th >PDF</th>
              </tr>
            </thead>
            <tbody>              
              {filterItems.map(item => (
                <tr key={item.idservices}>
                  <td>{item.idservices}</td>
                  <td>{item.cliente}</td>
                  <td>{item.contact}</td>
                  <td>{item.name}</td>
                  <td>{item.service}</td>
                  <td>{item.kind}</td>
                  <td>{item.folio}</td>
                  <td>{formatDate(item.date)}</td>
                  <td>{item.work}</td>
                  <td><Button variant="primary" onClick={() =>handleClick(item.idservices, item.kind)}>PDF</Button></td>
                </tr>
              ))}            
            </tbody>
          </Table>
        </Col>      
      </Row>     
      </Container>
      <Footer style={{minHeight: '100vh'}}></Footer>         
    </div>
    
  );
}
  
export default Admin;
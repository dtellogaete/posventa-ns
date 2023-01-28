import {Navbar, Container} from 'react-bootstrap'
import ThemeProvider from 'react-bootstrap/ThemeProvider'

const NavbarNs = () => {
    return (
      <>       
        <Navbar bg="dark" variant="dark">
          <Container  style = {{display:"flex"}}>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="img/ns.png"              
                height="40px"
                className="d-inline-block align-top"
              />            
            </Navbar.Brand>            
            <h1>National Soft</h1>
          </Container>
        </Navbar>
      </>
    );
}

export default NavbarNs;
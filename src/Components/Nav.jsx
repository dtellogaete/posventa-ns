import {Navbar, Container} from 'react-bootstrap'

const NavbarNs = () => {
    return (
      <>       
        <Navbar bg="dark" variant="dark">
          <Container  style = {{display:"flex"}}>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="img/logo.png"
                width="30"
                height="30"
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
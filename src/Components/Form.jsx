import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Forms = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nombre Comercial</Form.Label>
        <Form.Control type="text" placeholder="Nombre del Negocio" />        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicContact">
        <Form.Label>Contacto</Form.Label>
        <Form.Control type="text" placeholder="Nombre del Negocio" />        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>Dirección</Form.Label>
        <Form.Control type="text" placeholder="Dirección" />        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Forms;
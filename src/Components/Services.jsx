import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ServiceCard = (props) => {

    const {title} = props;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Sigue los pasos para solicitar el servicio de manera efectiva
        </Card.Text>
        <Button variant="danger">Solicitar</Button>
      </Card.Body>
    </Card>
  );
}

export default ServiceCard;
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ServiceCard = (props) => {

  const {title, img, url} = props;

  return (
    <Card style={{ width: 'auto' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Sigue los pasos para solicitar el servicio de manera efectiva
        </Card.Text>
        <Button variant="danger" href={url} role="button">Solicitar</Button>
      </Card.Body>
    </Card>
  );
}

export default ServiceCard;
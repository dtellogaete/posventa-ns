import React from 'react';
import { Container, Row, Col, Navbar} from 'react-bootstrap';

const Footer = () => {
    return (
        <Navbar className="bg-dark py-3">
            <Container>
                <Row>
                    <Col className="text-center">
                        <p style={{color:"white", textAlign: 'center'}}>Copyright © 2023 | Hecho con ♡ PosVenta</p>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
}


export default Footer;
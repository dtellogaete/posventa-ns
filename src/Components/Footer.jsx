import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark py-3">
            <Container>
                <Row>
                    <Col className="text-center">
                        <p style={{color:"white"}}>Copyright © 2023 | Hecho con ♡ PosVenta</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}


export default Footer;
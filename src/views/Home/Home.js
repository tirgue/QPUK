import React from 'react';
import './Home.scss'
import qpukLogo from '../../assets/qpukLogo.png'
import { Col, Row, Button } from 'react-bootstrap';

const Home = () => {
    return (
        <div id="home">
            <img id="logo" alt="Logo de Question pour un Kupong" src={qpukLogo} />
            <Row>
                <Col>
                    <Button>Jouer</Button>
                </Col>
                <Col>
                    <Button>Animer</Button>
                </Col>
            </Row>
        </div>
    );
}

export default Home;

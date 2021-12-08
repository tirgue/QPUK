import React from 'react';
import './Home.scss'
import qpukLogo from '../../assets/images/qpukLogo.png'
import { Col, Row, Button } from 'react-bootstrap';

const Home = () => {
    return (
        <div id="home">
            <img id="logo" alt="Logo de Question pour un Kupong" src={qpukLogo} />
            <Row>
                <Col>
                    <Button className="homeButton">Jouer</Button>
                </Col>
                <Col>
                    <Button className="homeButton">Animer</Button>
                </Col>
            </Row>
        </div>
    );
}

export default Home;

import React from 'react';
import './Home.scss'
import qpukLogo from '../../assets/images/qpukLogo.png'
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ButtonPrimary } from '../../components/components.index';

const Home = () => {
    return (
        <div id="home">
            <img id="logo" alt="Logo de Question pour un Kupong" src={qpukLogo} />
            <Row>
                <Col>
                    <ButtonPrimary as={Link} to="/play">Jouer</ButtonPrimary>
                </Col>
                <Col>
                    <ButtonPrimary as={Link} to="/animate">Animer</ButtonPrimary>
                </Col>
            </Row>
        </div>
    );
}

export default Home;

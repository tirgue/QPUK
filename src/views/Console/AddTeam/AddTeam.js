import React from 'react';
import "./AddTeam.scss"
import { Form } from 'react-bootstrap'
import { ButtonPrimary } from '../../../components/components.index'

function AddTeam(props) {
    return (
        <div id="addTeam">
            <div className="teamList">
                <div className="teamName">Equipe avec un long nom</div>
                <div className="teamName">Equipe avec un long nom</div>
                <div className="teamName">Equipe avec un long nom</div>
                <div className="teamName">Equipe avec un long nom</div>
            </div>
            <Form.Control className="addInput"></Form.Control>
            <ButtonPrimary>Ajouter</ButtonPrimary>
        </div>
    );
}

export default AddTeam;
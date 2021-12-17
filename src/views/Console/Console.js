import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonPrimary } from '../../components/components.index';
import AddTeam from './AddTeam/AddTeam';
import './Console.scss';

const Console = ({ children }) => {
    return (
        <div id="console">
            <div className="consoleMenu">
                <ButtonPrimary as={Link} to="/animate/console/add">Ajouter une équipe</ButtonPrimary>
                <ButtonPrimary as={Link} to="/animate/console/nine-points">9 points gagnants</ButtonPrimary>
                <ButtonPrimary as={Link} to="/animate/console/four-in-a-row">4 à la suite</ButtonPrimary>
                <ButtonPrimary as={Link} to="/animate/console/face-to-face">Face à face</ButtonPrimary>
            </div>
            <div className="consoleContext">
                {children}
            </div>
        </div>
    );
};

export default Console;

export {
    AddTeam
}
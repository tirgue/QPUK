import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ButtonPrimary } from '../../components/components.index';
import './Console.scss';

import AddTeam from './AddTeam/AddTeam';
import FaceToFaceConsole from './FaceToFaceConsole/FaceToFaceConsole';
import FourInARowConsole from './FourInARowConsole/FourInARowConsole';
import NinePointsConsole from './NinePointsConsole/NinePointsConsole';

const Console = ({ children }) => {
    const [consoleVisibility, setConsoleVisibility] = useState("consoleMenu-show")

    const handleMenuClick = () => {
        if (consoleVisibility === "consoleMenu-show")
            return setConsoleVisibility("consoleMenu-hide")
        return setConsoleVisibility("consoleMenu-show")
    }

    return (
        <div id="console">
            <div className={`consoleMenu ${consoleVisibility}`}>
                <ButtonPrimary as={Link} to="/animate/console/add">Ajouter une équipe</ButtonPrimary>
                <ButtonPrimary as={Link} to="/animate/console/nine-points">9 points gagnants</ButtonPrimary>
                <ButtonPrimary as={Link} to="/animate/console/four-in-a-row">4 à la suite</ButtonPrimary>
                <ButtonPrimary as={Link} to="/animate/console/face-to-face">Face à face</ButtonPrimary>
            </div>
            <div className="consoleContext">
                {children}
            </div>
            <ButtonPrimary className="menuConsole" onClick={handleMenuClick}>Menu</ButtonPrimary>
        </div>
    );
};

export default Console;

export {
    AddTeam,
    FaceToFaceConsole,
    FourInARowConsole,
    NinePointsConsole,
}
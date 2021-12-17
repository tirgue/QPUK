import React from 'react';
import './AnimateMenu.scss'
import { ButtonPrimary } from '../../components/components.index'
import { Link } from 'react-router-dom';

const AnimateMenu = () => {
    return (
        <div id="animateMenu">
            <ButtonPrimary className="m-3" as={Link} to="/animate/console">Console</ButtonPrimary>
            <ButtonPrimary className="m-3" as={Link} to="/animate/screen">Écran</ButtonPrimary>
        </div>
    );
}

export default AnimateMenu;

import React from 'react';
import { useHistory } from 'react-router';
import { ButtonPrimary } from '../components.index';
import './GoBackButton.scss'

const GoBackButton = () => {
    const history = useHistory()
    const handleGoBack = () => {
        history.goBack()
    }
    return (
        <ButtonPrimary className="goBack" onClick={handleGoBack}>Retour</ButtonPrimary>
    );
}

export default GoBackButton;

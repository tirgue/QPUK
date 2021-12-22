import React from 'react';
import { Button } from 'react-bootstrap';
import './ButtonPrimary.scss'

const ButtonPrimary = (props) => {
    return (
        <Button
            className={`buttonPrimary ${props.className}`}
            as={props.as}
            to={props.to}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </Button>
    );
}

export default ButtonPrimary;

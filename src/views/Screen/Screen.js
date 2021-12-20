import React from 'react';
// eslint-disable-next-line
import FaceToFace from './FaceToFace/FaceToFace';
// eslint-disable-next-line
import FourInARow from './FourInARow/FourInARow';
// eslint-disable-next-line
import NinePoints from './NinePoints/NinePoints';
import './Screen.scss'

const Screen = () => {
    return (
        // <NinePoints />
        <FourInARow />
        // <FaceToFace />
    );
}

export default Screen;

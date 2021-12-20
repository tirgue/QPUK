import React from 'react';
import { ButtonPrimary } from '../../../components/components.index';
import './FaceToFaceConsole.scss'

const FaceToFaceConsole = () => {
    return (
        <div id="faceToFaceConsole">
            <div className="teamControllers">
                {
                    [...Array(2)].map(_ =>
                        <div className="teamController">
                            <div className="teamName">L'equipe qui a un long nom</div>
                            <div className="point">9    </div>
                            <ButtonPrimary className="addPoint">+</ButtonPrimary>
                            <ButtonPrimary className="removePoint">-</ButtonPrimary>
                            <ButtonPrimary className="hand">Main</ButtonPrimary>
                        </div>
                    )
                }
            </div>
            <ButtonPrimary className="unlockBuzzer">Débloquer buzzer</ButtonPrimary>
        </div>
    );
};

export default FaceToFaceConsole;
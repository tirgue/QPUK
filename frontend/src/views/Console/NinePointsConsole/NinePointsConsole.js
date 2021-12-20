import React from 'react';
import { ButtonPrimary } from '../../../components/components.index'
import './NinePointsConsole.scss'

const NinePointsConsole = () => {
    return (
        <div id="ninePointsConsole">
            <div className="teamControllers">
                {
                    [...Array(4)].map(_ =>
                        <div className="teamController">
                            <div className="teamName">L'equipe qui a un long nom</div>
                            <div className="point">9    </div>
                            <ButtonPrimary className="addPoint">+</ButtonPrimary>
                            <ButtonPrimary className="removePoint">-</ButtonPrimary>
                        </div>
                    )
                }
            </div>
            <ButtonPrimary className="unlockBuzzer">Débloquer buzzer</ButtonPrimary>
        </div>
    );
};

export default NinePointsConsole;
import React from 'react';
import { ButtonPrimary } from '../../../components/components.index';
import './FourInARowConsole.scss'

const FourInARowConsole = () => {
    return (
        <div id="fourInARowConsole">
            <div className="teamControllers">
                {
                    [...Array(4)].map(_ =>
                        <div className="teamController">
                            <div className="teamName">L'equipe qui a un long nom</div>
                            <div className="point">2</div>
                            <div className="point">0</div>
                            <ButtonPrimary className="addPoint">+</ButtonPrimary>
                            <ButtonPrimary className="removePoint">0</ButtonPrimary>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default FourInARowConsole;
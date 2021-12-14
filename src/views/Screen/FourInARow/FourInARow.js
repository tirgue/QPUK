import React from 'react';
import './FourInARow.scss'

const FourInARow = () => {
    return (
        <div id="fiar">
            <div className="fiar-infos">
                <div className="teamName">Equipe 1</div>
                <div className="subject">Les poissons d'eau douce</div>
                <div className="timer">06</div>
            </div>
            <div className="stack">
                <div className="point point-off">4</div>
                <div className="point point-off">3</div>
                <div className="point point-on">2</div>
                <div className="point point-on point-selected">1</div>
                <div className="point point-on">0</div>
            </div>
        </div>
    );
}

export default FourInARow;

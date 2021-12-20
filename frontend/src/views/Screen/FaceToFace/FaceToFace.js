import React from 'react';
import './FaceToFace.scss'

const FaceToFace = () => {
    return (
        <div id="faceToFace">
            <div className="teamFinal">
                <div className="teamName">L'équipe à gauche</div>
                <div className="counter">7</div>
            </div>
            <div className="midPoint">
                <div className="finalPoint hand-left">4</div>
                <div className="finalPoint hand-right">3</div>
                <div className="finalPoint hand-left">2</div>
                <div className="finalPoint hand-right">1</div>
            </div>
            <div className="teamFinal">
                <div className="teamName">L'équipe à droite</div>
                <div className="counter">10</div>
            </div>
        </div>
    );
};

export default FaceToFace;
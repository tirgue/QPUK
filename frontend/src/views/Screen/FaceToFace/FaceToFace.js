import React from 'react';
import './FaceToFace.scss'

const FaceToFace = ({ state, finalists }) => {
    const leftTeam = state.teams[finalists[0]]
    const rightTeam = state.teams[finalists[1]]

    const buildPointClassName = (point) => {
        let className = "finalPoint "
        if (state.hand[point] === finalists[0]) className += "hand-left"
        else className += "hand-right"
        return className
    }

    return (
        <div id="faceToFace">
            <div className="teamFinal">
                <div className={`teamName ${leftTeam.buzz ? "buzz" : ""}`}>{finalists[0]}</div>
                <div className="counter">{leftTeam.points}</div>
            </div>
            <div className="midPoint">
                {
                    [...Array(4)].map((_, index) => {
                        const i = 4 - index
                        const className = buildPointClassName(i)
                        return <div className={className}>{i}</div>
                    })
                }
            </div>
            <div className="teamFinal">
                <div className={`teamName ${rightTeam.buzz ? "buzz" : ""}`}>{finalists[1]}</div>
                <div className="counter">{rightTeam.points}</div>
            </div>
        </div>
    );
};

export default FaceToFace;
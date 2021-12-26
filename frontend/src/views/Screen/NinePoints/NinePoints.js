import React from 'react';
import './NinePoints.scss'

const NinePoints = ({ state }) => {

    return (
        <div id="ninePoints">
            {
                Object.entries(state.teams).map(([teamName, { points, buzz, lock }]) =>
                    <div key={teamName} className="bar">
                        <p className={`teamName ${buzz ? "buzz" : lock ? "lock" : ""}`}>{teamName}</p>
                        {
                            [...Array(9 - Math.min(points, 9))].map((_, key) =>
                                <div key={key} className="point point-off" />
                            )
                        }
                        {
                            [...Array(Math.max(points, 0))].map((_, key) =>
                                <div key={key} className="point point-on" />
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default NinePoints;

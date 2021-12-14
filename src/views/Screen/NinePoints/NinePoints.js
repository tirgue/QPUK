import React from 'react';
import './NinePoints.scss'

const NinePoints = () => {

    return (
        <div id="ninePoints">
            {
                [5, 2, 3, 6].map(points => {
                    return (
                        <div className="bar">
                            <p className="teamName">Equipe 1 qui a un nom trop long</p>
                            <div className="point point-off" />
                            <div className="point point-off" />
                            <div className="point point-off" />
                            <div className="point point-off" />
                            <div className="point point-off" />
                            <div className="point point-off" />
                            <div className="point point-on" />
                            <div className="point point-on" />
                            <div className="point point-on" />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default NinePoints;

import React, { useEffect, useState } from 'react';
import './FaceToFace.scss'

const FaceToFace = ({ state, finalists }) => {
    const [timer, setTimer] = useState(state.timer)

    const leftTeam = state.teams[finalists[0]] || {}
    const rightTeam = state.teams[finalists[1]] || {}

    useEffect(() => {
        if (!timer.running) return
        const clock = setTimeout(() => {
            const newDate = new Date()
            const diff = (newDate - new Date(timer.lastStop)) / 1000
            setTimer({
                ...timer,
                value: timer.value - diff,
                lastStop: newDate
            })
        }, 10)

        return () => clearTimeout(clock)
    });

    useEffect(() => {
        setTimer(state.timer)
    }, [state]);

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
                        let percent = Math.min((100 * timer.value / 5) - (i - 1) * 100, 100)
                        percent = Math.max(percent, 0)
                        return <div
                            key={i}
                            className={className}
                            style={{
                                background: `linear-gradient(0deg, #f2911c ${percent}%, #012792 ${percent}%)`
                            }}>{i}</div>
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
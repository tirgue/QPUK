import React, { useEffect, useState } from 'react';
import './FourInARow.scss'

const FourInARow = ({ state }) => {
    const [timer, setTimer] = useState(state.timer)

    const team = state.teams[state.currentTeam]

    useEffect(() => {
        if (!timer.running) return
        const clock = setTimeout(() => {
            setTimer({
                ...timer,
                value: Math.max(timer.value - 1, 0)
            })
        }, 1000)

        return () => clearTimeout(clock)
    });

    useEffect(() => {
        setTimer(state.timer)
    }, [state]);

    return (
        <div id="fiar">
            <div className="fiar-infos">
                <div className="teamName">{state.currentTeam || "Aucune équipe sélectionnée"}</div>
                <div className="subject">{state.theme || "Aucun thème sélectionné"}</div>
                <div className="timer">{parseInt(timer.value).toString()}</div>
            </div>
            <div className="stack">
                {
                    [...Array(5)].map((_, index) => {
                        const i = 4 - index
                        let className = "point "
                        if (team) {
                            if (team.bestPoints >= i) className += "point-on "
                            else className += "point-off "
                            if (team.currentPoints === i) className += "point-selected "
                        }
                        return <div key={i} className={className}>{i}</div>

                    })
                }
            </div>
        </div >
    );
}

export default FourInARow;

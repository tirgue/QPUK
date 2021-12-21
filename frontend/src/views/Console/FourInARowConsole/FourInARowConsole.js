import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ButtonPrimary } from '../../../components/components.index';
import './FourInARowConsole.scss'

const FourInARowConsole = () => {

    const [teams, setTeams] = useState({})

    useEffect(() => {
        axios.get('/api/state')
            .then(response => {
                const state = response.data
                const fourInARowState = state.games.fourInARow
                setTeams(fourInARowState.teams)
            })
    }, []);

    const handleAddPoint = (teamName, points) => {
        console.log(teamName, points);
        axios.post('/api/four-in-a-row/addPoint', {
            teamName: teamName,
            points: points
        })
            .then(response => {
                const state = response.data
                const fourInARowState = state.games.fourInARow
                setTeams(fourInARowState.teams)
            })
    }

    const handleResetPoint = (teamName) => {
        axios.post('/api/four-in-a-row/resetPoint', {
            teamName: teamName
        })
            .then(response => {
                const state = response.data
                const fourInARowState = state.games.fourInARow
                setTeams(fourInARowState.teams)
            })
    }

    return (
        <div id="fourInARowConsole">
            <div className="teamControllers">
                {
                    Object.entries(teams).map(([teamName, { currentPoints, bestPoints }]) =>
                        <div className="teamController">
                            <div className="teamName">{teamName}</div>
                            <div className="point">{bestPoints}</div>
                            <div className="point">{currentPoints}</div>
                            <ButtonPrimary className="addPoint" onClick={() => handleAddPoint(teamName, 1)}>+</ButtonPrimary>
                            <ButtonPrimary className="removePoint" onClick={() => handleResetPoint(teamName)}>0</ButtonPrimary>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default FourInARowConsole;
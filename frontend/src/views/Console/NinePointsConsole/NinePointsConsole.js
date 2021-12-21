import React, { useEffect, useState } from 'react';
import { ButtonPrimary } from '../../../components/components.index'
import axios from 'axios'
import './NinePointsConsole.scss'

const NinePointsConsole = () => {

    const [teams, setTeams] = useState({})

    useEffect(() => {
        axios.get('/api/state')
            .then(response => {
                const state = response.data
                const ninePointsState = state.games.ninePoints
                setTeams(ninePointsState.teams)
            })
    }, []);

    const handleAddPoint = (teamName, points) => {
        axios.post('/api/nine-points/addPoint', {
            teamName: teamName,
            points: points
        })
            .then(response => {
                const state = response.data
                const ninePointsState = state.games.ninePoints
                setTeams(ninePointsState.teams)
            })
    }

    const handleRemovePoint = (teamName, points) => {
        axios.post('/api/nine-points/removePoint', {
            teamName: teamName,
            points: points
        })
            .then(response => {
                const state = response.data
                const ninePointsState = state.games.ninePoints
                setTeams(ninePointsState.teams)
            })
    }

    return (
        <div id="ninePointsConsole">
            <div className="teamControllers">
                {
                    Object.entries(teams).map(([teamName, { points }]) =>
                        <div key={teamName} className="teamController">
                            <div className="teamName">{teamName}</div>
                            <div className="point">{points}</div>
                            <ButtonPrimary className="addPoint" onClick={() => handleAddPoint(teamName, 1)}>+</ButtonPrimary>
                            <ButtonPrimary className="removePoint" onClick={() => handleRemovePoint(teamName, 1)}>-</ButtonPrimary>
                        </div>
                    )
                }
            </div>
            <ButtonPrimary className="unlockBuzzer">Débloquer buzzer</ButtonPrimary>
        </div>
    );
};

export default NinePointsConsole;
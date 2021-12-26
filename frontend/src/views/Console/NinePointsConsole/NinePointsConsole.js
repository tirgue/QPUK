import React, { useEffect, useState } from 'react';
import { ButtonPrimary } from '../../../components/components.index'
import axios from 'axios'
import './NinePointsConsole.scss'

const NinePointsConsole = () => {

    const [teams, setTeams] = useState({})

    const parseResponse = (response) => {
        const state = response.data
        const ninePointsState = state.games.ninePoints
        setTeams(ninePointsState.teams)
    }

    useEffect(() => {
        axios.get('/api/state')
            .then(response => {
                parseResponse(response)
            })
    }, []);

    useEffect(() => {
        const events = new EventSource('/api/state/event');

        events.onmessage = (event) => {
            parseResponse({ data: JSON.parse(event.data) })
        };

        events.onerror = (event) => {
            console.error(event)
            events.close()
        }

        return () => events.close()
    }, []);

    const handleAddPoint = (teamName, points) => {
        axios.post('/api/nine-points/addPoint', {
            teamName: teamName,
            points: points
        })
            .then(response => {
                parseResponse(response)
            })
    }

    const handleRemovePoint = (teamName, points) => {
        axios.post('/api/nine-points/removePoint', {
            teamName: teamName,
            points: points
        })
            .then(response => {
                parseResponse(response)
            })
    }

    const handleUnlockBuzzer = () => {
        axios.post('/api/nine-points/buzzer/unlock')
            .then(response => {
                parseResponse(response)
            })
    }

    const handleResetBuzzer = () => {
        axios.post('/api/nine-points/buzzer/reset')
            .then(response => {
                parseResponse(response)
            })
    }

    return (
        <div id="ninePointsConsole">
            <div className="teamControllers">
                {
                    Object.entries(teams).map(([teamName, { points, buzz }]) =>
                        <div key={teamName} className="teamController">
                            <div className={`teamName ${buzz ? "buzz" : ""}`}>{teamName}</div>
                            <div className="point">{points}</div>
                            <ButtonPrimary className="addPoint" onClick={() => handleAddPoint(teamName, 1)}>+</ButtonPrimary>
                            <ButtonPrimary className="removePoint" onClick={() => handleRemovePoint(teamName, 1)}>-</ButtonPrimary>
                        </div>
                    )
                }
            </div>
            <div className="d-flex flex-row">
                <ButtonPrimary className="unlockBuzzer" onClick={handleUnlockBuzzer}>Débloquer buzzer</ButtonPrimary>
                <ButtonPrimary className="unlockBuzzer" onClick={handleResetBuzzer}>Réinitialiser buzzer</ButtonPrimary>
            </div>
        </div>
    );
};

export default NinePointsConsole;
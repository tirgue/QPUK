import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { ButtonPrimary } from '../../../components/components.index';
import worstTeam from '../../../utils/extractBestTeams';
import './FourInARowConsole.scss'

const FourInARowConsole = () => {

    const [teams, setTeams] = useState({})
    const [timer, setTimer] = useState({})
    const inputThemeRef = useRef()

    useEffect(() => {
        axios.get('/api/state')
            .then(response => {
                const state = response.data
                const ninePointsState = state.games.ninePoints
                const fourInARowState = state.games.fourInARow
                const teamToDelete = worstTeam(ninePointsState.teams, "points")
                const bestTeams = { ...fourInARowState.teams }
                delete bestTeams[teamToDelete]
                setTeams(bestTeams)
                setTimer(fourInARowState.timer)
            })
    }, []);

    const handleAddPoint = (teamName, points) => {
        axios.post('/api/four-in-a-row/addPoint', {
            teamName: teamName,
            points: points
        })
            .then(response => {
                const state = response.data
                const ninePointsState = state.games.ninePoints
                const fourInARowState = state.games.fourInARow
                const teamToDelete = worstTeam(ninePointsState.teams, "points")
                const bestTeams = { ...fourInARowState.teams }
                delete bestTeams[teamToDelete]
                setTeams(bestTeams)
            })
    }

    const handleResetPoint = (teamName) => {
        axios.post('/api/four-in-a-row/resetPoint', {
            teamName: teamName
        })
            .then(response => {
                const state = response.data
                const ninePointsState = state.games.ninePoints
                const fourInARowState = state.games.fourInARow
                const teamToDelete = worstTeam(ninePointsState.teams, "points")
                const bestTeams = { ...fourInARowState.teams }
                delete bestTeams[teamToDelete]
                setTeams(bestTeams)
            })
    }

    const handleThemeKeyUp = () => {
        const theme = inputThemeRef.current.value
        axios.post('/api/four-in-a-row/theme', {
            theme: theme
        })
            .then(response => { })
    }

    return (
        <div id="fourInARowConsole">
            <div className="teamControllers">
                {
                    Object.entries(teams).map(([teamName, { currentPoints, bestPoints }]) =>
                        <div key={teamName} className="teamController">
                            <div className="teamName">{teamName}</div>
                            <div className="point">{bestPoints}</div>
                            <div className="point">{currentPoints}</div>
                            <ButtonPrimary className="addPoint" onClick={() => handleAddPoint(teamName, 1)}>+</ButtonPrimary>
                            <ButtonPrimary className="removePoint" onClick={() => handleResetPoint(teamName)}>0</ButtonPrimary>
                        </div>
                    )
                }
                <div className="teamController">
                    <div className="teamName">TIMER</div>
                    <div className="point timerConsole">{timer.value}</div>
                    <ButtonPrimary className="addPoint">Stop</ButtonPrimary>
                    <ButtonPrimary className="removePoint">Resume</ButtonPrimary>
                    <ButtonPrimary className="hand">Reset</ButtonPrimary>
                </div>
            </div>
            <Form.Control ref={inputThemeRef} className="themeInput" onKeyUp={handleThemeKeyUp} placeholder="Theme"></Form.Control>
        </div>
    );
};

export default FourInARowConsole;
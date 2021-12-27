import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { ButtonPrimary } from '../../../components/components.index';
import worstTeam from '../../../utils/worstTeam';
import './FourInARowConsole.scss'

const FourInARowConsole = () => {

    const [teams, setTeams] = useState({})
    const [currentTeam, setCurrentTeam] = useState("")
    const [timer, setTimer] = useState({})
    const inputThemeRef = useRef()

    const parseResponse = (response) => {
        const state = response.data
        const ninePointsState = state.games.ninePoints
        const fourInARowState = state.games.fourInARow
        const teamToDelete = worstTeam(ninePointsState.teams, "points")
        const bestTeams = { ...fourInARowState.teams }
        delete bestTeams[teamToDelete]
        setTeams(bestTeams)
        setTimer(fourInARowState.timer)
        setCurrentTeam(fourInARowState.currentTeam)
    }

    useEffect(() => {
        axios.get('/api/state')
            .then(response => {
                parseResponse(response)
            })
    }, []);

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

    const handleAddPoint = (teamName, points) => {
        axios.post('/api/four-in-a-row/addPoint', {
            teamName: teamName,
            points: points
        })
            .then(response => {
                parseResponse(response)
            })
    }

    const handleResetPoint = (teamName) => {
        axios.post('/api/four-in-a-row/resetPoint', {
            teamName: teamName
        })
            .then(response => {
                parseResponse(response)
            })
    }

    const handleThemeKeyUp = () => {
        const theme = inputThemeRef.current.value
        axios.post('/api/four-in-a-row/theme', {
            theme: theme
        })
            .then(response => { })
    }

    const handleStopTimer = () => {
        axios.post('/api/four-in-a-row/timer/stop')
            .then(response => {
                parseResponse(response)
            })
    }

    const handleResumeTimer = () => {
        axios.post('/api/four-in-a-row/timer/resume')
            .then(async response => {
                parseResponse(response)
            })
    }

    const handleResetTimer = () => {
        axios.post('/api/four-in-a-row/timer/start')
            .then(response => {
                parseResponse(response)
            })
    }

    const handleSetCurrentTeam = (teamName) => {
        axios.post('/api/four-in-a-row/currentTeam', {
            teamName: teamName
        })
            .then(response => {
                parseResponse(response)
            })
    }

    return (
        <div id="fourInARowConsole">
            <div className="teamControllers">
                {
                    Object.entries(teams).map(([teamName, { currentPoints, bestPoints }]) =>
                        <div key={teamName} className="teamController">
                            <div className={`teamName ${teamName === currentTeam ? "buzz" : ""}`} onClick={() => handleSetCurrentTeam(teamName)}>{teamName}</div>
                            <div className="point">{bestPoints}</div>
                            <div className="point">{currentPoints}</div>
                            <ButtonPrimary className="addPoint" onClick={() => handleAddPoint(teamName, 1)}>+</ButtonPrimary>
                            <ButtonPrimary className="removePoint" onClick={() => handleResetPoint(teamName)}>0</ButtonPrimary>
                        </div>
                    )
                }
                <div className="teamController">
                    <div className="teamName">TIMER</div>
                    <div className="point timerConsole">{parseInt(timer.value).toString()}</div>
                    <ButtonPrimary className="addPoint" onClick={handleStopTimer}>Stop</ButtonPrimary>
                    <ButtonPrimary className="removePoint" onClick={handleResumeTimer}>Resume</ButtonPrimary>
                    <ButtonPrimary className="hand" onClick={handleResetTimer}>Reset</ButtonPrimary>
                </div>
            </div>
            <Form.Control ref={inputThemeRef} className="themeInput" onKeyUp={handleThemeKeyUp} placeholder="Theme"></Form.Control>
        </div>
    );
};

export default FourInARowConsole;
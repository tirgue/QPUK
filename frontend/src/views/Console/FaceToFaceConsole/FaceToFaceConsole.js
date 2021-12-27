import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ButtonPrimary } from '../../../components/components.index';
import worstTeam from '../../../utils/worstTeam';
import './FaceToFaceConsole.scss'

const FaceToFaceConsole = () => {

    const [teams, setTeams] = useState({})
    const [timer, setTimer] = useState({})
    const [firstHand, setFirstHand] = useState("")

    const parseResponse = (response) => {
        const state = response.data

        const ninePointsState = state.games.ninePoints
        const fourInARowState = state.games.fourInARow
        const faceToFaceState = state.games.faceToFace

        const teamToDelete1 = worstTeam(ninePointsState.teams, "points")
        const bestTeamsFourInARow = { ...fourInARowState.teams }
        delete bestTeamsFourInARow[teamToDelete1]

        const teamToDelete2 = worstTeam(bestTeamsFourInARow, "bestPoints")
        const bestTeams = { ...faceToFaceState.teams }
        delete bestTeams[teamToDelete1]
        delete bestTeams[teamToDelete2]
        setTeams(bestTeams)
        setTimer(faceToFaceState.timer)
        setFirstHand(faceToFaceState.firstHand)
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
            parseResponse({ data: JSON.parse(event.data) });
        };

        events.onerror = (event) => {
            console.error(event)
            events.close()
        }

        return () => events.close()
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

    const handleAddPoint = (teamName) => {
        const points = parseInt(timer.value / 5 + 1)
        axios.post('/api/face-to-face/addPoint', {
            teamName: teamName,
            points: points
        })
            .then(response => {
                parseResponse(response)
            })
    }

    const handleRemovePoint = (teamName) => {
        axios.post('/api/face-to-face/removePoint', {
            teamName: teamName,
            points: 1
        })
            .then(response => {
                parseResponse(response)
            })
    }

    const handleSetHand = (teamName) => {
        const [otherTeam] = Object.entries(teams).find(([tn]) => {
            return tn !== teamName
        })
        axios.post('/api/face-to-face/hand/set', {
            teamName: teamName,
            otherTeam: otherTeam
        })
            .then(response => {
                parseResponse(response)
            })
    }

    const handleStopTimer = () => {
        axios.post('/api/face-to-face/timer/stop')
            .then(response => {
                parseResponse(response)
            })
    }

    const handleResumeTimer = () => {
        axios.post('/api/face-to-face/timer/resume')
            .then(async response => {
                parseResponse(response)
            })
    }

    const handleResetTimer = () => {
        axios.post('/api/face-to-face/timer/start')
            .then(response => {
                parseResponse(response)
            })
    }

    const handleUnlockBuzzer = () => {
        axios.post('/api/face-to-face/unlockBuzzer')
            .then(response => {
                parseResponse(response)
            })
    }

    const handleBadAnswer = () => {
        const [otherTeam] = Object.entries(teams).find(([teamName, { points, buzz }]) => {
            return !buzz
        })
        axios.post('/api/face-to-face/badAnswer', {
            otherTeam: otherTeam
        })
            .then(response => {
                parseResponse(response)
            })
    }

    const disableResume = () => {
        return !!Object.entries(teams).find(([teamName, { buzz }]) => {
            return buzz
        })
    }

    return (
        <div id="faceToFaceConsole">
            <div className="teamControllers">
                {
                    Object.entries(teams).map(([teamName, { points, buzz }]) =>
                        <div key={teamName} className="teamController">
                            <div className={`teamName ${buzz ? "buzz" : ""}`}>{teamName}</div>
                            <div className="point">{points}</div>
                            <ButtonPrimary className="addPoint" onClick={() => handleAddPoint(teamName)}>+</ButtonPrimary>
                            <ButtonPrimary className="removePoint" onClick={() => handleRemovePoint(teamName)}>-</ButtonPrimary>
                            <ButtonPrimary className={`hand ${firstHand === teamName ? "buzz" : ""}`} onClick={() => handleSetHand(teamName)}>Main</ButtonPrimary>
                        </div>
                    )
                }
                <div className="teamController">
                    <div className="teamName">TIMER</div>
                    <div className="point timerConsole">{parseInt(timer.value)}</div>
                    <ButtonPrimary className="addPoint" onClick={handleStopTimer}>Stop</ButtonPrimary>
                    <ButtonPrimary className="removePoint" onClick={handleResumeTimer} disabled={disableResume()}>Resume</ButtonPrimary>
                    <ButtonPrimary className="hand" onClick={handleResetTimer}>Reset</ButtonPrimary>
                </div>
            </div>
            <div className="d-flex flex-row">
                <ButtonPrimary className="unlockBuzzer" onClick={handleUnlockBuzzer}>Débloquer buzzer</ButtonPrimary>
                <ButtonPrimary className="unlockBuzzer" onClick={handleBadAnswer}>Mauvaise réponse</ButtonPrimary>
            </div>
        </div>
    );
};

export default FaceToFaceConsole;
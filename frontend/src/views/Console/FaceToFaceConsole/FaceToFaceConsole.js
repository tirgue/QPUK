import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ButtonPrimary } from '../../../components/components.index';
import worstTeam from '../../../utils/extractBestTeams';
import './FaceToFaceConsole.scss'

const FaceToFaceConsole = () => {

    const [teams, setTeams] = useState({})
    const [timer, setTimer] = useState({})

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
    }

    useEffect(() => {
        axios.get('/api/state')
            .then(response => {
                parseResponse(response)
            })
    }, []);

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
        axios.post('/api/face-to-face/hand/set', {
            teamName: teamName
        })
            .then(response => {
                parseResponse(response)
            })
    }

    return (
        <div id="faceToFaceConsole">
            <div className="teamControllers">
                {
                    Object.entries(teams).map(([teamName, { points }]) =>
                        <div key={teamName} className="teamController">
                            <div className="teamName">{teamName}</div>
                            <div className="point">{points}</div>
                            <ButtonPrimary className="addPoint" onClick={() => handleAddPoint(teamName)}>+</ButtonPrimary>
                            <ButtonPrimary className="removePoint" onClick={() => handleRemovePoint(teamName)}>-</ButtonPrimary>
                            <ButtonPrimary className="hand" onClick={() => handleSetHand(teamName)}>Main</ButtonPrimary>
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
            <ButtonPrimary className="unlockBuzzer">Débloquer buzzer</ButtonPrimary>
        </div>
    );
};

export default FaceToFaceConsole;
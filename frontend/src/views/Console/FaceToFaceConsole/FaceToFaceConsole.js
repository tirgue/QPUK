import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ButtonPrimary } from '../../../components/components.index';
import worstTeam from '../../../utils/extractBestTeams';
import './FaceToFaceConsole.scss'

const FaceToFaceConsole = () => {

    const [teams, setTeams] = useState({})

    useEffect(() => {
        axios.get('/api/state')
            .then(response => {
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
            })
    }, []);

    return (
        <div id="faceToFaceConsole">
            <div className="teamControllers">
                {
                    Object.entries(teams).map(([teamName, { points }]) =>
                        <div key={teamName} className="teamController">
                            <div className="teamName">{teamName}</div>
                            <div className="point">{points}</div>
                            <ButtonPrimary className="addPoint">+</ButtonPrimary>
                            <ButtonPrimary className="removePoint">-</ButtonPrimary>
                            <ButtonPrimary className="hand">Main</ButtonPrimary>
                        </div>
                    )
                }
            </div>
            <ButtonPrimary className="unlockBuzzer">Débloquer buzzer</ButtonPrimary>
        </div>
    );
};

export default FaceToFaceConsole;
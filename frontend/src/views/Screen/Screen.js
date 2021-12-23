import React, { useEffect, useState } from 'react';
import worstTeam from '../../utils/worstTeam';
// eslint-disable-next-line
import FaceToFace from './FaceToFace/FaceToFace';
// eslint-disable-next-line
import FourInARow from './FourInARow/FourInARow';
// eslint-disable-next-line
import NinePoints from './NinePoints/NinePoints';
import './Screen.scss'

const Screen = () => {
    const [gameState, setGameState] = useState({});

    useEffect(() => {
        const events = new EventSource('http://localhost:8080/api/state/event');

        events.onmessage = (event) => {
            setGameState(JSON.parse(event.data));
        };

        events.onerror = (event) => {
            console.error(event)
            events.close()
        }

        return () => events.close()
    }, []);

    const extractFinalists = () => {
        const ninePointsState = gameState.games.ninePoints
        const fourInARowState = gameState.games.fourInARow
        const faceToFaceState = gameState.games.faceToFace

        const teamToDelete1 = worstTeam(ninePointsState.teams, "points")
        const bestTeamsFourInARow = { ...fourInARowState.teams }
        delete bestTeamsFourInARow[teamToDelete1]

        const teamToDelete2 = worstTeam(bestTeamsFourInARow, "bestPoints")
        const bestTeams = { ...faceToFaceState.teams }
        delete bestTeams[teamToDelete1]
        delete bestTeams[teamToDelete2]
        return Object.entries(bestTeams).map(([teamName]) => teamName).sort()
    }

    return (
        <div>
            {
                (() => {
                    if (gameState.currentGame === "ninePoints")
                        return <NinePoints state={gameState.games.ninePoints} />
                    if (gameState.currentGame === "fourInARow")
                        return <FourInARow state={gameState.games.fourInARow} />
                    if (gameState.currentGame === "faceToFace")
                        return <FaceToFace state={gameState.games.faceToFace} finalists={extractFinalists()} />
                })()
            }
        </div>
    );
}

export default Screen;

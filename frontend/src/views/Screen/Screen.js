import React, { useEffect, useState } from 'react';
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
    return (
        // <NinePoints />
        // <FourInARow />
        // <FaceToFace />
        <div>
            {
                JSON.stringify(gameState, null, 4)
            }
        </div>
    );
}

export default Screen;

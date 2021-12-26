import React, { useEffect, useState } from 'react';
import axios from 'axios'
import "./Buzzer.scss"

const Buzzer = () => {
    const [buzzerId, setBuzzerId] = useState(null)

    useEffect(() => {
        if (localStorage.getItem("buzzerId")) return setBuzzerId(localStorage.getItem("buzzerId"))
        const id = new Date().getTime().toString() + parseInt(Math.random() * 100)
        localStorage.setItem("buzz", id)
        setBuzzerId(id)
    }, [])

    const handleBuzzer = () => {
        axios.post('/api/buzz', {
            buzzerId: buzzerId
        })
            .then(response => { })
    }

    return (
        <div id="buzzer" onClick={handleBuzzer}>
            <div className="pushBuzzer">
                BUZZ
            </div>
        </div>
    );
}

export default Buzzer;

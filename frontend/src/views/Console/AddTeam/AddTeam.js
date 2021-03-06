import React, { useEffect, useRef, useState } from 'react';
import "./AddTeam.scss"
import { Form } from 'react-bootstrap'
import { ButtonPrimary } from '../../../components/components.index'
import axios from 'axios';

function AddTeam(props) {

    const [teams, setTeams] = useState([])
    const [addTeamDisable, setAddTeamDisable] = useState(false)
    const inputRef = useRef()

    useEffect(() => {
        axios.get('/api/state')
            .then(response => {
                const state = response.data
                setTeams(state.teams)
            })
    }, []);

    const handleAddTeam = () => {
        const teamName = inputRef.current.value
        if (!teamName) return
        setAddTeamDisable(true)
        setTeams([...teams, {
            teamName: teamName,
            buzzerId: null
        }])
        axios.post('/api/addTeam', {
            teamName: teamName
        })
            .then(response => {
                const state = response.data
                setTeams(state.teams)
                inputRef.current.value = ""
            })
            .finally(() => {
                setAddTeamDisable(false)
            })
    }

    const handleRemoveTeam = (teamName) => {
        axios.post('/api/removeteam', {
            teamName: teamName
        })
            .then(response => {
                const state = response.data
                setTeams(state.teams)
            })
    }

    return (
        <div id="addTeam">
            <div className="teamList">
                {
                    teams.map(({ teamName, buzzerId }) =>
                        <div key={teamName} className={`teamName ${buzzerId ? "" : "buzz"}`} onClick={() => handleRemoveTeam(teamName)}>{teamName}</div>
                    )
                }
            </div>
            <Form.Control className="addInput" ref={inputRef}></Form.Control>
            <ButtonPrimary onClick={handleAddTeam} disabled={addTeamDisable}>Ajouter</ButtonPrimary>
        </div>
    );
}

export default AddTeam;
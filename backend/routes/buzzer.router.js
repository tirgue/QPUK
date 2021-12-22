var express = require('express');
var router = express.Router();
var gameState = require('../core/GameState')


router.post('/', (req, res, next) => {
    ({ buzzerId } = req.body)

    if (gameState.state.currentGame === "addTeam") {
        const team = gameState.state.teams.find(({ buzzerId }) => {
            return !buzzerId
        })
        team.buzzerId = buzzerId
    }

    return res.status(200).json(gameState.state)
})

module.exports = router;
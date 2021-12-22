var express = require('express');
var router = express.Router();
var gameState = require('../core/GameState')


router.post('/', (req, res, next) => {
    ({ buzzerId } = req.body)

    if (gameState.state.currentGame === "addTeam") {
        const team = gameState.state.teams.find(({ buzzerId }) => {
            return !buzzerId
        })
        if (team) team.buzzerId = buzzerId
    }

    if (gameState.state.currentGame === "ninePoints") {
        const { teamName } = gameState.getTeamByBuzzerId(buzzerId)
        gameState.ninePointsBuzz(teamName)
    }

    return res.status(200).json(gameState.state)
})

module.exports = router;

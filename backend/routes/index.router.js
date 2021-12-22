var express = require('express');
var router = express.Router();
var gameState = require('../core/GameState')

var ninePointsRouter = require('./ninePoints/ninePoints.router')
var fourInARowRouter = require('./fourInARow/fourInARow.router')
var faceToFaceRouter = require('./faceToFace/faceToFace.router')
var buzzerRouter = require('./buzzer.router');
const sleep = require('../utils/sleep');

router.use('/nine-points', ninePointsRouter)
router.use('/four-in-a-row', fourInARowRouter)
router.use('/face-to-face', faceToFaceRouter)
router.use('/buzz', buzzerRouter)

// Get Game State
router.get('/state', (req, res, next) => {
    return res.status(200).json(gameState.state);
});

router.post('/addTeam', async (req, res, next) => {
    const awaitingTeam = gameState.state.teams.find(({ buzzerId }) => {
        return !buzzerId
    })
    if (awaitingTeam) {
        return res.status(200).json(gameState.state)
    }

    ({ teamName } = req.body)
    gameState.addTeam(teamName)
    gameState.setCurrentGame("addTeam")
    while (gameState.state.teams.find(({ teamName: tn, buzzerId }) => (tn === teamName && !buzzerId))) {
        await sleep(100)
    }
    res.status(200).json(gameState.state)
})

router.post('/removeTeam', (req, res, next) => {
    ({ teamName } = req.body)
    gameState.removeTeam(teamName)
    res.status(200).json(gameState.state)
})

router.post('/currentGame', (req, res, next) => {
    ({ game } = req.body)
    gameState.setCurrentGame(game)
    res.status(200).json(gameState.state)
})


module.exports = router;

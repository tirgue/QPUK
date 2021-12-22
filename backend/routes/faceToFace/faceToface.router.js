var express = require('express');
var router = express.Router();
var gameState = require('../../core/GameState')

router.post('/addPoint', (req, res, next) => {
    ({ teamName, points } = req.body)
    gameState.faceToFaceAddPoint(points, teamName)
    res.status(200).json(gameState.state)
})

router.post('/removePoint', (req, res, next) => {
    ({ teamName, points } = req.body)
    gameState.faceToFaceRemovePoint(points, teamName)
    res.status(200).json(gameState.state)
})

router.post('/unlockBuzzer', (req, res, next) => {
    gameState.faceToFaceClearBuzz()
    res.status(200).json(gameState.state)
})

router.post('/timer/start', (req, res, next) => {
    ({ timerValue } = req.body)
    if (timerValue)
        gameState.faceToFaceStartTimer(timerValue)
    else
        gameState.faceToFaceStartTimer()
    res.status(200).json(gameState.state)
})

router.post('/timer/stop', (req, res, next) => {
    gameState.faceToFaceStopTimer()
    res.status(200).json(gameState.state)
})

router.post('/timer/resume', (req, res, next) => {
    gameState.faceToFaceResumeTimer()
    res.status(200).json(gameState.state)
})

router.post('/hand/set', (req, res, next) => {
    ({ teamName, otherTeam } = req.body)
    gameState.faceToFaceSetHand(teamName, otherTeam)
    res.status(200).json(gameState.state)
})

router.post('/hand/give', (req, res, next) => {
    ({ teamName } = req.body)
    gameState.faceToFaceGiveHand(teamName)
    res.status(200).json(gameState.state)
})

module.exports = router
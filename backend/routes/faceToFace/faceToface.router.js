var express = require('express');
var router = express.Router();
var gameState = require('../../core/GameState')

router.post('/addPoint', (req, res, next) => {
    ({ teamName, points } = req.body)
    gameState.faceToFaceAddPoint(points, teamName)
    next()
})

router.post('/removePoint', (req, res, next) => {
    ({ teamName, points } = req.body)
    gameState.faceToFaceRemovePoint(points, teamName)
    next()
})

router.post('/unlockBuzzer', (req, res, next) => {
    gameState.faceToFaceClearBuzz()
    next()
})

router.post('/badAnswer', (req, res, next) => {
    ({ otherTeam } = req.body)
    gameState.faceToFaceSwitchHand(otherTeam)
    next()
})

router.post('/timer/start', (req, res, next) => {
    ({ timerValue } = req.body)
    if (timerValue)
        gameState.faceToFaceStartTimer(timerValue)
    else
        gameState.faceToFaceStartTimer()
    next()
})

router.post('/timer/stop', (req, res, next) => {
    gameState.faceToFaceStopTimer()
    next()
})

router.post('/timer/resume', (req, res, next) => {
    gameState.faceToFaceResumeTimer()
    next()
})

router.post('/hand/set', (req, res, next) => {
    ({ teamName, otherTeam } = req.body)
    gameState.faceToFaceSetHand(teamName, otherTeam)
    next()
})

router.post('/hand/give', (req, res, next) => {
    ({ teamName } = req.body)
    gameState.faceToFaceGiveHand(teamName)
    next()
})

module.exports = router
var express = require('express');
var router = express.Router();
var gameState = require('../../core/GameState')

router.post('/addPoint', (req, res, next) => {
    ({ teamName, points } = req.body)
    gameState.fourInARowAddPoint(points, teamName)
    res.status(200).json(gameState.state)
})

router.post('/resetPoint', (req, res, next) => {
    ({ teamName, points } = req.body)
    gameState.fourInARowResetPoint(teamName)
    res.status(200).json(gameState.state)
})

router.post('/timer/start', (req, res, next) => {
    ({ timerValue } = req.body)
    if (timerValue)
        gameState.fourInARowStartTimer(timerValue)
    else
        gameState.fourInARowStartTimer()
    res.status(200).json(gameState.state)
})

router.post('/timer/stop', (req, res, next) => {
    gameState.fourInARowStopTimer()
    res.status(200).json(gameState.state)
})

router.post('/timer/resume', (req, res, next) => {
    gameState.fourInARowResumeTimer()
    res.status(200).json(gameState.state)
})

router.post('/theme', (req, res, next) => {
    ({ theme } = req.body)
    gameState.fourInARowSetTheme(theme)
    res.status(200).json(gameState.state)
})

module.exports = router
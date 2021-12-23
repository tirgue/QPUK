var express = require('express');
var router = express.Router();
var gameState = require('../../core/GameState')

router.post('/addPoint', (req, res, next) => {
    ({ teamName, points } = req.body)
    gameState.fourInARowAddPoint(points, teamName)
    next()
})

router.post('/resetPoint', (req, res, next) => {
    ({ teamName, points } = req.body)
    gameState.fourInARowResetPoint(teamName)
    next()
})

router.post('/timer/start', (req, res, next) => {
    ({ timerValue } = req.body)
    if (timerValue)
        gameState.fourInARowStartTimer(timerValue)
    else
        gameState.fourInARowStartTimer()
    next()
})

router.post('/timer/stop', (req, res, next) => {
    gameState.fourInARowStopTimer()
    next()
})

router.post('/timer/resume', (req, res, next) => {
    gameState.fourInARowResumeTimer()
    next()
})

router.post('/theme', (req, res, next) => {
    ({ theme } = req.body)
    gameState.fourInARowSetTheme(theme)
    next()
})

router.post('/currentTeam', (req, res, next) => {
    ({ teamName } = req.body)
    gameState.fourInARowSetCurrentTeam(teamName)
    next()
})

module.exports = router
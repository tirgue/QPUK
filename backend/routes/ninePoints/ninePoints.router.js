var express = require('express');
var router = express.Router();
var gameState = require('../../core/GameState')

router.post('/addPoint', (req, res, next) => {
    ({ teamName, points } = req.body)
    gameState.ninePointsAddPoint(points, teamName)
    next()
})

router.post('/removePoint', (req, res, next) => {
    ({ teamName, points } = req.body)
    gameState.ninePointsRemovePoint(points, teamName)
    next()
})

router.post('/buzzer/unlock', (req, res, next) => {
    gameState.ninePointsUnlockBuzzer()
    next()
})

router.post('/buzzer/reset', (req, res, next) => {
    gameState.ninePointsResetBuzzer()
    next()
})

module.exports = router
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

router.post('/unlockBuzzer', (req, res, next) => {
    gameState.ninePointsClearBuzz()
    next()
})

module.exports = router
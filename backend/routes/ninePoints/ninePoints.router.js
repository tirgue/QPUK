var express = require('express');
var router = express.Router();
var gameState = require('../../core/GameState')

router.post('/addPoint', (req, res, next) => {
    ({ teamName, points } = req.body)
    gameState.ninePointsAddPoint(points, teamName)
    res.status(200).json(gameState.state)
})

router.post('/removePoint', (req, res, next) => {
    ({ teamName, points } = req.body)
    gameState.ninePointsRemovePoint(points, teamName)
    res.status(200).json(gameState.state)
})

router.post('/unlockBuzzer', (req, res, next) => {
    gameState.ninePointsClearBuzz()
    res.status(200).json(gameState.state)
})

module.exports = router
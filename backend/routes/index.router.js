var express = require('express');
var router = express.Router();
var gameState = require('../core/GameState')

// Get Game State
router.get('/state', function (req, res, next) {
    return res.status(200).json(gameState.state);
});

module.exports = router;

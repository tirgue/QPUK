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

let clients = [];
router.get('/state/event', (req, res, next) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-transform',
        'Access-Control-Allow-Origin': '*'
    };
    res.writeHead(200, headers);

    res.write(`data: ${JSON.stringify(gameState.state)}\n\n`);

    const clientId = Date.now();
    const newClient = {
        id: clientId,
        response: res
    };
    console.log(`${clientId} Connection opened`);

    clients.push(newClient);

    req.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(client => client.id !== clientId);
    });
})

// Get Game State
router.get('/state', (req, res, next) => {
    next()
});

router.post('/addTeam', async (req, res, next) => {
    const awaitingTeam = gameState.state.teams.find(({ buzzerId }) => {
        return !buzzerId
    })
    if (awaitingTeam) {
        next()
    }

    ({ teamName } = req.body)
    gameState.addTeam(teamName)
    gameState.setCurrentGame("addTeam")
    while (gameState.state.teams.find(({ teamName: tn, buzzerId }) => (tn === teamName && !buzzerId))) {
        await sleep(100)
    }
    next()
})

router.post('/removeTeam', (req, res, next) => {
    ({ teamName } = req.body)
    gameState.removeTeam(teamName)
    next()
})

router.post('/currentGame', (req, res, next) => {
    ({ game } = req.body)
    gameState.setCurrentGame(game)
    next()
})

router.use((req, res, next) => {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(gameState.state)}\n\n`))
    return res.status(200).json(gameState.state)
})

module.exports = router;

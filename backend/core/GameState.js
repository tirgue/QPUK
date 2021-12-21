class GameState {
    constructor() {
        this.init()
    }

    init() {
        this.state = {
            "currentGame": "ninePoints",
            "teams": [],
            "games": {
                "ninePoints": {
                    "teams": {}
                },
                "fourInARow": {
                    "teams": {},
                    "timer": {
                        "value": 40,
                        "running": false
                    }
                },
                "faceToFace": {
                    "teams": {},
                    "timer": {
                        "value": 20,
                        "running": false
                    },
                    "firstHand": null,
                    "hand": null
                },
            },
        }
    }
    addTeam(teamName) {
        this.state.teams.push({
            teamName: teamName,
            buzzerId: null
        })
        this.state.games.ninePoints.teams[teamName] = {
            "points": 0,
            "buzz": false
        }
        this.state.games.fourInARow.teams[teamName] = {
            "currentPoints": 0,
            "bestPoints": 0
        }
        this.state.games.faceToFace.teams[teamName] = {
            "points": 0,
            "buzz": true
        }
    }
    removeTeam(teamName) {
        this.state.teams = this.state.teams.filter(team => {
            return team.teamName !== teamName
        })
        delete this.state.games.ninePoints.teams[teamName]
        delete this.state.games.fourInARow.teams[teamName]
        delete this.state.games.faceToFace.teams[teamName]
    }
    setCurrentGame(gameName) {
        this.state.currentGame = gameName
    }
    toJSON() {
        return JSON.stringify(this.state)
    }

    // Nine Points methods
    ninePointsAddPoint(points, teamName) {
        if (this.state.games.ninePoints.teams[teamName]) {
            this.state.games.ninePoints.teams[teamName].points += points
        }
    }
    ninePointsRemovePoint(points, teamName) {
        if (this.state.games.ninePoints.teams[teamName]) {
            this.state.games.ninePoints.teams[teamName].points -= points
        }
    }
    ninePointsBuzz(teamName) {
        if (this.state.games.ninePoints.teams[teamName]) {
            Object.entries(this.state.games.ninePoints.teams).forEach(([team, { points, buzz }]) => {
                if (buzz) return
            })
            this.state.games.ninePoints.teams[teamName].buzz = true
        }
    }
    ninePointsClearBuzz() {
        Object.entries(this.state.games.ninePoints.teams).forEach(([team, teamState]) => {
            teamState.buzz = false
        })
    }

    // 4 In A Row methods
    fourInARowAddPoint(points, teamName) {
        if (this.state.games.fourInARow.teams[teamName]) {
            this.state.games.fourInARow.teams[teamName].currentPoints += points
            if (this.state.games.fourInARow.teams[teamName].currentPoints > this.state.games.fourInARow.teams[teamName].bestPoints) {
                this.state.games.fourInARow.teams[teamName].bestPoints = this.state.games.fourInARow.teams[teamName].currentPoints
            }
        }
    }
    fourInARowResetPoint(teamName) {
        if (this.state.games.fourInARow.teams[teamName]) {
            this.state.games.fourInARow.teams[teamName].currentPoints = 0
        }
    }
    fourInARowStartTimer(timerValue = 40) {
        this.state.games.fourInARow.timer.value = timerValue
        this.fourInARowResumeTimer()
    }
    fourInARowStopTimer() {
        this.state.games.fourInARow.timer.running = false
    }
    fourInARowResumeTimer() {
        this.state.games.fourInARow.timer.running = true
    }

    // Face to face methods
    faceToFaceAddPoint(points, teamName) {
        if (this.state.games.faceToFace.teams[teamName]) {
            this.state.games.faceToFace.teams[teamName].points += points
        }
    }
    faceToFaceRemovePoint(points, teamName) {
        if (this.state.games.faceToFace.teams[teamName]) {
            this.state.games.faceToFace.teams[teamName].points -= points
        }
    }
    faceToFaceSetHand(teamName) {
        if (this.state.games.faceToFace.teams[teamName]) {
            this.state.games.faceToFace.firstHand = teamName
        }
    }
    faceToFaceGiveHand(teamName) {
        if (this.state.games.faceToFace.teams[teamName]) {
            this.state.games.faceToFace.hand = teamName
        }
    }
    faceToFaceClearBuzz() {
        Object.entries(this.state.games.faceToFace.teams).forEach(([team, teamState]) => {
            teamState.buzz = false
        })
    }
    faceToFaceStartTimer(timerValue = 20) {
        this.state.games.faceToFace.timer.value = timerValue
        this.faceToFaceResumeTimer()
    }
    faceToFaceStopTimer() {
        this.state.games.faceToFace.timer.running = false
    }
    faceToFaceResumeTimer() {
        this.state.games.faceToFace.timer.running = true
    }


}

const gameState = new GameState()

module.exports = gameState;
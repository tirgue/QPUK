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
                        "running": false,
                        "lastStop": new Date()
                    },
                    "theme": "",
                    "currentTeam": ""
                },
                "faceToFace": {
                    "teams": {},
                    "timer": {
                        "value": 20,
                        "running": false,
                        "lastStop": new Date()
                    },
                    "firstHand": null,
                    "hand": {
                        "4": "",
                        "3": "",
                        "2": "",
                        "1": ""
                    }
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
            "buzz": false,
            "lock": false
        }
        this.state.games.fourInARow.teams[teamName] = {
            "currentPoints": 0,
            "bestPoints": 0
        }
        this.state.games.faceToFace.teams[teamName] = {
            "points": 0,
            "buzz": false
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
    getTeamByBuzzerId(id) {
        return this.state.teams.find(({ buzzerId }) => {
            return buzzerId === id
        })
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
            if (this.state.games.ninePoints.teams[teamName].lock) return
            let buzzerAvailable = true
            Object.entries(this.state.games.ninePoints.teams).forEach(([team, { points, buzz }]) => {
                if (buzz) buzzerAvailable = false
            })
            if (buzzerAvailable) {
                this.state.games.ninePoints.teams[teamName].buzz = true
                this.state.games.ninePoints.teams[teamName].lock = true
            }
        }
    }
    ninePointsUnlockBuzzer() {
        Object.entries(this.state.games.ninePoints.teams).forEach(([team, teamState]) => {
            teamState.buzz = false
        })
    }
    ninePointsResetBuzzer() {
        Object.entries(this.state.games.ninePoints.teams).forEach(([team, teamState]) => {
            teamState.lock = false
        })
        this.ninePointsUnlockBuzzer()
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
        this.state.games.fourInARow.timer.running = false
        this.state.games.fourInARow.timer.lastStop = new Date()
    }
    fourInARowStopTimer() {
        if (!this.state.games.fourInARow.timer.running) return
        const newDate = new Date()
        this.state.games.fourInARow.timer.running = false
        this.state.games.fourInARow.timer.value = Math.max(
            this.state.games.fourInARow.timer.value - (newDate - this.state.games.fourInARow.timer.lastStop) / 1000,
            0
        )
        this.state.games.fourInARow.timer.lastStop = newDate
    }
    fourInARowResumeTimer() {
        if (this.state.games.fourInARow.timer.running) return
        this.state.games.fourInARow.timer.running = true
        this.state.games.fourInARow.timer.lastStop = new Date()
    }
    fourInARowSetTheme(theme) {
        this.state.games.fourInARow.theme = theme
    }
    fourInARowSetCurrentTeam(teamName) {
        this.state.games.fourInARow.currentTeam = teamName
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
    faceToFaceSetHand(teamName, otherTeam) {
        if (this.state.games.faceToFace.teams[teamName]) {
            this.state.games.faceToFace.firstHand = teamName
            this.state.games.faceToFace.hand["4"] = teamName
            this.state.games.faceToFace.hand["3"] = otherTeam
            this.state.games.faceToFace.hand["2"] = teamName
            this.state.games.faceToFace.hand["1"] = otherTeam
        }
    }
    faceToFaceGiveHand(teamName) {
        if (this.state.games.faceToFace.teams[teamName]) {
            const currentIndex = parseInt((this.state.games.faceToFace.timer.value / 5) + 1)
            this.state.games.faceToFace.hand[currentIndex] = teamName
        }
    }
    faceToFaceBuzz(teamName) {
        if (this.state.games.faceToFace.teams[teamName]) {
            let buzzerAvailable = true
            Object.entries(this.state.games.ninePoints.teams).forEach(([team, { points, buzz }]) => {
                if (buzz) buzzerAvailable = false
            })
            if (!buzzerAvailable) return

            const newDate = new Date()
            const timerValue = this.state.games.faceToFace.timer.value - (newDate - this.state.games.faceToFace.timer.lastStop) / 1000
            const currentIndex = parseInt((timerValue / 5) + 1)

            if (this.state.games.faceToFace.hand[currentIndex] !== teamName) return

            this.faceToFaceStopTimer()
            this.state.games.faceToFace.teams[teamName].buzz = true
        }
    }
    faceToFaceClearBuzz() {
        Object.entries(this.state.games.faceToFace.teams).forEach(([team, teamState]) => {
            teamState.buzz = false
        })
    }
    faceToFaceSwitchHand(otherTeam) {
        if (this.state.games.faceToFace.timer.running) return
        const currentIndex = parseInt((this.state.games.faceToFace.timer.value / 5) + 1)
        for (let index = currentIndex; index > 0; index--) {
            if (this.state.games.faceToFace.hand[index] !== otherTeam) {
                this.state.games.faceToFace.hand[index] = otherTeam
            } else {
                break;
            }
        }
    }
    faceToFaceStartTimer(timerValue = 20) {
        this.state.games.faceToFace.timer.value = timerValue
        this.state.games.faceToFace.timer.running = false
        this.state.games.faceToFace.timer.lastStop = new Date()
    }
    faceToFaceStopTimer() {
        if (!this.state.games.faceToFace.timer.running) return
        const newDate = new Date()
        this.state.games.faceToFace.timer.running = false
        this.state.games.faceToFace.timer.value = Math.max(
            this.state.games.faceToFace.timer.value - (newDate - this.state.games.faceToFace.timer.lastStop) / 1000,
            0
        )
        this.state.games.faceToFace.timer.lastStop = newDate
    }
    faceToFaceResumeTimer() {
        if (this.state.games.faceToFace.timer.running) return
        this.state.games.faceToFace.timer.running = true
        this.state.games.faceToFace.timer.lastStop = new Date()
    }


}

const gameState = new GameState()

module.exports = gameState;
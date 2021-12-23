const worstTeam = (teamsObject, pointName) => {
    let teamsOrdered = Object.entries(teamsObject).sort(([teamNameA, { [pointName]: pointsA }], [teamNameB, { [pointName]: pointsB }]) => {
        if (pointsA > pointsB) return -1
        if (pointsA < pointsB) return 1
        return 0
    })
    const team = teamsOrdered.pop()
    return team ? team[0] : null
}

export default worstTeam
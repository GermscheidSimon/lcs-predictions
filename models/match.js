const {Team} = require('./team')

// {
//     "startTime": "2022-01-15T01:30:00Z",
//     "state": "completed",
//     "type": "match",
//     "blockName": "Groups",
//     "league": {
//         "name": "LCS",
//         "slug": "lcs"
//     },
//     "match": {
//         "id": "107458335263279342",
//         "flags": [
//             "hasVod"
//         ],
//         "teams": [
//             {
//                 "name": "100 Thieves",
//                 "code": "100",
//                 "image": "http://static.lolesports.com/teams/1631819887423_100t-2021-worlds.png",
//                 "result": {
//                     "outcome": "win",
//                     "gameWins": 1
//                 },
//                 "record": {
//                     "wins": 2,
//                     "losses": 1
//                 }
//             },
//             {
//                 "name": "Golden Guardians",
//                 "code": "GG",
//                 "image": "http://static.lolesports.com/teams/1592590586919_GoldenGuardiansGGS-01-FullonDark.png",
//                 "result": {
//                     "outcome": "loss",
//                     "gameWins": 0
//                 },
//                 "record": {
//                     "wins": 0,
//                     "losses": 2
//                 }
//             }
//         ],
//         "strategy": {
//             "type": "bestOf",
//             "count": 1
//         }
//     }
// }


class Game {
    constructor(gameObj){
        this.startTime = gameObj.startTime
        this.state = gameObj.state
        this.type  = gameObj.type
        this.blockName = gameObj.blockName
        this.league = gameObj.league.name
        this.match = new Match(gameObj.match)
    }
}

class Match {
    constructor(matchObj){
        this.id = matchObj.id
        this.flags = matchObj.flags
        this.teams = matchObj .teams
        this.strategy = matchObj.strategy
    }
}

const matchModels = {
    match = Match
    game = Game
}

export default matchModels
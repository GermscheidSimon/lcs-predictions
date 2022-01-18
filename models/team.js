{
    "name": "Cloud9",
    "code": "C9",
    "image": "http://static.lolesports.com/teams/1631820065346_cloud9-2021-worlds.png",
    "result": {
        "outcome": "win",
        "gameWins": 1
    },
    "record": {
        "wins": 2,
        "losses": 0
    }
}

export default class Team {
    constructor(teamObj) {
        this.jObj = teamObj
        this.name = teamObj.name
        this.code = teamObj.code
        this.image = teamObj.image
        this.record = teamObj.record
    }
}
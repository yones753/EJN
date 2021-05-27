const express = require('express')
const router = express.Router()
const request = require('request');
const playersAPI = "http://data.nba.net/10s/prod/v1/2018/players.json"
const statsAPI = `https://nba-players.herokuapp.com/players-stats`

teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

let players;
let dreamTeam = []
let playersStats;


request(playersAPI, function (error, response, body) {
    players = JSON.parse(body).league.standard
    players.forEach(p => p.already = false);
});



// get all team
router.get('/teams/:teamName', function (req, res) {
    const { teamName } = req.params
    const id = teamToIDs[teamName]
    if (id === undefined) {
        res.send(`Don't have team with that name`)
    } else {
        team = players.filter(p => p.teamId === id && p.isActive)
        res.send(team)
    }
})

// get stats
router.get('/playerStats/:lName/:fName', function (req, res) {
    const { lName, fName } = req.params
    request(`${statsAPI}/${lName}/${fName}`, function (error, response, body) {
        playersStats = JSON.parse(body)
        res.send(playersStats)
    });
})


router.put('/teams', function (req, res) {
    const team = req.body
    teamToIDs[req.body.teamName] = req.body.teamId
    res.end()
})


router.get('/dreamTeam', function (req, res) {
    res.send(dreamTeam)
})


router.post('/roster/:personId', function (req, res) {
    const { personId } = req.params
    if(dreamTeam.length > 4){
        res.send(`Can not add more players`)
    }else{
        let foundPlayer = dreamTeam.find(player => player.personId == personId)
        if (foundPlayer === undefined) {
            dreamTeam.push(players.find(player => player.personId == personId))
            dreamTeam.find(player => player.personId == personId).already=true;
            res.send("Added")
        }
        else {
            dreamTeam = dreamTeam.filter(person => person.personId != personId)
            res.send("deleted")
             }     
    }           
                
})

module.exports = router



















// router.post('/roster/:personId', function (req, res) {
//     const { personId } = req.params
//     if (dreamTeam.length > 4) {
//         res.send(`Can not add more players`)
//     } else {
//         let foundPlayer = dreamTeam.find(player => player.personId == personId)
//         if (foundPlayer === undefined) {
//             dreamTeam.push(players.find(player => player.personId == personId))
//             res.send("Added")
//         }
//         else {
//             res.send("Already exsists")
//         }
//     }
// })


// router.delete('/roster/:personId', function (req, res) {
//     const { personId } = req.query
//     console.log(personId);
//     if (dreamTeam.find(person => person.personId == personId) == undefined) {
//         res.send("cant delete whats not there")
//     }
//     else {
//         dreamTeam = dreamTeam.filter(person => person.personId != personId)
//         // res.send("deleted")
//         res.end()
//     }
// })




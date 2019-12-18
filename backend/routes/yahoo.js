const express = require('express');
const router = express.Router();
const axios = require('axios');
const calcRankings = require('../functions/calculations.js');

var accessToken;

router.post('/accessToken', (req,res) => {
    accessToken = req.body.accessToken;
    console.log('success a token')
    res.send("success")

})

router.post('/players', (req,res) => {
    let data = [];
    let promises = [];
    let iterations = 6;
    
    const getPlayers = (start) => {
      
        return  axios({
            url: 'https://fantasysports.yahooapis.com/fantasy/v2/league/nba.l.113877/players;count=25;status=A;sort=AR;start=' + start + '/stats?format=json',
            method: 'get',
            withCredentials: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
            
            })
        
    }

    for(let i = 0; i < iterations; i++) {
        promises.push(getPlayers(i * 25))
    }

    axios.all(promises)
        .then( (results) => {
            results.forEach(response => {
                Object.keys(response.data.fantasy_content.league[1].players).forEach( (ele, index ) => {
                    var entryPush = response.data.fantasy_content.league[1].players[ele].player;
                    if (entryPush != null) {
                        data.push(entryPush)
                        
                            
                    }
                })
            })



            calcRankings(data, req.body.stats);

            // axios.post("http://localhost:81/firebase/players", 
            //     {
            //         data
            //     }
            // ).then( response => {
            //     console.log('firebase success')
            // }).catch( err => {
            //     console.log('firebase error')
            // })
            
            res.send(data)

        })
})



module.exports = router;
//use serveo for callback redirect url
//command line : ssh -R nbatrade:80:localhost:80 serveo.net
//test

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('qs');
const oauth = require('./routes/oauth');
const draft = require('./routes/draft');
const firebase = require('./routes/firebase');

const app = express();


// Allows data to be available in the req.body in json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Allows the app to use the routes from backend/routes/oauth.js
app.use('/oauth', oauth);
app.use('/draft', draft);
app.use('/firebase', firebase)


// app.get('/', (req,res) => {
//     res.redirect('/oauth?code=' + req.query.code);
    
// })

app.get('/hello', (req,res) => {
    res.send("hello");
})

app.post('/getPlayers', (req,res) => {
    let data = [];
    let startNum = 1;
    let cont = true;

    let funcAxios = (start) => {
        return axios({
          //proxy url
          url: 'https://fantasysports.yahooapis.com/fantasy/v2/league/nba.l.113877/players;status=A;start=' + start + '/stats?format=json',
          method: 'get',
          withCredentials: false,
          headers: {
            'Authorization': 'Bearer ' + req.body.accessToken,
            
          }
          
        })
      }
      let funcThen = (val) => {
        
        
        return function(response) {
          
          
          if (response.data['fantasy_content']['league'][1]['players']['count'] != undefined) {
                     
            data = data.concat(response.data['fantasy_content']['league'][1]['players'])
            
  
            
            funcAxios(val + 25).then(funcThen(val + 25));
            
          }
          else {
            // stateSetter(data);
            console.log("finished")
            res.send("done", data)
          }
        }
        
      };
      let funcError = (error) => {
        console.log(error);
        cont = false
      }
  
      // Chains get request to obtain all players
      funcAxios(1).then(funcThen(1)).catch( error => {
        console.log(error);
      });
})

app.post('/player', (req,res) => {
    let data = [];
    const getPlayers = (start) => {
        axios({
          url: 'https://fantasysports.yahooapis.com/fantasy/v2/league/nba.l.113877/players;count=30;status=A;sort=AR;start=' + start + ';stat1=S_PSR;sdir=1/stats?format=json',
          method: 'get',
          withCredentials: false,
          headers: {
            'Authorization': 'Bearer ' + req.body.accessToken,
          }
          
        })
        .then(response => {
          data.push(response.data);
          // if (start == 75) {
          //   res.send(data);
          // }
          res.send(data);
          
        })
        .catch(err => {
          console.log(err)
        })
    }

    for(let i = 0; i < 1; i++) {
      getPlayers(i * 25);
    }
    
    // console.log(data);
    
})

app.listen(80, () => console.log('Listening on port 80'));



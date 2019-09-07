//use serveo for callback redirect url
//command line : ssh -R nbatrade:80:localhost:80 serveo.net
//test

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('qs');
const oauth = require('./routes/oauth');

const app = express();


// Allows data to be avaialbe in the req.body in json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Allows the app to use the routes from backend/routes/oauth.js
// app.use('/oauth', oauth);


app.get('/', (req,res) => {
    res.redirect('/oauth?code=' + req.query.code);
    
})

app.get('/hello', (req,res) => {
    res.send("hello");
})


app.listen(81, () => console.log('Listening on port 81'));



//use serveo for callback redirect url
//command line : ssh -R nbatrade:80:localhost:80 serveo.net
//test
const calcRankings = require('./functions/calculations.js');

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('qs');
const oauth = require('./routes/oauth');
const draft = require('./routes/draft');
const firebase = require('./routes/firebase');
const yahoo = require('./routes/yahoo');
const app = express();


// Allows data to be available in the req.body in json
app.use(bodyParser.json({ limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: false}));

// Allows the app to use the routes from backend/routes/oauth.js
app.use('/oauth', oauth);
app.use('/draft', draft);
app.use('/firebase', firebase)
app.use('/yahoo', yahoo);

// app.set('port', process.env.PORT || 81);

app.listen(81, () => console.log('Listening on port 81'));


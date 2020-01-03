//use serveo for callback redirect url
//command line : ssh -R nbatrade:80:localhost:80 serveo.net
//test
// const calcRankings = require('./functions/calculations.js');

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
// const qs = require('qs');
const oauth = require('./routes/oauth');
const draft = require('./routes/draft');
const firebase = require('./routes/firebase');
const yahoo = require('./routes/yahoo');
const session = require('express-session');
const FirebaseStore = require('connect-session-firebase')(session);
const admin = require('./db').admin;
const ref = require('./db').ref;
const db = require('./db').db;
const rtdb = require('./db').rtdb;
const cors = require('cors')

const app = express();
console.log("mode is")
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV == "development") {
    require('dotenv').config();
}



// Allows data to be available in the req.body in json
app.use(bodyParser.json({ limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors({
    origin:['http://localhost:81'],
    methods:['GET','POST'],
    credentials: true // enable set cookie
}));

console.log("intializing store")
app.use(session({
    store: new FirebaseStore({
      database: ref.database()
    }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: true,
        // secure: NODE_ENV === 'production',
        maxAge: parseInt(1000 * 60 * 60)
      }
}));


// Allows the app to use the routes from backend/routes/oauth.js
app.use('/oauth', oauth);
app.use('/draft', draft);
app.use('/firebase', firebase)
app.use('/yahoo', yahoo);

// app.set('port', process.env.PORT || 81);


app.get('/session1', (req,res) => {
    req.session.user = {
        name: 'abe',
    }
    console.log(req.session)
    res.send('session success')
})

app.get('/session2', (req,res) => {
    req.session.user = {
        name: 'bose',
    }
    console.log(req.session)
    res.send('session success')
})

app.get('/checkSession', (req,res) => {
    console.log('checking session')
    console.log(req.session)
    res.send(req.session)
})

app.listen(81, () => console.log('Listening on port 81'));


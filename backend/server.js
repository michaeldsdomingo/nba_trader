//server.js


const express = require('express');
const bodyParser = require('body-parser');
const oauth = require('./routes/oauth');
const draft = require('./routes/draft');
const firebase = require('./routes/firebase');
const yahoo = require('./routes/yahoo');
const session = require('express-session');
const FirebaseStore = require('connect-session-firebase')(session);
const ref = require('./db').ref;
const cors = require('cors')

const app = express();
console.log("mode is")
console.log(process.env.NODE_ENV)
// if(process.env.NODE_ENV == "development") {
//     require('dotenv').config();
// }



// Allows data to be available in the req.body in json
app.use(bodyParser.json({ limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors({
    origin:['http://localhost:81'],
    methods:['GET','POST'],
    credentials: true // enable set cookie
}));


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

app.listen(81, () => console.log('Listening on port 81'));


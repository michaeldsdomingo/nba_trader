// const firebase = require("firebase");
// require("firebase/firestore");
// const firebaseAuth = require("firebase/auth");
const admin = require('firebase-admin');
const serviceAccount = require("./nba-trader-firebase-adminsdk-z31l9-7094eb3a98.json");

const ref = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://nba-trader.firebaseio.com'
});

var db = ref.firestore();
var rtdb = ref.database();

module.exports = {
    db,
    admin,
    ref,
    rtdb
}
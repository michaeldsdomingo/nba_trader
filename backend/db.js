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
// const firebaseConfig = {
//     apiKey: "AIzaSyC7QMiPonTeJPbHoE9hnlcby_li6UInJGo",
//     authDomain: "nba-trader.firebaseapp.com",
//     databaseURL: "https://nba-trader.firebaseio.com",
//     projectId: "nba-trader",
//     storageBucket: "nba-trader.appspot.com",
//     messagingSenderId: "576342550383",
//     appId: "1:576342550383:web:a0f40965fd9e301e36aa9a",
//     measurementId: "G-NNRTT73SYE"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);



module.exports = {
    db,
    admin,
    ref,
    rtdb
}
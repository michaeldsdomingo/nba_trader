const firebase = require("firebase");
require("firebase/firestore");
const firebaseAuth = require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyC7QMiPonTeJPbHoE9hnlcby_li6UInJGo",
    authDomain: "nba-trader.firebaseapp.com",
    databaseURL: "https://nba-trader.firebaseio.com",
    projectId: "nba-trader",
    storageBucket: "nba-trader.appspot.com",
    messagingSenderId: "576342550383",
    appId: "1:576342550383:web:a0f40965fd9e301e36aa9a",
    measurementId: "G-NNRTT73SYE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



module.exports = {
    firebase
}
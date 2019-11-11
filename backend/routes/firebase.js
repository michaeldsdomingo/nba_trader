const express = require('express');
const router = express.Router();
const axios = require('axios');
const firebase = require('../db').firebase;

var db = firebase.firestore();

router.get('/test', (req,res) => {
    db.collection('players').add({
        foo: 'bar',
    })
    .then(ref => {
        console.log("Added document with ID: ", ref.id)
        res.send(ref.id)
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router;
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

router.post('/players', (req,res) => {
    var data = req.body.data;
   
    
    data.forEach( (entry, index) => {
        db.collection('players').doc(`${index}`).set({
            0: entry[0],
            1: entry[1]
        }).then(ref => {
            // console.log("Added")
            
        }).catch(err => {
            // console.log('not good')
        })
    })

    res.send('finished')

    
    // db.collection('players').doc("0").set({
    //     key1: [0, 1, 2],
    //     key2: [{foo: ["bar", "hooder"]}, {what: "up"}]
    // }).then(ref => {
    //     console.log("Added", ref.id)
    //     res.send(ref.id)
    // }).catch(err => {
    //     res.send(err)
    // })
})

router.get('/players/default', (req, res) => {
    let data = [];
    let query = db.collection('players').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                // console.log(doc.data())
                data.push(doc.data());
            })
            res.send(data)
        })
        .catch(err => {
            console.log(err);
        })
    
    
})

module.exports = router;
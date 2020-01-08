const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../db').db;


// var db = firebase.firestore();


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

})

router.get('/players/default', (req, res) => {
    let data = [];
    let query = db.collection('players').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
            
                data.push(doc.data());
            })
            res.send(data)
        })
        .catch(err => {
            console.log(err);
        })
    
    
})

module.exports = router;
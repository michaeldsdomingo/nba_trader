const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req,res) => {
    axios.get('https://www.fantasybasketballnerd.com/service/draft-projections')
    .then( (response) => {
        res.send(response);
    })
    .catch( (error) => {
        res.send(error);
    })
})

module.exports = router;
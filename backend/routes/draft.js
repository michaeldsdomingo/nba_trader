const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/projections', (req,res) => {
    axios.get('https://www.fantasybasketballnerd.com/service/draft-projections')
    .then( (response) => {
        res.send(response.data);
    })
    .catch( (error) => {
        res.send(error);
    })
})

module.exports = router;
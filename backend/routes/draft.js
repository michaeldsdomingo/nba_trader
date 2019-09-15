const express = require('express');
const router = express.Router();
const axios = require('axios');
const convert = require('xml-js');

router.get('/projections', (req,res) => {
    axios.get('https://www.fantasybasketballnerd.com/service/draft-projections')
    .then( (response) => {
        var json = convert.xml2json(response.data, {compact: true, spaces: 4})
        res.send(json);
    })
    .catch( (error) => {
        res.send(error);
    })
})

module.exports = router;
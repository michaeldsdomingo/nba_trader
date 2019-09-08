const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req,res) => {
    res.send('you are now in draft endpoint')
})

module.exports = router;
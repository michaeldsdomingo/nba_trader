const express = require('express');
// const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const router = express.Router();
const qs = require('qs');

const clientID = 'dj0yJmk9TmgwOVF3TW10TnBsJmQ9WVdrOWVHNXdRMjloTnpZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWJj';
const clientSecret = '6c30d8b0091cdfecb1c7196888371feeb923ea91';
const redirectUri = 'https://nbatrader.michaeldomingo.dev';
const authURL = 'https://api.login.yahoo.com/oauth2/request_auth';
const accessTokenURL = 'https://api.login.yahoo.com/oauth2/get_token';
const clientHash = 'NmMzMGQ4YjAwOTFjZGZlY2IxYzcxOTY4ODgzNzFmZWViOTIzZWE5MQ==';

let accessToken = '';

// When the user clicks on login, it will redirect to yahoo's login plus parameters
router.get('/login', (req,res) => {
    
    var queryParams = qs.stringify({
        client_id: clientID,
        redirect_uri: redirectUri,
        response_type: 'code'
    })
    res.redirect(authURL + '?' + queryParams);
})

// After the user authenticates, he will be redirected to this route
// which will send a post request to yahoo and retrieve the access and refresh token
router.get('/', (req,res) => {
    let accessCode = req.query.code;
    let bodyParams = {'grant_type': 'authorization_code', 'redirect_uri': redirectUri, 'code': accessCode};
    
    let xml=new XMLHttpRequest();
    xml.open("POST", accessTokenURL,true);
    xml.setRequestHeader('Authorization','Basic ' + clientHash);
    xml.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    
    xml.onreadystatechange=function(){
        if( xml.readyState == 4 && xml.status == 200) {
            let json = JSON.parse(xml.responseText);
            accessToken = json['access_token'];
            let refreshToken = json['refresh_token'];
            console.log(json);
            var string = encodeURIComponent(accessToken);
        }
        else {
            console.log(xml.status);
            console.log(xml.responseText);
            console.log("Getting access token Unsucessful")
        }
    };
    xml.send(qs.stringify(bodyParams)); 
    res.redirect('http://localhost:3000');
})


// Returns the access token to client side
router.get('/token', (req,res) => {
    return res.json({'accessToken': accessToken})
})

module.exports = router;

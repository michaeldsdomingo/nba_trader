const express = require('express');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const router = express.Router();
const qs = require('qs');

const clientID = 'dj0yJmk9NmMwb3doYmFxMGF5JmQ9WVdrOVdHTlFjR2xyTm1jbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWIx';
const clientSecret = '0e6790c003224688cc9ca98002307af88a9be5b4';
const redirectUri = 'https://nbatrader.michaeldomingo.dev/oauth/redirect';
const authURL = 'https://api.login.yahoo.com/oauth2/request_auth';
const accessTokenURL = 'https://api.login.yahoo.com/oauth2/get_token';
const clientHash = 'MGU2NzkwYzAwMzIyNDY4OGNjOWNhOTgwMDIzMDdhZjg4YTliZTViNA==';

var accessToken = '';

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
router.get('/redirect', (req,res) => {
    let accessCode = req.query.code;
    let bodyParams = {'grant_type': 'authorization_code', 'redirect_uri': m, 'code': accessCode};
    
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
    res.redirect('https://google.com');
})


// Returns the access token to client side
router.get('/token', (req,res) => {
    return res.json({'accessToken': accessToken})
})

module.exports = router;

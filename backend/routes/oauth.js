const express = require('express');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const router = express.Router();
const qs = require('qs');
const axios = require('axios');

const redirectUri = 'https://nbatrader.michaeldomingo.dev/oauth/redirect';
const redirectUri1 = 'https://nbatrader.michaeldomingo.dev/oauth/redirect-local';

const authURL = 'https://api.login.yahoo.com/oauth2/request_auth';
const accessTokenURL = 'https://api.login.yahoo.com/oauth2/get_token';

var accessToken = '';

axios.defaults.withCredentials = true;

// When the user clicks on login, it will redirect to yahoo's login plus parameters
router.get('/login', (req,res) => {
    console.log(new Date().toLocaleString('en-US'))
    console.log(process.env.REDIRECT_URI);
    var queryParams = qs.stringify({
        client_id: process.env.CLIENTID,
        //Development: redirect_uri: redirectUri1
        //Production: redirect_uri: redirectUri
        redirect_uri: process.env.REDIRECT_URI,
        response_type: 'code'
    })
    res.redirect(authURL + '?' + queryParams);
})

router.get('/session1', (req,res) => {
    req.session.user = {
        name: 'abe',
    }
    console.log(req.session)
    res.send('session success')
})

// After the user authenticates, he will be redirected to this route
// which will send a post request to yahoo and retrieve the access and refresh token
router.get('/redirect', async (req,res) => {
    let accessCode = req.query.code;
    // console.log('code is: ', accessCode);
    var session = req.session;
    var user = {};
    
    let bodyParams = {'grant_type': 'authorization_code', 'redirect_uri': process.env.REDIRECT_URI, 'code': accessCode};
    const transport = axios.create({
        withCredentials: true
    })
    const test = await transport({
        url: `${accessTokenURL}`,
        method: 'post',
        headers: {
            'Authorization': `Basic ${new Buffer(process.env.CLIENTID + ':' + process.env.CLIENTSECRET).toString('base64')}`,
            'Content-Type': `application/x-www-form-urlencoded`,
        },
        data: qs.stringify({
            'grant_type': 'authorization_code', 
            'redirect_uri': process.env.REDIRECT_URI, 
            'code': accessCode
        }),
        response_type: 'json',
        withCredentials: true,
    }).then( (response) => {
        // console.log(response)
        console.log('success request to access token')
        let json = response.data;
        accessToken = json['access_token'];
        console.log(accessToken)
        let refreshToken = json['refresh_token'];
        // console.log(json);
        let { access_token, refresh_token, xoauth_yahoo_guid } = json;
        // console.log(xoauth_yahoo_guid);
        var string = encodeURIComponent(accessToken);
        user = {
            access_token,
            refresh_token,
            xoauth_yahoo_guid
        };
        // req.session.user = user;
        // console.log(req.session)
        //Development: http://localhost:81/yahoo/accessToken
        //Production: http://nbatrader.michaeldomingo.dev/yahoo/accessToken
        // console.log(new Date().toLocaleString('en-US'))
        // console.log(process.env.HOME_URL_ACCESS_TOKEN);
        axios.post(process.env.HOME_URL_ACCESS_TOKEN,
            {
                accessToken
            }
        ).then(respons => {
            console.log("access token success")
        }).catch(err => {
            
            console.log(err)
        })
    }).catch( (error) => {
        console.log('unsuccess request to access token: ', error)
    })
    console.log(user);
    req.session.user = user;
    // let xml = new XMLHttpRequest();
    // xml.open("POST", accessTokenURL,true);
    // xml.setRequestHeader('Authorization','Basic ' + clientHash);
    // xml.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    
    // xml.onreadystatechange=function(){
    //     if( xml.readyState == 4 && xml.status == 200) {
    //         let json = JSON.parse(xml.responseText);
    //         accessToken = json['access_token'];
    //         let refreshToken = json['refresh_token'];
    //         // console.log(json);
    //         let { access_token, refresh_token, xoauth_yahoo_guid } = json;
    //         // console.log(xoauth_yahoo_guid);
    //         var string = encodeURIComponent(accessToken);
    //         user = {
    //             access_token,
    //             refresh_token,
    //             xoauth_yahoo_guid
    //         };
            
    //         console.log(req.session)
    //         //Development: http://localhost:81/yahoo/accessToken
    //         //Production: http://nbatrader.michaeldomingo.dev/yahoo/accessToken
    //         // console.log(new Date().toLocaleString('en-US'))
    //         // console.log(process.env.HOME_URL_ACCESS_TOKEN);
    //         axios.post(process.env.HOME_URL_ACCESS_TOKEN,
    //             {
    //                 accessToken
    //             }
    //         ).then(respons => {
    //             console.log("access token success")
    //         }).catch(err => {
                
    //             console.log(err)
    //         })
    //     }
    //     else {
    //         // console.log(xml.status);
    //         // console.log(xml.responseText);
    //         console.log("Getting access token Unsucessful")
            
    //     }
    // };
    // xml.send(qs.stringify(bodyParams)); 
    // console.log(user)
    // req.session.user = user
    // console.log(new Date().toLocaleString('en-US'))
    // console.log(process.env.HOME_URL);
    res.redirect(process.env.HOME_URL);
 
    
})


// Returns the access token to client side
router.get('/token', (req,res) => {
    return res.json({'accessToken': accessToken})
})


router.get('/redirect-local', (req,res) => {
    let accessCode = req.query.code;
    console.log(accessCode);
    res.redirect(`http://localhost:81/oauth/redirect/?code=${accessCode}`);
})

router.get('/checkSession', (req,res) => {
    console.log(req.session)
    res.send(req.session)
})

router.get('/logout', (req,res) => {
    req.session.destroy( () => {
        res.status('200').json({session: req.session})
    })
})

// router.get('/redirect2', (req,res) => {
//     let whatever;
//     let accessCode = req.query.code;
//     let test = 'hello'
//     console.log('code is: ', accessCode);
//     console.log("after")
//     let bodyParams = {'grant_type': 'authorization_code', 'redirect_uri': redirectUri1, 'code': accessCode};
//     // axios({
//     //     url: accessTokenURL,
//     //     method: 'post',
//     //     headers: {
//     //         'Authorization': `Basic ${clientHash}`,
//     //         'Content-Type': `application/x-www-form-urlencoded`,
            
//     //     },
//     //     data: {
//     //         'grant_type': 'authorization_code', 
//     //         'redirect_uri': redirectUri, 
//     //         'code': accessCode
//     //     },
//     //     response_type: 'json'
//     // })
//     // .then( (response) => {
//     //     whatever = response;
//     //     console.log('success request to access token')
//     // })
//     // .catch( (error) => {
//     //     whatever = error;
//     //     console.log('unsuccess request to access token: ', error)
//     // })
    
//     let xml = new XMLHttpRequest();
//     xml.open("POST", accessTokenURL,true);
//     xml.setRequestHeader('Authorization','Basic ' + clientHash);
//     xml.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    
//     xml.onreadystatechange=function(){
//         if( xml.readyState == 4 && xml.status == 200) {
//             let json = JSON.parse(xml.responseText);
//             accessToken = json['access_token'];
//             let refreshToken = json['refresh_token'];
//             console.log(json);
//             var string = encodeURIComponent(accessToken);
//             whatever = json;
            
//             axios.post('http://localhost:81/yahoo/accessToken',
//                 {
//                     accessToken
//                 }
//             ).then(respons => {
//                 console.log("access token success")
//             }).catch(err => {
                
//                 console.log(err)
//             })
//         }
//         else {
//             console.log(xml.status);
//             console.log(xml.responseText);
//             console.log("Getting access token Unsucessful")
//             whatever = xml.responseText;
//         }
//     };
//     xml.send(qs.stringify(bodyParams)); 
    
    

    
    
//     res.redirect('http://localhost:3000')
// })

router.get('/checkLoggedInStatus', (req,res) => {
    res.send(req.session);
})

module.exports = router;

import React, { Component } from 'react';
// import '../App.js/index.js';
import '../Style/style.css'
import axios from 'axios';

class Navbar extends Component {
    hello = () => {
        console.log('hello world');
        axios.get('/hello').then( (response) => {
            console.log(response);
        })
        .catch( (error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <ul>
                    <li id='title'>
                        Smart Trader
                    </li>
                    <li class='align-right' id='login'>
                        <a href="oauth/login">
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYFaha-tCBSlfeFgNC14bGCcFxUutaA2SEq4EX2YrAO3k5KwBl' className='yahoo-image'>
                            </img>
                            Login
                        </a>
                        <a onClick={this.hello}>Hello</a>
                    </li>
     
                </ul>
                <br></br>
                <br/>
            </div>
        )
    }
}

export default Navbar
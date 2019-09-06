import React, { Component } from 'react';
// import '../App.js/index.js';
import '../Style/style.css'

class Navbar extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li id='title'>
                        Smart Trader
                    </li>
                    <li class='align-right' id='login'>
                        <a href="http://localhost:80/oauth/login">
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYFaha-tCBSlfeFgNC14bGCcFxUutaA2SEq4EX2YrAO3k5KwBl' className='yahoo-image'>
                            </img>
                            Login
                        </a>
                    </li>
     
                </ul>
                <br></br>
                <br/>
            </div>
        )
    }
}

export default Navbar
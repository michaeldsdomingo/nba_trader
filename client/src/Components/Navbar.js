import React, { Component } from 'react';
// import '../App.js/index.js';
import '../Style/style.css'
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import axios from 'axios';

class Navbar extends Component {
    
    

    render() {
        return (
            <div id="navbar">
                <ul>
                    <li id='title'>
                        NBA Trader
                    </li>
                    
                    <li class='align-right' id='login'>
                        {/* develop: http://localhost:81/oauth/login */}
                        {/* production: /oauth/login */}
                        {this.props.session ? 
                            <a onClick={this.props.logout}>Logout</a> : 
                            <a href={process.env.REACT_APP_LOGIN_URL}>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYFaha-tCBSlfeFgNC14bGCcFxUutaA2SEq4EX2YrAO3k5KwBl' className='yahoo-image'>
                                </img>
                                Login
                            </a>
                        }
                        
                    </li>
     
                </ul>
                
            </div>
        )
    }
}

export default Navbar
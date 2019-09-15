import React, { Component } from "react";
import axios from 'axios';

export default class Draft extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    getProjections = () => {
        axios.get('/draft/projections')
        .then( (response) => {
            console.log( response.data )
        })
        .catch( (error) => {
            console.log(error);
        })
    };
    
    render() {
        return (
            <div>
                Hello World
                <button onClick={this.getProjections}>Get Projections</button>
            </div>
        )
    }
}
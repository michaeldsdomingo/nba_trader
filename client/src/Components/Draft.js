import React, { Component } from "react";
import axios from 'axios';
import Table from './Table'

export default class Draft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }
    }

    componentDidMount() {
        this.getProjections();

    }

    getProjections = () => {
        axios.get('/draft/projections')
        .then( (response) => {
            console.log( response.data.FantasyBasketballNerd.Player )
            this.setState({
                data: response.data.FantasyBasketballNerd.Player
            })
        })
        .catch( (error) => {
            console.log(error);
        })
    }


    
    render() {
        return (
            <div>
                <button onClick={this.getProjections}>Get Projections</button>'
                <Table data={this.state.data} />
            </div>
        )
    }
}
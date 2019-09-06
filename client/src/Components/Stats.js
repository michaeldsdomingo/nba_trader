import React, { Component } from 'react';
// import '../App.js/index.js';
import '../Style/style.css';

class Stats extends Component {
    render() {
        return (
            <div id='stats'>
                <label for="fg">
                    <input id="fg" type="checkbox" name="stats" value='7' onChange={this.props.change} checked={this.props.stats[7]}></input>
                    FG
                </label>
                <label for="ft">
                    <input id="ft" type="checkbox" name="stats" value='8' onChange={this.props.change} checked={this.props.stats[8]}></input>
                    FT
                </label>
                <label for="3pm">
                    <input id="3pm" type="checkbox" name="stats" value='0' onChange={this.props.change} checked={this.props.stats[0]}></input>
                    3PM
                </label>
                <label for="pts">
                    <input id="pts" type="checkbox" name="stats" value='1' onChange={this.props.change} checked={this.props.stats[1]}></input>
                    PTS
                </label>
                <label for="reb">
                    <input id="reb" type="checkbox" name="stats" value='2' onChange={this.props.change} checked={this.props.stats[2]}></input>
                    REB
                </label>
                <label for="ast">
                    <input id="ast" type="checkbox" name="stats" value='3' onChange={this.props.change} checked={this.props.stats[3]}></input>
                    AST
                </label>
                <label for="st">
                    <input id="st" type="checkbox" name="stats" value='4' onChange={this.props.change} checked={this.props.stats[4]}></input>
                    ST
                </label>
                <label for="blk">
                    <input id="blk" type="checkbox" name="stats" value='5' onChange={this.props.change} checked={this.props.stats[5]}></input>
                    BLK
                </label>
                <label for="to">
                    <input id="to" type="checkbox" name="stats" value='6' onChange={this.props.change} checked={this.props.stats[6]}></input>
                    TO
                </label>
            </div>
        )
    }
}

export default Stats
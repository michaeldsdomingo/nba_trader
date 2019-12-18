import React, { Component } from 'react';
// import '../App.js/index.js';
import '../Style/style.css';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class Stats extends Component {
    constructor(props) {
        super(props);
        // 3PM, PTS, REB, AST, ST, BLK, TO, FG, FT
        this.state = {
            punt: "FT"
        }
    }

    puntString = () => {
        let statsNames = ["3PM ", "PTS ", "REB ", "AST ", "ST ", "BLK ", "TO ", "FG ", "FT "]
        let puntName = "";
        this.props.stats.forEach( (element, index) => {
            if (element == false) {
                puntName += statsNames[index]
            }
        });
        return puntName;
    }


    render() {
        return (
            <div id='stats'>
                <h1>Punting: {this.puntString()}</h1>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={this.props.stats[7]}
                                onChange={this.props.change}
                                value="7"
                                color="primary"
                            />
                        }
                        label="FG"
                    />
                    
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={this.props.stats[8]}
                                onChange={this.props.change}
                                value="8"
                                color="primary"
                            />
                        }
                        label="FT"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={this.props.stats[0]}
                                onChange={this.props.change}
                                value="0"
                                color="primary"
                            />
                        }
                        label="3PM"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={this.props.stats[1]}
                                onChange={this.props.change}
                                value="1"
                                color="primary"
                            />
                        }
                        label="PTS"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={this.props.stats[2]}
                                onChange={this.props.change}
                                value="2"
                                color="primary"
                            />
                        }
                        label="REB"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={this.props.stats[3]}
                                onChange={this.props.change}
                                value="3"
                                color="primary"
                            />
                        }
                        label="AST"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={this.props.stats[4]}
                                onChange={this.props.change}
                                value="4"
                                color="primary"
                            />
                        }
                        label="STL"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={this.props.stats[5]}
                                onChange={this.props.change}
                                value="5"
                                color="primary"
                            />
                        }
                        label="BLK"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={this.props.stats[6]}
                                onChange={this.props.change}
                                value="6"
                                color="primary"
                            />
                        }
                        label="TO"
                    />
                </FormGroup>
                
            </div>
        )
    }
}

export default Stats
import React, { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';

export default class Table extends Component {

    constructor() {
        super() 

        this.state = {
            accessToken: '',
            stats: [true, true, true, true, true, true, true, true, true],
            data: [],
            products: [{
                id: '',
                name: "",
                'fgm/fga': '',
                'fg%': '',
                'ftm/fta': '',
                'ft%': '',
                '3pm': '',
                'pts': '',
                'reb': '',
                'ast': '',
                'st': '',
                'blk': '',
                'to': ''
            }],
            columns: [
                {
                dataField: 'id',
                text: 'ID'
                }, 
                {
                dataField: 'name',
                text: 'Name'
                }, 
                {
                dataField: 'fg%',
                text: 'FG%'
                }, 
                {
                dataField: 'ft%',
                text: 'FT%'
                }, 
                {
                dataField: '3pm',
                text: '3PM'
                }, 
                {
                dataField: 'pts',
                text: 'PTS'
                }, 
                {
                dataField: 'reb',
                text: 'REB'
                }, 
                {
                dataField: 'ast',
                text: 'AST'
                }, 
                {
                dataField: 'st',
                text: 'ST'
                }, 
                {
                dataField: 'blk',
                text: 'BLK'
                }, {
                dataField: 'to',
                text: 'TO'
                }
            ]
      
          }
    }

    dataToTable = () => {
        this.props.data.forEach(element => {
            let obj = {
                name: this.props.data.name._text
                
            }
        });
    }

    render() {
        return(
            <div>
                <BootstrapTable striped keyField='id' data={this.state.products} columns={this.state.columns}/>
            </div>
        )
    }
}
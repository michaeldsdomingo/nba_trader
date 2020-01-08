// client/src/App.js
// Main front end react app

import React, { Component } from "react";
import '../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Stats from './Components/Stats.js'
import Navbar from './Components/Navbar.js';
import Draft from './Components/Draft';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import How from './Components/How.js';

require('dotenv').config();

const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: '',
      stats: [true, true, true, true, true, true, true, true, false],
      data: [],
      products: [{
          // id: '',
          name: "",
          price: ''
      }],
      columns: [
      {
        dataField: 'name',
        text: 'Name',
        sort: true
      }, {
        dataField: 'points',
        text: 'Points'
      }, {
        dataField: 'true-points',
        text: 'True Points'
      }],
      test: '',
      session: '',


    }
  }

  // Changes the checked or unchecked value of the checkbox
  checkBox = (event) => {
    let arr = this.state.stats;
    if (arr[event.target.value] == true) {
      arr[event.target.value] = false
    }
    else {
      arr[event.target.value] = true
    }
    this.setState({
      stats: arr
    })
    
  }

  // Makes a get request to the Yahoo API to get all player's stats in the league
  getAllTakenPlayersStats = () => {
    axios.post('/yahoo/players', 
      {
        accessToken: this.state.accessToken,
        stats: this.state.stats
      })
          .then(res => {
            this.stateSetter(res.data)
          })
          .catch(err => {
            console.log(err)
          })

  } 

  stateSetter = (info) => {
    let arr = info;

    let columns = [
    //   {
    //   dataField: 'id',
    //   text: 'ID',
    //   sort: true
    // },
    {
      dataField: 'name',
      text: 'Name', 
      sort: false
    }, {
      dataField: 'points',
      text: 'Points',
      sort: true,
      sortFunc: (a, b, order, dataField, rowA, rowB) => {
        
        if (order === 'desc') {
          return a - b;
        }
        return b - a; // desc
      }
    }, {
      dataField: 'truePoints',
      text: 'True Points',
      sort: true,
      sortFunc: (a, b, order, dataField, rowA, rowB) => {
        
        if (order === 'desc') {
          return a - b;
        }
        return b - a; // desc
      }
    }];

    let products = [];

    for(let i = 0; i < arr.length; i++) {
      let obj = {
        // id: i,
        name:  
          <div className="tableImgName">
            {
              arr[i]["0"].length == 17 ? 
              <img src={arr[i]["0"][9].image_url}/> : 
              <img src={arr[i]["0"][10].image_url}/>
            }
              
            <span className="tableName">{arr[i][0][2]['name']['full']}</span>
          </div>,
        points: arr[i][1]['player_stats']['stats'][17]['stat']['value'].toFixed(2),
        truePoints: arr[i][1]['player_stats']['stats'][18]['stat']['value'].toFixed(2)
      }
      products.push(obj);
    }

    this.setState({
      data: arr,
      columns,
      products
    })
  }
  
  getDefaultPlayers = () => {
    axios.get('/firebase/players/default')
      .then( res => {
        console.log('firebase default success')
        console.log(res.data)
        this.stateSetter(res.data)
      })
      .catch( err => {
        console.log('firebase default not success')
      })
  }

  checkLoggedInStatus = () => {
    axios.get('/oauth/checkLoggedInStatus').then(response => {
      let { user } = response.data;
      if (user) {
        this.setState({
          session: user
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }

  logout = () => {
    console.log('attempt to logout')
    axios.get('/oauth/logout').then(response => {
        console.log(response)
        this.setState({
          session: response.data.session
        })
    }).catch(error => {

    })
  }

  componentDidMount() {
    this.getDefaultPlayers();
    this.checkLoggedInStatus();
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar session={this.state.session} logout={this.logout}/>

          <How />
  
          <Stats change={this.checkBox} stats={this.state.stats} session={this.state.session} getStats={this.getAllTakenPlayersStats} editTable={this.editTable}/>
          
          
          <div id='table'>
            <BootstrapTable  striped={true} bordered="true" hover="true" keyField='id' data={ this.state.products } columns={ this.state.columns }  />
          </div>


          <Route path='/draft' component={Draft} />
        </Router>
      
      </div>
    )
  }
}

export default App;
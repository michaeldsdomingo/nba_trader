// client/src/App.js
// Main front end react app

import React, { Component } from "react";
import '../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import BootstrapTable from 'react-bootstrap-table-next';
import calcRankings from './functions';
import Stats from './Components/Stats.js'
import Navbar from './Components/Navbar.js';
import Draft from './Components/Draft';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";


const axios = require('axios');
const proxyURL = 'https://cors-anywhere.herokuapp.com/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: '',
      stats: [true, true, true, true, true, true, true, true, true],
      data: [],
      products: [{
          id: '',
          name: "",
          price: ''
      }],
      columns: [{
        dataField: 'id',
        text: 'ID',
        
      }, {
        dataField: 'name',
        text: 'Name',
        sort: true
      }, {
        dataField: 'points',
        text: 'Points'
      }, {
        dataField: 'true-points',
        text: 'True Points'
      }]

    }

    
    this.getToken = this.getToken.bind(this);
    this.login = this.login.bind(this);
    this.getTeamStats = this.getTeamStats.bind(this);
    this.getAllTakenPlayersStats = this.getAllTakenPlayersStats.bind(this);
    this.displayTakenStats = this.displayTakenStats.bind(this);
    this.checkBoxTest = this.checkBoxTest.bind(this);
  }

  // Changes the checked or unchecked value of the checkbox
  checkBoxTest(event) {
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

  
  // Get request to server's side /oauth/token to retrieve the accessToken
  getToken() {
    axios({
      url: '/oauth/token',
      method: 'get',
    })
    .then(response => {
      this.setState({
        accessToken: response.data.accessToken
      })
      
    })
    .catch(error => {
      console.log(error);
    })
  }

  // Creates a get request to client'sides /oauth/login to logiin to Yahoo
  login() {
    axios({
      url: '/oauth/login',
      method: 'get',
    }).then(response => {
      console.log('success');
      
    }).catch(error => {
      console.log('unsuccess');
    })
  }

  // Makes a get request to retrieve player stats on one manager's team
  getTeamStats() {
    axios({
      //proxy url
      url: proxyURL + 'https://fantasysports.yahooapis.com/fantasy/v2/team/nba.l.187759.t.7/players/stats;type=lastweek?format=json',
      method: 'get',
      withCredentials: false,
      headers: {
        'Authorization': 'Bearer ' + this.state.accessToken,
        
      },
      
    }).then(response => {
      //response.data['fantasy_content']['team'][1]['players']['4']['player'][0][2]['name']['full']
      
      let columns = [{
        dataField: 'id',
        text: 'ID'
      }, {
        dataField: 'name',
        text: 'Name'
      }, {
        dataField: 'fgm/fga',
        text: 'FGM/FGA'
      }, {
        dataField: 'fg%',
        text: 'FG%'
      }, {
        dataField: 'ftm/fta',
        text: 'FTM/FTA'
      }, {
        dataField: 'ft%',
        text: 'FT%'
      }, {
        dataField: '3pm',
        text: '3PM'
      }, {
        dataField: 'pts',
        text: 'PTS'
      }, {
        dataField: 'reb',
        text: 'REB'
      }, {
        dataField: 'ast',
        text: 'AST'
      }, {
        dataField: 'st',
        text: 'ST'
      }, {
        dataField: 'blk',
        text: 'BLK'
      }, {
        dataField: 'to',
        text: 'TO'
      }]
      

      let products = [];
      for(let i=0; i < 11; i++) {
        let obj = {
          id: i,
          name: response.data['fantasy_content']['team'][1]['players'][i]['player'][0][2]['name']['full'],
          'fgm/fga': response.data['fantasy_content']['team'][1]['players'][i]['player'][1]['player_stats']['stats'][0]['stat']['value'],
          'fg%': response.data['fantasy_content']['team'][1]['players'][i]['player'][1]['player_stats']['stats'][1]['stat']['value'],
          'ftm/fta': response.data['fantasy_content']['team'][1]['players'][i]['player'][1]['player_stats']['stats'][2]['stat']['value'],
          'ft%': response.data['fantasy_content']['team'][1]['players'][i]['player'][1]['player_stats']['stats'][3]['stat']['value'],
          '3pm': response.data['fantasy_content']['team'][1]['players'][i]['player'][1]['player_stats']['stats'][4]['stat']['value'],
          pts: response.data['fantasy_content']['team'][1]['players'][i]['player'][1]['player_stats']['stats'][5]['stat']['value'],
          reb: response.data['fantasy_content']['team'][1]['players'][i]['player'][1]['player_stats']['stats'][6]['stat']['value'],
          ast: response.data['fantasy_content']['team'][1]['players'][i]['player'][1]['player_stats']['stats'][7]['stat']['value'],
          st: response.data['fantasy_content']['team'][1]['players'][i]['player'][1]['player_stats']['stats'][8]['stat']['value'],
          blk: response.data['fantasy_content']['team'][1]['players'][i]['player'][1]['player_stats']['stats'][9]['stat']['value'],
          to: response.data['fantasy_content']['team'][1]['players'][i]['player'][1]['player_stats']['stats'][10]['stat']['value']
        };

        products.push(obj);
      }
      
      this.setState({
        data: (response.data['fantasy_content']['team']),
        products,
        columns
      })

    }).catch(error => {
      console.log(error)
    })
  }

  // Makes a get request to the Yahoo API to get all player's stats in the league
  getAllTakenPlayersStats() {
    var startNum = 1;
    let cont = true;
    let data = [];
    
    let stateSetter = (info) => {
      let arr = [];
      info.forEach(function(entry) {
        for(let i = 0; i < entry['count']; i++) {
          arr.push(entry[i]);
        }
      })
      console.log("array before calc rankings")
      console.log(arr);
      calcRankings(arr, this.state.stats);
      // console.log("array after calculate rankings")
      // console.log(arr);

      let columns = [{
        dataField: 'id',
        text: 'ID',
        sort: true
      }, {
        dataField: 'name',
        text: 'Name', 
        sort: true
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
          id: i,
          name: arr[i]["player"][0][2]['name']['full'],
          points: arr[i]['player'][1]['player_stats']['stats'][17]['stat']['value'].toFixed(2),
          truePoints: arr[i]['player'][1]['player_stats']['stats'][18]['stat']['value'].toFixed(2)
        }
        products.push(obj);
      }

      this.setState({
        data: arr,
        columns,
        products
      })

      

    }

    axios.post('/getPlayers', {
      accessToken: this.state.accessToken
    })
    .then( (response) => {
      console.log(response);
    })
    .catch( (error) => {
      console.log(error)
    })

    // let funcAxios = (start) => {
    //   return axios({
    //     //proxy url
    //     url: 'https://fantasysports.yahooapis.com/fantasy/v2/league/nba.l.187759/players;status=T;start=' + start + '/stats?format=json',
    //     method: 'get',
    //     withCredentials: false,
    //     headers: {
    //       'Authorization': 'Bearer ' + this.state.accessToken,
          
    //     }
        
    //   })
    // }
    // let funcThen = (val) => {
      
      
    //   return function(response) {
        
        
    //     if (response.data['fantasy_content']['league'][1]['players']['count'] != undefined) {
                   
    //       data = data.concat(response.data['fantasy_content']['league'][1]['players'])
          

          
    //       funcAxios(val + 25).then(funcThen(val + 25));
          
    //     }
    //     else {
    //       stateSetter(data);
          
    //     }
    //   }
      
    // };
    // let funcError = (error) => {
    //   console.log(error);
    //   cont = false
    // }

    // // Chains get request to obtain all players
    // funcAxios(1).then(funcThen(1)).catch( error => {
    //   console.log(error);
    // });
    
    

  } 
  
  displayTakenStats() {
    console.log(this.state.data[0][0]['player'][0][2]['name']['full']);
  }

  test = () => {
    axios.get('/oauth/test')
    .then( res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleRedirect = () => {
    axios.get('/oauth/redirect')
      .then( res => {
        console.log('success', res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }

  handlePlayer = () => {
    axios.post('/player', {accessToken: this.state.accessToken})
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  firebaseTest = () => {
    axios.get('/firebase/test')
      .then(res => {
        console.log(' firebase successful')
      })
      .catch(res => {
        console.log('firebase unsuccessful')
      })
  }

  render() {
    var products = [
      {
        id: 1,
        name: "Product1",
        price: 120
      }, 
      {
        id: 2,
        name: "Product2",
        price: 80
      }
    ];

    
    return (
      <div>
        <Router>
          <Navbar />
          <br/>
          <button onClick={this.firebaseTest}>Firebase</button>
          <button onClick={this.handlePlayer}>Player1</button>
          <button onClick={this.handleRedirect}>Redirect4</button>
          <button onClick={this.getToken}>Access Token</button>
          <p >{this.state.accessToken}</p>
          <button onClick={this.getAllTakenPlayersStats}>Get Stats</button>
          <br></br>
          <br></br>
          <Stats change={this.checkBoxTest} stats={this.state.stats}/>

          <div id='table'>
            <BootstrapTable  striped keyField='id' data={ this.state.products } columns={ this.state.columns }  />
          </div>
          <button onClick={this.test}>Test</button>

          <Route path='/draft' component={Draft} />
        </Router>
        
        
        
      </div>
    )
  }
}

export default App;
// client/src/App.js
// Main front end react app

import React, { Component } from "react";
import '../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import calcRankings from './functions';
import Stats from './Components/Stats.js'
import Navbar from './Components/Navbar.js';
import Draft from './Components/Draft';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Test from './images/Test.png';
import How from './Components/How.js';

require('dotenv').config();

const axios = require('axios');
const proxyURL = 'https://cors-anywhere.herokuapp.com/';

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
    var startNum = 1;
    let cont = true;
    let data = [];
    
    axios.post('/yahoo/players', 
      {
        accessToken: this.state.accessToken,
        stats: this.state.stats
      })
          .then(res => {
            console.log(res.data)
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
  
  yahooTest = () => {
    console.log(process.env.REACT_APP_LOGIN_URL)
    axios.get('/yahoo/test').then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  newfirebase = () => {
    axios.get('/firebase/test').then(res => {
      console.log('new fb success')
    }).catch(err => {
      console.log(err)
    })
  }

  session1 = () => {
    axios.get('/oauth/session1').then(res => {
      console.log('session succ')
    }).catch(err => {
      console.log(err)
    })
  }

  session2 = () => {
    axios.get('/session2').then(res => {
      console.log('session succ')
    }).catch(err => {
      console.log(err)
    })
  }

  checkSession = () => {
    axios.get('/checkSession').then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  checkSessionOauth = () => {
    axios.get('oauth/checkSession').then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
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

  changeTest = () => {
    if (this.state.test) {
      console.log(this.state.test)
    }
    else console.log('false')
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
          <p>{this.state.test}</p>
          <button onClick={this.changeTest}>change test</button>
          <Stats change={this.checkBox} stats={this.state.stats}/>
          <button onClick={this.getAllTakenPlayersStats}>Get Stats</button>
          <button onClick={this.yahooTest}>test</button>
          <button onClick={this.newfirebase}>new firebase</button>
          <button onClick={this.session1}>session 1</button>
          <button onClick={this.session2}>session 2</button>
          <button onClick={this.checkSession}>check session</button>
          <button onClick={this.checkSessionOauth}>check session in Oauth</button>

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
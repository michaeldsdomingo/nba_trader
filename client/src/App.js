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
import quickSort from './js/sort';


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
      session: '',
      neighbors: [],
      netTruePointArray: [],

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
    let rows = document.getElementsByTagName('tr')
    this.undoAnimation(rows)
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
      sort: false,
      sortFunc: (a, b, order, dataField, rowA, rowB) => {
        
        if (order === 'desc') {
          return a - b;
        }
        return b - a; // desc
      }
    }, {
      dataField: 'truePoints',
      text: 'True Points',
      sort: false,
      sortFunc: (a, b, order, dataField, rowA, rowB) => {
        
        if (order === 'desc') {
          return a - b;
        }
        return b - a; // desc
      }
    }];

    let products = [];

    for(let i = 0; i < arr.length; i++) {

      let playerStats = arr[i][1]['player_stats']['stats']
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
        points: playerStats[17]['stat']['value'].toFixed(2),
        truePoints: 
                    <div>
                      {
                        playerStats[19] ? 
                        <div>
                          <span>{playerStats[18]['stat']['value'].toFixed(2)} </span>
                          <span>{playerStats[19]['stat']['value']} </span>
                        </div>
                        :
                        <div className="flex-table">
                          <span>{playerStats[18]['stat']['value'].toFixed(2)}</span>
                        </div>
                        
                      }
                      
                    </div>
                      
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
    let rows = document.getElementsByTagName('tr')
    this.undoAnimation(rows)
    axios.get('/firebase/players/default')
      .then( res => {
        console.log('firebase default success')
        
        this.stateSetter(quickSort(res.data, 0, res.data.length - 1).reverse())
        // this.stateSetter(res.data)
        // console.log(res.data)
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

  editTable = () => {
    let rows = document.getElementsByTagName('tr')
    this.undoAnimation(rows)
    axios.post('/yahoo/editDefault', {
      data: this.state.data,
      stats: this.state.stats
    }).then( response => {
      console.log(response.data)
      this.stateSetter(response.data)
    }).catch( err => {

    })
  }

  rowClick = (e, row, rowIndex) => {
    let rows = document.getElementsByTagName('tr')
    let neighbors = []
    let table = document.getElementById('table')
    console.log(rowIndex)
    table.classList.add('unclickable')
    setTimeout( () => {
      table.classList.remove('unclickable')
    }, this.state.neighbors.length * 50 * 2)
    this.undoAnimation(rows);

    // this.state.neighbors.forEach( (x) => {
    //   rows[x].classList.remove('bgRed')
    //   rows[x].classList.remove('bgGreen')
    // })
    
    for(let i = 0; i < rows.length; i++) {
      if (i > rowIndex - 3 && i < rowIndex + 5) {
        if (i != 0) {
          neighbors.push(i)
          // rows[i].classList.add('bgRed')
        }
        // if ( i == rowIndex ) {
        //   rows[rowIndex + 1].classList.add('bgGreen')
        // }
      }
      else {
        // rows[i].classList.remove('bgRed')
        // rows[i].classList.remove('bgGreen')
      }

      
    }
    this.setState({neighbors})
    
    // console.log(neighbors, this.state.neighbors, rowIndex)
    this.animate(rowIndex, rows, neighbors)
  }

  animate = (rowIndex, rows, neighbors) => {
    // console.log(this.state.neighbors, rowIndex)
    //Use array by reference instead of state because state hasn't been updated.
    
    let data = [...this.state.data]
    let selectedTruePoint = data[rowIndex][1].player_stats.stats[18].stat.value.toFixed(2)
    let netTruePointArray = [];

    neighbors.forEach( (i, index) => {

        // console.log('animate', index, i)
        let trueColumn = rows[i].children[2].children[0].children[0]
        if (i != 0) {
          
          // rows[i].classList.add('bgRed')
          netTruePointArray.push({
            index: i,
            net: (data[i - 1][1].player_stats.stats[18].stat.value.toFixed(2) - selectedTruePoint).toFixed(2),
          })
          data[i - 1][1].player_stats.stats.push({
            stat: {
              value: (data[i - 1][1].player_stats.stats[18].stat.value - selectedTruePoint).toFixed(2), 
              stat_id: 28
            }
          })
          
        }
        
        setTimeout( () => {
          // console.log(rows[i].children[2].children[0].children[0])
          let netNode = document.createElement('div')
          let netText = document.createTextNode(Math.abs(netTruePointArray[index].net))
          let {net} = netTruePointArray[index]
          netNode.setAttribute('class', 'ml-4 bold500')
          let arrowNode = document.createElement('i')

          if (Number(net) > 0) {
            arrowNode.setAttribute('class', 'fas fa-angle-double-up colorGreen mr-2')
            netNode.classList.add('colorGreen')
          }
          else if (Number(net) < 0) {
            arrowNode.setAttribute('class', 'fas fa-angle-double-down colorRed mr-2')
            netNode.classList.add('colorRed')
          }
          
          if(Number(net) != 0) {
            netNode.appendChild(arrowNode)
            netNode.appendChild(netText)
            trueColumn.appendChild(netNode)
          }

          if ( i == rowIndex + 1) {
            rows[rowIndex + 1].classList.add('selectedBorder')
            
          }
          

          // console.log('hell')
        }, 50 * index + this.state.neighbors.length * 50)


      
    })

    // console.log(netTruePointArray)
    this.setState({netTruePointArray})
    
  }

  undoAnimation = (rows) => {
    let data = [...this.state.data]
    let neighborsReverse = [...this.state.neighbors].reverse();
    // console.log('neighbors reverse', neighborsReverse)
    neighborsReverse.forEach( (i, index ) => {
      let trueColumn = rows[i].children[2].children[0].children[0]
      setTimeout( () => {
        // console.log('undo', index)
        // data[i - 1][1].player_stats.stats.pop()
        if (trueColumn.childNodes[1]) {
          trueColumn.removeChild(trueColumn.childNodes[1])
        }
        
        rows[i].classList.remove('bgRed')
        rows[i].classList.remove('selectedBorder')
        // this.stateSetter(data)
      }, 50 * index)
    })
  }

  updateProducts = () => {

  }

  componentDidMount() {
    this.getDefaultPlayers();
    this.checkLoggedInStatus();
    // this.rowClick(null, null, 0)
    
  }

  

  render() {
    return (
      <div>
        <Router>
          <Navbar session={this.state.session} logout={this.logout}/>

          <How />
          
          <Stats change={this.checkBox} stats={this.state.stats} session={this.state.session} getStats={this.getAllTakenPlayersStats} editTable={this.editTable}  />

          <div id='table'>
            <BootstrapTable
              striped={true} 
              bordered="true" 
              hover="true" 
              keyField='id' 
              data={ this.state.products } 
              columns={ this.state.columns } 
              // defaultSorted={[{dataField: 'points', order: 'desc'}]} 
              rowEvents={{onClick: this.rowClick}}
              />
          </div>
          


          <Route path='/draft' component={Draft} />
        </Router>
      
      </div>
    )
  }
}

export default App;
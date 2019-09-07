(window.webpackJsonpclient=window.webpackJsonpclient||[]).push([[0],{120:function(t,e,a){"use strict";a.r(e);var n=a(0),s=a.n(n),l=a(18),c=a.n(l),o=a(11),r=a(12),i=a(15),p=a(13),h=a(7),u=a(14),d=(a(54),a(45)),m=a.n(d),y=(a(119),a(36),function(t){function e(){return Object(o.a)(this,e),Object(i.a)(this,Object(p.a)(e).apply(this,arguments))}return Object(u.a)(e,t),Object(r.a)(e,[{key:"render",value:function(){return s.a.createElement("div",{id:"stats"},s.a.createElement("label",{for:"fg"},s.a.createElement("input",{id:"fg",type:"checkbox",name:"stats",value:"7",onChange:this.props.change,checked:this.props.stats[7]}),"FG"),s.a.createElement("label",{for:"ft"},s.a.createElement("input",{id:"ft",type:"checkbox",name:"stats",value:"8",onChange:this.props.change,checked:this.props.stats[8]}),"FT"),s.a.createElement("label",{for:"3pm"},s.a.createElement("input",{id:"3pm",type:"checkbox",name:"stats",value:"0",onChange:this.props.change,checked:this.props.stats[0]}),"3PM"),s.a.createElement("label",{for:"pts"},s.a.createElement("input",{id:"pts",type:"checkbox",name:"stats",value:"1",onChange:this.props.change,checked:this.props.stats[1]}),"PTS"),s.a.createElement("label",{for:"reb"},s.a.createElement("input",{id:"reb",type:"checkbox",name:"stats",value:"2",onChange:this.props.change,checked:this.props.stats[2]}),"REB"),s.a.createElement("label",{for:"ast"},s.a.createElement("input",{id:"ast",type:"checkbox",name:"stats",value:"3",onChange:this.props.change,checked:this.props.stats[3]}),"AST"),s.a.createElement("label",{for:"st"},s.a.createElement("input",{id:"st",type:"checkbox",name:"stats",value:"4",onChange:this.props.change,checked:this.props.stats[4]}),"ST"),s.a.createElement("label",{for:"blk"},s.a.createElement("input",{id:"blk",type:"checkbox",name:"stats",value:"5",onChange:this.props.change,checked:this.props.stats[5]}),"BLK"),s.a.createElement("label",{for:"to"},s.a.createElement("input",{id:"to",type:"checkbox",name:"stats",value:"6",onChange:this.props.change,checked:this.props.stats[6]}),"TO"))}}]),e}(n.Component)),f=a(22),g=a.n(f),b=function(t){function e(){var t,a;Object(o.a)(this,e);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(a=Object(i.a)(this,(t=Object(p.a)(e)).call.apply(t,[this].concat(s)))).hello=function(){console.log("hello world"),g.a.get("https://nbatrader.michaeldomingo.dev/hello").then(function(t){console.log(t)}).catch(function(t){console.log(t)})},a}return Object(u.a)(e,t),Object(r.a)(e,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("ul",null,s.a.createElement("li",{id:"title"},"Smart Trader"),s.a.createElement("li",{class:"align-right",id:"login"},s.a.createElement("a",{href:"oauth/login"},s.a.createElement("img",{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYFaha-tCBSlfeFgNC14bGCcFxUutaA2SEq4EX2YrAO3k5KwBl",className:"yahoo-image"}),"Login"),s.a.createElement("a",{onClick:this.hello},"Hello"))),s.a.createElement("br",null),s.a.createElement("br",null))}}]),e}(n.Component),k=a(22),v=function(t){function e(t){var a;return Object(o.a)(this,e),(a=Object(i.a)(this,Object(p.a)(e).call(this,t))).state={accessToken:"",stats:[!0,!0,!0,!0,!0,!0,!0,!0,!0],data:[],products:[{id:"",name:"",price:""}],columns:[{dataField:"id",text:"ID"},{dataField:"name",text:"Name",sort:!0},{dataField:"points",text:"Points"},{dataField:"true-points",text:"True Points"}]},a.getToken=a.getToken.bind(Object(h.a)(a)),a.login=a.login.bind(Object(h.a)(a)),a.getTeamStats=a.getTeamStats.bind(Object(h.a)(a)),a.getAllTakenPlayersStats=a.getAllTakenPlayersStats.bind(Object(h.a)(a)),a.displayTakenStats=a.displayTakenStats.bind(Object(h.a)(a)),a.checkBoxTest=a.checkBoxTest.bind(Object(h.a)(a)),a}return Object(u.a)(e,t),Object(r.a)(e,[{key:"checkBoxTest",value:function(t){var e=this.state.stats;1==e[t.target.value]?e[t.target.value]=!1:e[t.target.value]=!0,this.setState({stats:e})}},{key:"getToken",value:function(){var t=this;k({url:"/oauth/token",method:"get"}).then(function(e){t.setState({accessToken:e.data.accessToken})}).catch(function(t){console.log("error")})}},{key:"login",value:function(){k({url:"/oauth/login",method:"get"}).then(function(t){console.log("success")}).catch(function(t){console.log("unsuccess")})}},{key:"getTeamStats",value:function(){var t=this;k({url:"https://cors-anywhere.herokuapp.com/https://fantasysports.yahooapis.com/fantasy/v2/team/nba.l.187759.t.7/players/stats;type=lastweek?format=json",method:"get",withCredentials:!1,headers:{Authorization:"Bearer "+this.state.accessToken}}).then(function(e){for(var a=[],n=0;n<11;n++){var s={id:n,name:e.data.fantasy_content.team[1].players[n].player[0][2].name.full,"fgm/fga":e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[0].stat.value,"fg%":e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[1].stat.value,"ftm/fta":e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[2].stat.value,"ft%":e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[3].stat.value,"3pm":e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[4].stat.value,pts:e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[5].stat.value,reb:e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[6].stat.value,ast:e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[7].stat.value,st:e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[8].stat.value,blk:e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[9].stat.value,to:e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[10].stat.value};a.push(s)}t.setState({data:e.data.fantasy_content.team,products:a,columns:[{dataField:"id",text:"ID"},{dataField:"name",text:"Name"},{dataField:"fgm/fga",text:"FGM/FGA"},{dataField:"fg%",text:"FG%"},{dataField:"ftm/fta",text:"FTM/FTA"},{dataField:"ft%",text:"FT%"},{dataField:"3pm",text:"3PM"},{dataField:"pts",text:"PTS"},{dataField:"reb",text:"REB"},{dataField:"ast",text:"AST"},{dataField:"st",text:"ST"},{dataField:"blk",text:"BLK"},{dataField:"to",text:"TO"}]})}).catch(function(t){console.log(t)})}},{key:"getAllTakenPlayersStats",value:function(){k.post("/getPlayers",{accessToken:this.state.accessToken}).then(function(t){console.log(t)}).catch(function(t){console.log(t)})}},{key:"displayTakenStats",value:function(){console.log(this.state.data[0][0].player[0][2].name.full)}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(b,null),s.a.createElement("br",null),s.a.createElement("button",{onClick:this.getToken},"Access Token"),s.a.createElement("p",null,this.state.accessToken),s.a.createElement("button",{onClick:this.getAllTakenPlayersStats},"Get Stats"),s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement(y,{change:this.checkBoxTest,stats:this.state.stats}),s.a.createElement("div",{id:"table"},s.a.createElement(m.a,{striped:!0,keyField:"id",data:this.state.products,columns:this.state.columns})))}}]),e}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(118);c.a.render(s.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},36:function(t,e,a){},49:function(t,e,a){t.exports=a(120)}},[[49,1,2]]]);
//# sourceMappingURL=main.c9123ec2.chunk.js.map
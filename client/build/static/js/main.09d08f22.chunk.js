(window.webpackJsonpclient=window.webpackJsonpclient||[]).push([[0],{135:function(t,e,a){"use strict";a.r(e);var n=a(0),s=a.n(n),l=a(25),c=a.n(l),o=a(11),r=a(12),i=a(14),d=a(13),u=a(16),h=a(15),p=(a(67),a(26)),m=a.n(p),f=(a(134),a(47),function(t){function e(){return Object(o.a)(this,e),Object(i.a)(this,Object(d.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(r.a)(e,[{key:"render",value:function(){return s.a.createElement("div",{id:"stats"},s.a.createElement("label",{for:"fg"},s.a.createElement("input",{id:"fg",type:"checkbox",name:"stats",value:"7",onChange:this.props.change,checked:this.props.stats[7]}),"FG"),s.a.createElement("label",{for:"ft"},s.a.createElement("input",{id:"ft",type:"checkbox",name:"stats",value:"8",onChange:this.props.change,checked:this.props.stats[8]}),"FT"),s.a.createElement("label",{for:"3pm"},s.a.createElement("input",{id:"3pm",type:"checkbox",name:"stats",value:"0",onChange:this.props.change,checked:this.props.stats[0]}),"3PM"),s.a.createElement("label",{for:"pts"},s.a.createElement("input",{id:"pts",type:"checkbox",name:"stats",value:"1",onChange:this.props.change,checked:this.props.stats[1]}),"PTS"),s.a.createElement("label",{for:"reb"},s.a.createElement("input",{id:"reb",type:"checkbox",name:"stats",value:"2",onChange:this.props.change,checked:this.props.stats[2]}),"REB"),s.a.createElement("label",{for:"ast"},s.a.createElement("input",{id:"ast",type:"checkbox",name:"stats",value:"3",onChange:this.props.change,checked:this.props.stats[3]}),"AST"),s.a.createElement("label",{for:"st"},s.a.createElement("input",{id:"st",type:"checkbox",name:"stats",value:"4",onChange:this.props.change,checked:this.props.stats[4]}),"ST"),s.a.createElement("label",{for:"blk"},s.a.createElement("input",{id:"blk",type:"checkbox",name:"stats",value:"5",onChange:this.props.change,checked:this.props.stats[5]}),"BLK"),s.a.createElement("label",{for:"to"},s.a.createElement("input",{id:"to",type:"checkbox",name:"stats",value:"6",onChange:this.props.change,checked:this.props.stats[6]}),"TO"))}}]),e}(n.Component)),y=a(27),g=a(23),b=a.n(g),k=function(t){function e(){var t,a;Object(o.a)(this,e);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(a=Object(i.a)(this,(t=Object(d.a)(e)).call.apply(t,[this].concat(s)))).hello=function(){console.log("hello world"),b.a.get("https://nbatrader.michaeldomingo.dev/hello").then(function(t){console.log(t)}).catch(function(t){console.log(t)})},a}return Object(h.a)(e,t),Object(r.a)(e,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("ul",null,s.a.createElement("li",{id:"title"},"Smart Trader"),s.a.createElement(y.b,{to:"/draft"},"Draft Picker"),s.a.createElement("li",{class:"align-right",id:"login"},s.a.createElement("a",{href:"http://localhost:81/oauth/login"},s.a.createElement("img",{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYFaha-tCBSlfeFgNC14bGCcFxUutaA2SEq4EX2YrAO3k5KwBl",className:"yahoo-image"}),"Login"),s.a.createElement("a",{onClick:this.hello},"Hello"))),s.a.createElement("br",null),s.a.createElement("br",null))}}]),e}(n.Component),v=function(t){function e(){var t;return Object(o.a)(this,e),(t=Object(i.a)(this,Object(d.a)(e).call(this))).dataToTable=function(){t.props.data.forEach(function(e){t.props.data.name._text})},t.state={accessToken:"",stats:[!0,!0,!0,!0,!0,!0,!0,!0,!0],data:[],products:[{id:"",name:"","fgm/fga":"","fg%":"","ftm/fta":"","ft%":"","3pm":"",pts:"",reb:"",ast:"",st:"",blk:"",to:""}],columns:[{dataField:"id",text:"ID"},{dataField:"name",text:"Name"},{dataField:"fg%",text:"FG%"},{dataField:"ft%",text:"FT%"},{dataField:"3pm",text:"3PM"},{dataField:"pts",text:"PTS"},{dataField:"reb",text:"REB"},{dataField:"ast",text:"AST"},{dataField:"st",text:"ST"},{dataField:"blk",text:"BLK"},{dataField:"to",text:"TO"}]},t}return Object(h.a)(e,t),Object(r.a)(e,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(m.a,{striped:!0,keyField:"id",data:this.state.products,columns:this.state.columns}))}}]),e}(n.Component),E=function(t){function e(t){var a;return Object(o.a)(this,e),(a=Object(i.a)(this,Object(d.a)(e).call(this,t))).getProjections=function(){b.a.get("/draft/projections").then(function(t){console.log(t.data.FantasyBasketballNerd.Player),a.setState({data:t.data.FantasyBasketballNerd.Player})}).catch(function(t){console.log(t)})},a.state={data:""},a}return Object(h.a)(e,t),Object(r.a)(e,[{key:"componentDidMount",value:function(){this.getProjections()}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("button",{onClick:this.getProjections},"Get Projections"),"'",s.a.createElement(v,{data:this.state.data}))}}]),e}(n.Component),T=a(17),F=a(23),x=function(t){function e(t){var a;return Object(o.a)(this,e),(a=Object(i.a)(this,Object(d.a)(e).call(this,t))).test=function(){F.get("/oauth/test").then(function(t){console.log(t.data)}).catch(function(t){console.log(t)})},a.handleRedirect=function(){F.get("/oauth/redirect").then(function(t){console.log("success")}).catch(function(t){console.log(t)})},a.state={accessToken:"",stats:[!0,!0,!0,!0,!0,!0,!0,!0,!0],data:[],products:[{id:"",name:"",price:""}],columns:[{dataField:"id",text:"ID"},{dataField:"name",text:"Name",sort:!0},{dataField:"points",text:"Points"},{dataField:"true-points",text:"True Points"}]},a.getToken=a.getToken.bind(Object(u.a)(a)),a.login=a.login.bind(Object(u.a)(a)),a.getTeamStats=a.getTeamStats.bind(Object(u.a)(a)),a.getAllTakenPlayersStats=a.getAllTakenPlayersStats.bind(Object(u.a)(a)),a.displayTakenStats=a.displayTakenStats.bind(Object(u.a)(a)),a.checkBoxTest=a.checkBoxTest.bind(Object(u.a)(a)),a}return Object(h.a)(e,t),Object(r.a)(e,[{key:"checkBoxTest",value:function(t){var e=this.state.stats;1==e[t.target.value]?e[t.target.value]=!1:e[t.target.value]=!0,this.setState({stats:e})}},{key:"getToken",value:function(){var t=this;F({url:"/oauth/token",method:"get"}).then(function(e){t.setState({accessToken:e.data.accessToken})}).catch(function(t){console.log(t)})}},{key:"login",value:function(){F({url:"/oauth/login",method:"get"}).then(function(t){console.log("success")}).catch(function(t){console.log("unsuccess")})}},{key:"getTeamStats",value:function(){var t=this;F({url:"https://cors-anywhere.herokuapp.com/https://fantasysports.yahooapis.com/fantasy/v2/team/nba.l.187759.t.7/players/stats;type=lastweek?format=json",method:"get",withCredentials:!1,headers:{Authorization:"Bearer "+this.state.accessToken}}).then(function(e){for(var a=[],n=0;n<11;n++){var s={id:n,name:e.data.fantasy_content.team[1].players[n].player[0][2].name.full,"fgm/fga":e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[0].stat.value,"fg%":e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[1].stat.value,"ftm/fta":e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[2].stat.value,"ft%":e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[3].stat.value,"3pm":e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[4].stat.value,pts:e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[5].stat.value,reb:e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[6].stat.value,ast:e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[7].stat.value,st:e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[8].stat.value,blk:e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[9].stat.value,to:e.data.fantasy_content.team[1].players[n].player[1].player_stats.stats[10].stat.value};a.push(s)}t.setState({data:e.data.fantasy_content.team,products:a,columns:[{dataField:"id",text:"ID"},{dataField:"name",text:"Name"},{dataField:"fgm/fga",text:"FGM/FGA"},{dataField:"fg%",text:"FG%"},{dataField:"ftm/fta",text:"FTM/FTA"},{dataField:"ft%",text:"FT%"},{dataField:"3pm",text:"3PM"},{dataField:"pts",text:"PTS"},{dataField:"reb",text:"REB"},{dataField:"ast",text:"AST"},{dataField:"st",text:"ST"},{dataField:"blk",text:"BLK"},{dataField:"to",text:"TO"}]})}).catch(function(t){console.log(t)})}},{key:"getAllTakenPlayersStats",value:function(){F.post("/getPlayers",{accessToken:this.state.accessToken}).then(function(t){console.log(t)}).catch(function(t){console.log(t)})}},{key:"displayTakenStats",value:function(){console.log(this.state.data[0][0].player[0][2].name.full)}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(y.a,null,s.a.createElement(k,null),s.a.createElement("br",null),s.a.createElement("button",{onClick:this.handleRedirect},"Redirect"),s.a.createElement("button",{onClick:this.getToken},"Access Token"),s.a.createElement("p",null,this.state.accessToken),s.a.createElement("button",{onClick:this.getAllTakenPlayersStats},"Get Stats"),s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement(f,{change:this.checkBoxTest,stats:this.state.stats}),s.a.createElement("div",{id:"table"},s.a.createElement(m.a,{striped:!0,keyField:"id",data:this.state.products,columns:this.state.columns})),s.a.createElement("button",{onClick:this.test},"Test"),s.a.createElement(T.a,{path:"/draft",component:E})))}}]),e}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(133);c.a.render(s.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},47:function(t,e,a){},62:function(t,e,a){t.exports=a(135)}},[[62,1,2]]]);
//# sourceMappingURL=main.09d08f22.chunk.js.map
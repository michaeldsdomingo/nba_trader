(window.webpackJsonpclient=window.webpackJsonpclient||[]).push([[0],{120:function(t,a,e){"use strict";e.r(a);var s=e(0),n=e.n(s),l=e(18),r=e.n(l),o=e(11),c=e(12),i=e(15),p=e(13),u=e(7),d=e(14),h=(e(54),e(45)),y=e.n(h),m=e(119),f=function(t,a){if(a){var e=t.map(function(t){return t.player[1].player_stats.stats[a].stat.value}),s=m.std(e);return{mean:m.mean(e),stdDev:s}}if(void 0===a){var n=m.std(t);m.mean(t)}},v=function(t,a){for(var e=t.map(function(t){return t.player[1].player_stats.stats[a].stat.value}),s=0;s<e.length;s++)"-"==e[s]&&(e[s]=0);for(var n=t.map(function(t){return t.player[1].player_stats.stats[a+1].stat.value}),l=0;l<n.length;l++)"-"==n[l]&&(n[l]=1);for(var r=m.mean(e)/m.mean(n),o=[],c=0;c<e.length;c++)o.push(e[c]/n[c]);for(var i=o.map(function(t){return t-r}),p=[],u=0;u<i.length;u++)p.push(i[u]*n[u]);return p},g=function(t,a){t.forEach(function(t){for(var a=0;a<11;a++){if(0==a){t.player[1].player_stats.stats.push({stat:{stat_id:20,value:0}}),t.player[1].player_stats.stats.push({stat:{stat_id:21,value:0}});var e=t.player[1].player_stats.stats[a].stat.value.split("/");t.player[1].player_stats.stats.push({stat:{stat_id:22,value:e[0]}}),t.player[1].player_stats.stats.push({stat:{stat_id:23,value:e[1]}})}else if(2==a){var s=t.player[1].player_stats.stats[a].stat.value.split("/");t.player[1].player_stats.stats.push({stat:{stat_id:24,value:s[0]}}),t.player[1].player_stats.stats.push({stat:{stat_id:25,value:s[1]}})}"-"===t.player[1].player_stats.stats[a].stat.value&&(t.player[1].player_stats.stats[a].stat.value="0",console.log("changed for player"+a))}});for(var e=v(t,13),s=v(t,15),n=0;n<t.length;n++)t[n].player[1].player_stats.stats[11].stat.value=e[n],t[n].player[1].player_stats.stats[12].stat.value=s[n];console.log("after impact"),console.log(t);for(var l=[],r=4;r<13;r++){var o=f(t,r),c={stat:r,mean:o.mean,stdDev:o.stdDev};l.push(c)}t.forEach(function(t){for(var e=0,s=0,n=4;n<13;n++){var r=(t.player[1].player_stats.stats[n].stat.value-l[n-4].mean)/l[n-4].stdDev;10!=n?e+=r:e-=r,a[n-4]&&(10!=n?s+=r:s-=r)}t.player[1].player_stats.stats.push({stat:{stat_id:"26",value:e}}),t.player[1].player_stats.stats.push({stat:{stat_id:"27",value:s}})})},b=(e(36),function(t){function a(){return Object(o.a)(this,a),Object(i.a)(this,Object(p.a)(a).apply(this,arguments))}return Object(d.a)(a,t),Object(c.a)(a,[{key:"render",value:function(){return n.a.createElement("div",{id:"stats"},n.a.createElement("label",{for:"fg"},n.a.createElement("input",{id:"fg",type:"checkbox",name:"stats",value:"7",onChange:this.props.change,checked:this.props.stats[7]}),"FG"),n.a.createElement("label",{for:"ft"},n.a.createElement("input",{id:"ft",type:"checkbox",name:"stats",value:"8",onChange:this.props.change,checked:this.props.stats[8]}),"FT"),n.a.createElement("label",{for:"3pm"},n.a.createElement("input",{id:"3pm",type:"checkbox",name:"stats",value:"0",onChange:this.props.change,checked:this.props.stats[0]}),"3PM"),n.a.createElement("label",{for:"pts"},n.a.createElement("input",{id:"pts",type:"checkbox",name:"stats",value:"1",onChange:this.props.change,checked:this.props.stats[1]}),"PTS"),n.a.createElement("label",{for:"reb"},n.a.createElement("input",{id:"reb",type:"checkbox",name:"stats",value:"2",onChange:this.props.change,checked:this.props.stats[2]}),"REB"),n.a.createElement("label",{for:"ast"},n.a.createElement("input",{id:"ast",type:"checkbox",name:"stats",value:"3",onChange:this.props.change,checked:this.props.stats[3]}),"AST"),n.a.createElement("label",{for:"st"},n.a.createElement("input",{id:"st",type:"checkbox",name:"stats",value:"4",onChange:this.props.change,checked:this.props.stats[4]}),"ST"),n.a.createElement("label",{for:"blk"},n.a.createElement("input",{id:"blk",type:"checkbox",name:"stats",value:"5",onChange:this.props.change,checked:this.props.stats[5]}),"BLK"),n.a.createElement("label",{for:"to"},n.a.createElement("input",{id:"to",type:"checkbox",name:"stats",value:"6",onChange:this.props.change,checked:this.props.stats[6]}),"TO"))}}]),a}(s.Component)),k=e(22),_=e.n(k),E=function(t){function a(){var t,e;Object(o.a)(this,a);for(var s=arguments.length,n=new Array(s),l=0;l<s;l++)n[l]=arguments[l];return(e=Object(i.a)(this,(t=Object(p.a)(a)).call.apply(t,[this].concat(n)))).hello=function(){console.log("hello world"),_.a.get("/hello").then(function(t){console.log(t)})},e}return Object(d.a)(a,t),Object(c.a)(a,[{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement("ul",null,n.a.createElement("li",{id:"title"},"Smart Trader"),n.a.createElement("li",{class:"align-right",id:"login"},n.a.createElement("a",{href:"oauth/login"},n.a.createElement("img",{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYFaha-tCBSlfeFgNC14bGCcFxUutaA2SEq4EX2YrAO3k5KwBl",className:"yahoo-image"}),"Login"),n.a.createElement("a",{onClick:this.hello},"Hello"))),n.a.createElement("br",null),n.a.createElement("br",null))}}]),a}(s.Component),T=e(22),x="https://cors-anywhere.herokuapp.com/",F=function(t){function a(t){var e;return Object(o.a)(this,a),(e=Object(i.a)(this,Object(p.a)(a).call(this,t))).state={accessToken:"",stats:[!0,!0,!0,!0,!0,!0,!0,!0,!0],data:[],products:[{id:"",name:"",price:""}],columns:[{dataField:"id",text:"ID"},{dataField:"name",text:"Name",sort:!0},{dataField:"points",text:"Points"},{dataField:"true-points",text:"True Points"}]},e.getToken=e.getToken.bind(Object(u.a)(e)),e.login=e.login.bind(Object(u.a)(e)),e.getTeamStats=e.getTeamStats.bind(Object(u.a)(e)),e.getAllTakenPlayersStats=e.getAllTakenPlayersStats.bind(Object(u.a)(e)),e.displayTakenStats=e.displayTakenStats.bind(Object(u.a)(e)),e.checkBoxTest=e.checkBoxTest.bind(Object(u.a)(e)),e}return Object(d.a)(a,t),Object(c.a)(a,[{key:"checkBoxTest",value:function(t){var a=this.state.stats;1==a[t.target.value]?a[t.target.value]=!1:a[t.target.value]=!0,this.setState({stats:a})}},{key:"getToken",value:function(){var t=this;T({url:"/oauth/token",method:"get"}).then(function(a){t.setState({accessToken:a.data.accessToken})}).catch(function(t){console.log("error")})}},{key:"login",value:function(){T({url:"/oauth/login",method:"get"}).then(function(t){console.log("success")}).catch(function(t){console.log("unsuccess")})}},{key:"getTeamStats",value:function(){var t=this;T({url:x+"https://fantasysports.yahooapis.com/fantasy/v2/team/nba.l.187759.t.7/players/stats;type=lastweek?format=json",method:"get",withCredentials:!1,headers:{Authorization:"Bearer "+this.state.accessToken}}).then(function(a){for(var e=[],s=0;s<11;s++){var n={id:s,name:a.data.fantasy_content.team[1].players[s].player[0][2].name.full,"fgm/fga":a.data.fantasy_content.team[1].players[s].player[1].player_stats.stats[0].stat.value,"fg%":a.data.fantasy_content.team[1].players[s].player[1].player_stats.stats[1].stat.value,"ftm/fta":a.data.fantasy_content.team[1].players[s].player[1].player_stats.stats[2].stat.value,"ft%":a.data.fantasy_content.team[1].players[s].player[1].player_stats.stats[3].stat.value,"3pm":a.data.fantasy_content.team[1].players[s].player[1].player_stats.stats[4].stat.value,pts:a.data.fantasy_content.team[1].players[s].player[1].player_stats.stats[5].stat.value,reb:a.data.fantasy_content.team[1].players[s].player[1].player_stats.stats[6].stat.value,ast:a.data.fantasy_content.team[1].players[s].player[1].player_stats.stats[7].stat.value,st:a.data.fantasy_content.team[1].players[s].player[1].player_stats.stats[8].stat.value,blk:a.data.fantasy_content.team[1].players[s].player[1].player_stats.stats[9].stat.value,to:a.data.fantasy_content.team[1].players[s].player[1].player_stats.stats[10].stat.value};e.push(n)}t.setState({data:a.data.fantasy_content.team,products:e,columns:[{dataField:"id",text:"ID"},{dataField:"name",text:"Name"},{dataField:"fgm/fga",text:"FGM/FGA"},{dataField:"fg%",text:"FG%"},{dataField:"ftm/fta",text:"FTM/FTA"},{dataField:"ft%",text:"FT%"},{dataField:"3pm",text:"3PM"},{dataField:"pts",text:"PTS"},{dataField:"reb",text:"REB"},{dataField:"ast",text:"AST"},{dataField:"st",text:"ST"},{dataField:"blk",text:"BLK"},{dataField:"to",text:"TO"}]})}).catch(function(t){console.log(t)})}},{key:"getAllTakenPlayersStats",value:function(){var t=this,a=[],e=function(a){return T({url:x+"https://fantasysports.yahooapis.com/fantasy/v2/league/nba.l.187759/players;status=T;start="+a+"/stats?format=json",method:"get",withCredentials:!1,headers:{Authorization:"Bearer "+t.state.accessToken}})};e(1).then(function s(n){return function(l){void 0!=l.data.fantasy_content.league[1].players.count?(a=a.concat(l.data.fantasy_content.league[1].players),e(n+25).then(s(n+25))):function(a){var e=[];a.forEach(function(t){for(var a=0;a<t.count;a++)e.push(t[a])}),console.log("array before calc rankings"),console.log(e),g(e,t.state.stats);for(var s=[],n=0;n<e.length;n++){var l={id:n,name:e[n].player[0][2].name.full,points:e[n].player[1].player_stats.stats[17].stat.value.toFixed(2),truePoints:e[n].player[1].player_stats.stats[18].stat.value.toFixed(2)};s.push(l)}t.setState({data:e,columns:[{dataField:"id",text:"ID",sort:!0},{dataField:"name",text:"Name",sort:!0},{dataField:"points",text:"Points",sort:!0,sortFunc:function(t,a,e,s,n,l){return"desc"===e?t-a:a-t}},{dataField:"truePoints",text:"True Points",sort:!0,sortFunc:function(t,a,e,s,n,l){return"desc"===e?t-a:a-t}}],products:s})}(a)}}(1)).catch(function(t){console.log(t)})}},{key:"displayTakenStats",value:function(){console.log(this.state.data[0][0].player[0][2].name.full)}},{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement(E,null),n.a.createElement("br",null),n.a.createElement("button",{onClick:this.getToken},"Access Token"),n.a.createElement("p",null,this.state.accessToken),n.a.createElement("button",{onClick:this.getAllTakenPlayersStats},"Get Stats"),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement(b,{change:this.checkBoxTest,stats:this.state.stats}),n.a.createElement("div",{id:"table"},n.a.createElement(y.a,{striped:!0,keyField:"id",data:this.state.products,columns:this.state.columns})))}}]),a}(s.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));e(118);r.a.render(n.a.createElement(F,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},36:function(t,a,e){},49:function(t,a,e){t.exports=e(120)}},[[49,1,2]]]);
//# sourceMappingURL=main.53c3ac58.chunk.js.map
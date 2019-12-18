// client/src/functions.js
// Calculates the total value of each player

/*

0 FGM/FGA = 9004003
1 FG% = 5
2 FTM/FTA = 9007006
3 FT% = 8
4 3PM = 10
5 PTS = 12
6 REB = 15
7 AST = 16
8 ST = 17
9 BLK = 18
10 TO = 19
11 FGI = 20
12 FTI = 21
13 FGM = 22
14 FGA = 23
15 FTM = 24 
16 FTA = 25
17 TotPoints = 26
18 PuntedPoints = 27
*/

const FGMFGA = 0
const FGPERCENT = 1
const FTMFTA = 2
const FTPERCENT = 3
const THREEPM = 4
const PTS = 5
const REB = 6
const AST = 7
const ST = 8
const BLK = 9
const TO = 10
const FGI = 11
const FTI = 12
const FGM = 13
const FGA = 14
const FTM = 15
const FTA = 16
const TOTALPOINTS = 17

const math = require('mathjs')

var calcRankings = (arrPlayers, stats ) => {
    console.log(stats)
    // Convert stats with a value of '-' to "0" and separates Made and Attempts string 
    arrPlayers.forEach( (entry) => {
        for (let i = 0; i < FGI; i++) {
            if (i == FGMFGA) {

                // Add placeholder for impact values for FG
                entry[1]['player_stats']['stats'].push({
                    stat: {
                        stat_id: 20,
                        value: 0,
                    }
                    
                });

                // Add placeholder for impact values for FT
                entry[1]['player_stats']['stats'].push({
                    stat: {
                        stat_id: 21,
                        value: 0
                    }
                });

                let byForwardSlash = entry[1]['player_stats']['stats'][i]['stat']['value'].split('/');
                entry[1]['player_stats']['stats'].push({
                    stat: {
                        stat_id: 22,
                        value: byForwardSlash[0]
                    }
                    
                });
                entry[1]['player_stats']['stats'].push({
                    stat: {
                        stat_id: 23,
                        value: byForwardSlash[1]
                    }
                    
                });

            }
            else if (i == FTMFTA) {
                let byForwardSlash = entry[1]['player_stats']['stats'][i]['stat']['value'].split('/');
                entry[1]['player_stats']['stats'].push({
                    stat: {
                        stat_id: 24,
                        value: byForwardSlash[0]
                    }
                    
                });
                entry[1]['player_stats']['stats'].push({
                    stat: {
                        stat_id: 25,
                        value: byForwardSlash[1]
                    }
                    
                });
            }
            
            if (entry[1]['player_stats']['stats'][i]['stat']['value'] === '-') {
                entry[1]['player_stats']['stats'][i]['stat']['value'] = '0'
                console.log('changed for player' + i)
            }
            
            
            
        }

        removeEmptyArrays(entry[0]);
    })
    
    /*  Calc statistics for FG and FT
        1) Calc average percentage P
        2) Subtract P from individual percentage p
        3) Difference d = p -P
        4) Impact m = d * a, where a is the attempts
        5) Calculate z-scores for m
    */
    
    
    
    let fgImpact = calcImpact(arrPlayers, FGM);
    let ftImpact = calcImpact(arrPlayers, FTM);

    //Update array with impact values
    for ( let i = 0; i < arrPlayers.length; i++) {
        arrPlayers[i][1]['player_stats']['stats'][FGI]['stat']['value'] = fgImpact[i];
        arrPlayers[i][1]['player_stats']['stats'][FTI]['stat']['value'] = ftImpact[i];
    }
    console.log("after impact")
    // console.log(arrPlayers);
    

    let arrStatistics = []

    // Calc statistics for regular stats
    for (let i = 4; i < FGM; i++) {
        
        let stdDevMean = calcSTDevMean(arrPlayers, i)
        let statistics = {
            stat: i,
            mean: stdDevMean.mean, 
            stdDev: stdDevMean.stdDev
        }
        arrStatistics.push(statistics)
        
    }

    
    




    // Calc total points
    arrPlayers.forEach( (entry) => {
        let sumTotal = 0;
        let punted = [];
        let sumPunted = 0;
        for (let i = 4; i < FGM; i++) {
            let diff = entry[1]['player_stats']['stats'][i]['stat']['value'] - arrStatistics[i - 4]['mean'];
            
            let deviations = diff / arrStatistics[i-4]['stdDev']

            // Add to sumTotal for no punts
            if (i != TO) {
                sumTotal += deviations;
            }
            else {
                sumTotal -= deviations;
            }

            // Add to sumPunted only if not punted
            if (stats[i - 4]) {
                if (i != TO) {
                    sumPunted+= deviations;
                }
                else {
                    sumPunted -= deviations;
                }
            }
        }
        

        entry[1]['player_stats']['stats'].push({
            stat: {
                stat_id: "26",
                value: sumTotal
            }
        })

        entry[1]['player_stats']['stats'].push({
            stat: {
                stat_id: "27",
                value: sumPunted
            }
        })
    })
}

//Calculate standard deviation of a given stat
var calcSTDevMean = (data, stat) => {
    if (stat) {
        let arrOfStats = data.map( entry => entry[1]['player_stats']['stats'][stat]['stat']['value']);
        let stdDev = math.std(arrOfStats);
        let mean = math.mean(arrOfStats);
        let statistics = {
            mean,
            stdDev
        }
    return statistics;
    }
    else if (stat === undefined) {
        let stdDev = math.std(data);
        let mean = math.mean(data);
        let statistics = {
            mean,
            stdDev
        }        
    }
}

var calcImpact = (data, stat) => {
    
    let arrOfMade = data.map( entry => entry[1]['player_stats']['stats'][stat]['stat']['value'])
    for(let i = 0; i < arrOfMade.length; i++) {
        if (arrOfMade[i] == '-') {
            arrOfMade[i] = 0
        }
    }
    let arrOfAttempts = data.map( entry => entry[1]['player_stats']['stats'][stat + 1]['stat']['value'])
    for(let i = 0; i < arrOfAttempts.length; i++) {
        if (arrOfAttempts[i] == '-') {
            arrOfAttempts[i] = 1
        }
    }
    let meanMade = math.mean(arrOfMade)
    let meanAttempts = math.mean(arrOfAttempts);
    let percentMean = meanMade / meanAttempts
    let arrOfPercent = []
    for (let i = 0; i < arrOfMade.length; i++) {
        
        arrOfPercent.push(arrOfMade[i] / arrOfAttempts[i] ) 
    }
    let arrOfDifference = arrOfPercent.map( entry => (entry - percentMean));
    let arrOfImpact = [];
    for (let i = 0; i < arrOfDifference.length; i++) {
        arrOfImpact.push(arrOfDifference[i] * arrOfAttempts[i]);
    }
   
    return arrOfImpact;
}

var removeEmptyArrays = (entry) => {
    
    entry.forEach( (item, index) => {
        
        if (item.length == 0) {
            entry[index] = {"has_recent_player_notes": 0}
        }
        
    })
}


module.exports = calcRankings
import React, { Component } from "react";


export default class How extends Component {

    constructor() {
        super() 

        
    }

    
    render() {
        return(
            <div id="howTo">
                <br></br>
                <h1 className="title center">Fantasy Basketball Smart Trader</h1>
                <h4 className="center">Trade smarter with this tool by finding the players will improve your team.</h4>
                <p><b>How does it work?</b> Select the categories which you are not punting. Then click on "Get Stats" to generate the table. Each player will be scored by "Points" and "True Points". The "Points" column ranks the player based on all of the categories, whereas the "True Points" column excludes the punted categories. The "True Points" column ranks the players based on the categories you are trying to win. Now trade your players with similar "Points" for players with higher "True Points".
                </p>
                <p><b>Example:</b> Let's say you drafted Lebron "The King" James who is a solid overall player. But you also ended the draft with Ben Simmons and Clint Capela, both of whom will never let you win the Free Throw category. Using the Smart Trade, you realize you can trade LeBron for Giannis. LeBron is ranked higher, but you'll be getting a player with a higher True Point, points that actually matter to your scoring.
                </p>
            </div>
        )
    }
}
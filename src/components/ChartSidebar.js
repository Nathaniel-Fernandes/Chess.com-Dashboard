import React, { useState } from 'react'

/*
    1. game_pie_loss, game_pie_results, game_scatter_caps, game_histogram_caps, 
    move_histogram_ply, move_histogram_time, opening_data_barchart, opening_data_sunburst, 
    tactics_barchart, tactics_barchart_phases
*/

const ChartSidebar = ({ chart, setChart }) => {
    const [selectedCategory, setSelectedCategory] = useState("game")

    return (
        <div className="chart-sidebar">
            <div className="chart-inner-sidebar">
                <h3 className="chart-list-label">Charts</h3>
                <div className="custom-select">
                    <select className="select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="game">Game</option>
                        <option value="move">Moves</option>
                        <option value="opening">Opening</option>
                        {/* <option value="">Castle</option> */}
                        <option value="tactic">Tactics</option>
                    </select>
                </div>
                <ul className="chart-choices-list">
                    {selectedCategory === "" || selectedCategory === "game" ?
                        <GameChartsName setChart={setChart} chart={chart} /> : null
                    }
                    {selectedCategory === "move" ?
                        <MovesChartsName setChart={setChart} chart={chart} /> : null
                    }
                    {selectedCategory === "opening" ?
                        <OpeningChartsName setChart={setChart} chart={chart} /> : null
                    }
                    {selectedCategory === "tactic" ?
                        <TacticsChartsName setChart={setChart} chart={chart} /> : null
                    }
                </ul>
       
            </div>
        </div>
    )
}

const GameChartsName = ({ setChart, chart }) => {
    const li = [
        {id: "game_histogram_caps", name: "Histogram - CAPS Score"},
        {id: "game_scatter_caps", name:"Scatterplot - CAPS Score"},
        {id: "game_pie_loss", name:"Pie - Reason 4 Loss"},
        {id: "game_pie_results", name:"Pie - Results"}
    ]
  
    return (
        li.map((e,i) => <li key={i} data-selected={(chart === e.id)} onClick={() => setChart(() => e.id)}>{e.name}</li>)
    )
}

const MovesChartsName = ({ setChart, chart }) => {
    const li = [
        {id: "move_histogram_ply_blunder", name:  "Blunders v. Ply"},
        {id: "move_histogram_ply_mistake", name:  "Mistakes v. Ply"},
        {id: "move_histogram_ply_inaccuracy", name:  "Inaccuracies v. Ply"},
        {id: "move_histogram_time_blunder", name: "Blunders v. Time"},
        {id: "move_histogram_time_mistake", name: "Mistakes v. Time"},
        {id: "move_histogram_time_inaccuracy", name: "Inaccuracies v. Time"},
    ]

    return (
        li.map((e,i) => <li key={i} data-selected={(chart === e.id)} onClick={() => setChart(() => e.id)}>{e.name}</li>)
    )
}

const OpeningChartsName = ({ setChart, chart }) => {
    const li = [
        {id: "opening_data_sunburst", name: "Most Played by ECO"},
        {id: "opening_data_barchart", name: "Result by Opening"}
    ]
    return (
        li.map((e,i) => <li key={i} data-selected={(chart === e.id)} onClick={() => setChart(() => e.id)}>{e.name}</li>)
    )
}

const TacticsChartsName = ({ setChart, chart }) => {
    const li = [
        {id: "tactics_barchart", name: "Barchart - Tactics Categories"},
        {id: "tactics_barchart_phases", name: "Barchart - Tactics vs. Phases"}
    ]

    return (
        li.map((e,i) => <li key={i} data-selected={(chart === e.id)} onClick={() => setChart(() => e.id)}>{e.name}</li>)
    )
}
export default ChartSidebar;
import React, { useState } from 'react'

/*
    1. game_pie_loss, game_pie_results, game_scatter_caps, game_histogram_caps, 
    move_histogram_ply, move_histogram_time, opening_data_barchart, opening_data_sunburst, 
    tactics_barchart, tactics_barchart_phases
*/

const ChartSidebar = ({ chart, setChart, percentValue, setPercentValue }) => {
    const [selectedCategory, setSelectedCategory] = useState("game")

    const showInfoButtonFor = [
        "game_histogram_caps", 
        "game_scatter_caps",
        "move_histogram_ply_inaccuracy",
        "move_histogram_ply_mistake",
        "move_histogram_ply_blunder",
        "game_pie_loss",
        "opening_data_barchart",
        "opening_data_sunburst",
        "tactics_barchart"
    ]

    const showPercentValueButtonFor = [
        "move_histogram_ply_inaccuracy",
        "move_histogram_ply_mistake",
        "move_histogram_ply_blunder",
        "move_histogram_time_inaccuracy",
        "move_histogram_time_mistake",
        "move_histogram_time_blunder"
    ]

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
        
            {showInfoButtonFor.includes(chart) ?
                <ChartInfoButton chart={chart} /> :
                null
            }

            {showPercentValueButtonFor.includes(chart) ?
                <ChartPercentValueButton percentValue={percentValue} setPercentValue={setPercentValue} /> :
                null
            }
        </div>
    )
}

const ChartPercentValueButton = ({ percentValue, setPercentValue }) => {

    return (
        <div className="percent-value" >
            <button 
                data-selected={percentValue === 'value' ? 'true' : '' } 
                onClick={() => setPercentValue('value')}>Value</button>

            <button 
                data-selected={percentValue === 'percent' ? 'true' : '' } 
                onClick={() => setPercentValue('percent')}>%</button>
        </div>
    )
}

const ChartInfoButton = ({ chart }) => {
    const info = {
        'game_histogram_caps': {
            text: 'What is CAPS?',
            url: 'https://www.chess.com/article/view/better-than-ratings-chess-com-s-new-caps-system?ref_id=9730606'
        },

        'game_scatter_caps': {
            text: 'What is CAPS?',
            url: 'https://www.chess.com/article/view/better-than-ratings-chess-com-s-new-caps-system?ref_id=9730606'
        },

        'move_histogram_ply_inaccuracy': {
            text: "What's a ply?",
            url: 'https://en.wikipedia.org/wiki/Ply_(game_theory)'
        },

        'move_histogram_ply_mistake': {
            text: "What's a ply?",
            url: 'https://en.wikipedia.org/wiki/Ply_(game_theory)'
        },

        'move_histogram_ply_blunder': {
            text: "What's a ply?",
            url: 'https://en.wikipedia.org/wiki/Ply_(game_theory)'
        },

        'game_pie_loss': {
            text: "What's ILC?",
            url: 'https://www.dailychess.com/forum/only-chess/insufficient-losing-chances.100311'
        },

        'opening_data_sunburst': {
            text: "What's ECO?",
            url: 'https://www.cleanchess.com/chess-eco-code-system-explained'
        },

        'opening_data_barchart': {
            text: "What's ECO?",
            url: 'https://www.cleanchess.com/chess-eco-code-system-explained'
        },

        'else': {
            text: "Don't click me :)",
            url: 'https://youtu.be/hAq443fhyDo'
        }
    }

    const buttonUrl = info?.[chart]?.url || info['else'].url
    const buttonText = info?.[chart]?.text || info['else'].text

    return (
        <button className="orange-button info-button" onClick={() => window.open(buttonUrl, '_blank')}>{buttonText}</button>
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
        {id: "tactics_barchart", name: "Tactics"},
        {id: "tactics_barchart_phases", name: "Tactics v. Game Phases"}
    ]

    return (
        li.map((e,i) => <li key={i} data-selected={(chart === e.id)} onClick={() => setChart(() => e.id)}>{e.name}</li>)
    )
}

// ChartSidebar.whyDidYouRender = true

export default ChartSidebar;
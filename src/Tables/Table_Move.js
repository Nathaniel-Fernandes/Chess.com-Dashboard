import React, { useState, useEffect } from 'react'
import { DataStore } from '../State/store'
import Table, { renderLink } from './Table'

const columns = [    
    {field: 'date'},
    {field: 'gameID', cellRenderer: renderLink},
    {field: 'type'},
    {field: 'phase', filter: 'Phase'},
    {field: 'move', filter: 'Move'},
    {field: 'ply', filter: 'Move'},
    {field: 'timeLeft', filter: 'Time Left (s)'},
    {field: 'timeLeftPercent', filter: 'Time Left (%)'},
    {field: 'fen', width: 190},
    {field: 'result',filter: true,},
    {field: 'opponent',filter: true,},
    {field: 'color',filter: true,},
    {field: 'eco',headerName:"ECO",filter: true,},
    {field: 'caps', headerName:"CAPS Score"},
]

const Table_Game = () => {
    const [rows, setRows] = useState([])

    // const Games = store(state => state.Games)
    const blunders = DataStore(state => state.blunder)
    const mistakes = DataStore(state => state.mistake)
    const inaccuracy = DataStore(state => state.inaccuracy)

    useEffect(() => {
        // console.log(blunders)
        const t = []

        blunders.forEach(e => {
            t.push(
                {
                    date: e.date.split(" ")[0],
                    type: 'Blunder',
                    fen: e.fen,
                    phase: e.phase,
                    move: Math.ceil(e.ply / 2),
                    ply: e.ply,
                    timeLeft: e?.timeToThink?.toFixed(1),
                    timeLeftPercent: e?.timeToThinkPercent?.toFixed(1),
                    gameID: e.id,
                    result: e.won ? "Won" : "Lost",
                    eco:e.eco,
                    color:e.color,
                    opponent: e.opponent,
                    caps: e.CAPS.toFixed(1)
                }
            )
        })

        mistakes.forEach(e => {
            t.push(
                {
                    date: e.date.split(" ")[0],
                    type: 'Mistake',
                    fen: e.fen,
                    phase: e.phase,
                    move: Math.ceil(e.ply / 2),
                    ply: e.ply,
                    timeLeft: e?.timeToThink?.toFixed(1),
                    timeLeftPercent: e?.timeToThinkPercent?.toFixed(1),
                    gameID: e.id,
                    result: e.won ? "Won" : "Lost",
                    eco:e.eco,
                    color:e.color,
                    opponent: e.opponent,
                    caps: e.CAPS.toFixed(1)
                }
            )
        })

        inaccuracy.forEach(e => {
            t.push(
                {
                    date: e.date.split(" ")[0],
                    type: 'Inaccuracy',
                    fen: e.fen,
                    phase: e.phase,
                    move: Math.ceil(e.ply / 2),
                    ply: e.ply,
                    timeLeft: e?.timeToThink?.toFixed(1),
                    timeLeftPercent: e?.timeToThinkPercent?.toFixed(1),
                    gameID: e.id,
                    result: e.won ? "Won" : "Lost",
                    eco:e.eco,
                    color:e.color,
                    opponent: e.opponent,
                    caps: e.CAPS.toFixed(1)
                }
            )
        })

        setRows(() => t)
    }, [])

    return (
        <Table customCol={columns} data={rows} />
    )
}

// Table_Game.whyDidYouRender = true

export default Table_Game



// useEffect(() => {
//     console.log(tactics)
//     const t = tactics.map((e, i) => {
//         return {
//             date: e.date.split(" ")[0],
//             name: e.type.name,
//             phase: e.phase,
//             move: Math.ceil(e.ply / 2),
//             ply: e.ply,
//             timeLeft: e.timeToThink.toFixed(1),
//             timeLeftPercent: e.timeToThinkPercent.toFixed(1),
//             gameID: e.id,
//             result: e.won ? "Won" : "Lost",
//             eco:e.eco,
//             color:e.color,
//             opponent: e.opponent,
//             class: e.class,
//             caps: e.CAPS.toFixed(1)
//         }
//     })

//     setRows(() => t)
// }, [])
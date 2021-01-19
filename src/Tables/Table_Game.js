import React, { useState, useEffect } from 'react'
import { DataStore, GameStore } from '../State/store'
import Table, { renderLink } from './Table'

const columns = [    
    {field: 'date'},
    {field: 'gameID', cellRenderer: renderLink},
    {field: 'result',filter: true,},
    {field: 'opponent',filter: true,},
    {field: 'color',filter: true,},
    {field: 'eco',headerName:"ECO",filter: true,},
    {field: 'caps', headerName:"CAPS Score"},
    {field: 'blunders', headerName: 'Blunders'},
    {field: 'mistakes', headerName: 'Mistakes'},
    {field: 'inaccuracies', headerName: 'Inaccuracies'}
]
const Table_Game = () => {
    const [rows, setRows] = useState([])

    const Games = GameStore(state => state.Games)
    const Openings = DataStore(state => state.opening)
    const blunders = DataStore(state => state.blunder)
    const mistakes = DataStore(state => state.mistake)
    const inaccuracy = DataStore(state => state.inaccuracy)

    useEffect(() => {
        // console.log(Openings)
        const t = Games.map((e, i) => {
            // console.log(Openings.filter(obj => obj.id === e.id))
            return {
                date: e.date.split(" ")[0],
                gameID: e.id,
                result: e.result === "win" ? "Won" : "Lost",
                opponent: e.opponent,
                color:e.color,
                eco: Openings.filter(obj => obj.id === e.id)?.[0]?.eco,
                caps: e?.CAPS?.toFixed(1),
                blunders: blunders.filter(obj => obj.id === e.id).length,
                mistakes: mistakes.filter(obj => obj.id === e.id).length,
                inaccuracies: inaccuracy.filter(obj => obj.id === e.id).length
            }
        })

        setRows(() => t)
    }, [Games])

    return (
        <Table customCol={columns} data={rows} />
    )
}

// Table_Game.whyDidYouRender = true

export default Table_Game
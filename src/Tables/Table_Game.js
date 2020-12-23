import React, { useState, useEffect } from 'react'
import { store } from '../State/store'
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

    const Games = store(state => state.Games)
    const Openings = store(state => state.opening)
    const blunders = store(state => state.blunder)
    const mistakes = store(state => state.mistake)
    const inaccuracy = store(state => state.inaccuracy)

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

export default Table_Game
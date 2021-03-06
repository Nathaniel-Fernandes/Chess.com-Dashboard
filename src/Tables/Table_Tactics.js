import React, {useState, useEffect} from 'react'
import { DataStore } from "../State/store"
import 'react-data-grid/dist/react-data-grid.css'
import Table from './Table'

const TacticsTable = () => {

    const [rows, setRows] = useState([])
    const tactics = DataStore((state) => {
        return [
            ...state.winningExchange,
            ...state.underdefended,
            ...state.trapped,
            ...state.hanging,
            ...state.relativePin,
            ...state.absolutePin,
            ...state.skewer,
            ...state.fork,
            ...state.mate,
        ]
    })

    useEffect(() => {
        // console.log(tactics)
        const t = tactics.map((e, i) => {
            return {
                date: e.date.split(" ")[0],
                gameID: e.id,
                name: e.type.name,
                phase: e.phase,
                move: Math.ceil(e.ply / 2),
                ply: e.ply,
                timeLeft: e?.timeToThink?.toFixed(1),
                timeLeftPercent: e?.timeToThinkPercent?.toFixed(1),
                result: e.won ? "Won" : "Lost",
                eco:e.eco,
                color:e.color,
                opponent: e.opponent,
                class: e.class,
                caps: e.CAPS.toFixed(1)
            }
        })

        setRows(() => t)
    }, [])

    return (
        <Table data={rows} />
    )

}

// TacticsTable.whyDidYouRender = true

export default TacticsTable
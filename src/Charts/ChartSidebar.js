import React, { useState } from 'react'

const ChartSidebar = () => {
    const [selected, setSelected] = useState("")

    return (
        <div className="chart-sidebar">
            <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                <option value="">Category</option>
                <option value="game">Game</option>
                <option value="coffee">Moves</option>
                <option value="opening">Opening</option>
                <option value="castle">Castle</option>
                <option value="tactic">Tactics</option>
            </select>
        </div>
    )
}

export default ChartSidebar;
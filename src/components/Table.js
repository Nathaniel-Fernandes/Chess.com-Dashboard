import React from 'react';
import TABLE_GAME from '../Tables/Table_Game'
import TABLE_MOVE from '../Tables/Table_Move'
import TABLE_OPENINGS from '../Tables/Table_Openings'
import TABLE_TACTICS from '../Tables/Table_Tactics'

const TableComponent = ({ chart }) => {
    const type = chart.split("_")[0].toLowerCase();

    return (
        <>
            <h3 className="table-list-label">Corresponding Data</h3>
            { 
                (type === "game") ? <TABLE_GAME /> :
                (type === "move") ? <TABLE_MOVE /> :
                (type === "opening") ? <TABLE_OPENINGS /> :
                (type === "tactics") ? <TABLE_TACTICS /> : null
            }
        </>
    )
}

TableComponent.whyDidYouRender = true

export default TableComponent;
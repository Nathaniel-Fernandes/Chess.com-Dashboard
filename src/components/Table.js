import React from 'react';
import Table_Game from '../Tables/Table_Game'
import Table_Move from '../Tables/Table_Move'
import Table_Openings from '../Tables/Table_Openings'
import Table_Tactics from '../Tables/Table_Tactics'

const TableComponent = ({ chart }) => {
    const type = chart.split("_")[0].toLowerCase();

    return (
        <>
            <h3 className="table-list-label">Corresponding Data</h3>
            { 
                (type === "game") ? <Table_Game /> :
                (type === "move") ? <Table_Move /> :
                (type === "opening") ? <Table_Openings /> :
                (type === "tactics") ? <Table_Tactics /> : null
            }
        </>
    )
}

export default TableComponent;
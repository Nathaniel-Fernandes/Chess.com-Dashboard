import './table.css'
import { useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

export const renderLink = (params) => {
    // console.log(params);
    return `<a href="https://www.chess.com/analysis/game/live/${params.value}" target="_blank">${params.value}</a>`
}
const columns = [    
    {field: 'date'},
    {field: 'gameID', cellRenderer: renderLink},
    {field: 'name', filter: true, width: 120},
    {field: 'class',filter: true,},
    {field: 'phase',filter: true,},
    {field: 'color',filter: true,},
    {field: 'opponent',filter: true,},
    {field: 'result',filter: true,},
    {field: 'move'},
    {field: 'ply'},
    {field: 'timeLeft', headerName: 'Time Left (s)'},
    {field: 'timeLeftPercent', headerName: 'Time Left (%)'},
    {field: 'eco',headerName:"ECO",filter: true,},
    {field: 'caps', headerName:"CAPS Score"},
]

const defaultCol = {
    sortable: true,
    // floatingFilter: true,
    resizable: true,
    width: 100,
    cellStyle: {
        // border: '1px solid',
        border: 'solid',
        borderTopWidth: '0.5px',
        borderRightWidth: '0.5px',
        borderLeftWidth: '0.5px',
        borderBottomWidth: '0.5px',
        textAlign: "center"
    },
    cellClass: "grid-cell-centered"
}



const Table = ({ data, customCol, width = '100%', height = 400, file = "export.csv"}) => {
    
    const [gridAPI, setGridAPI] = useState()

    const gridOptions = {
        defaultColDef: defaultCol,
        // onFirstDataRendered: onFirstDataRendered,
        columnDefs: customCol || columns,
        onGridReady: (params) => setGridAPI(() => params.api)
    }

    function onBtnExportDataAsCsv(gridAPI, file = "export.csv") {
        const params = {
            allColumns: true,
            fileName: file
        }
        gridAPI.exportDataAsCsv(params);
    }

    return (
        <>
            <button className="yellow-button" onClick={() => onBtnExportDataAsCsv(gridAPI, file)}>Export (CSV)</button>

            <div className="ag-theme-balham" style={{ height: height, maxWidth: width}}>
                <AgGridReact rowData={data} gridOptions={gridOptions}>
                </AgGridReact>
            </div>
        </>
    )
}

// Table.whyDidYouRender = true

export default Table;

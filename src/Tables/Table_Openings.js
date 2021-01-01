import React, { useState, useEffect } from 'react'
import { store } from '../State/store'
import Table from './Table'

const columns = [    
    {field: 'eco',headerName:"ECO",filter: true,},
    {field: 'won',headerName:"Won",},
    {field: 'lost',headerName:"Lost",},
    // {field: 'count',headerName:"Total",filter: true,},
    {field: 'aveCaps',headerName:"Average CAPS", width:108},
    {field: 'blunders',headerName:"Blunders",},
    {field: 'mistakes',headerName:"Mistakes",},
    {field: 'inaccuracy',headerName:"Inaccuracies",},
]
const Table_Opening = () => {
    const [rows, setRows] = useState([])

    const openings = store(state => state.opening)
    const blunder = store(state => state.blunder)
    const mistake = store(state => state.mistake)
    const inaccuracy = store(state => state.inaccuracy)

    // console.log(openings)

    useEffect(() => {
        // console.log('hi')
        const data = {};
        
        openings.map((e, i) => {
            if(!data[e.eco]) {
                data[e.eco] = {
                    eco: e.eco,
                    count: 1,
                    won: 0,
                    lost: 0,
                    aveCaps: e.caps,
                    blunders: blunder.filter(obj => obj.id === e.id).length,
                    mistakes: mistake.filter(obj => obj.id === e.id).length,
                    inaccuracy: inaccuracy.filter(obj => obj.id === e.id).length
                };
                (e.won) ? data[e.eco].won += 1 : data[e.eco].lost += 1;
            }
            else {
                (e.won) ? data[e.eco].won += 1 : data[e.eco].lost += 1;
                data[e.eco].aveCaps = (data[e.eco].aveCaps * data[e.eco].count + e.caps) / (data[e.eco].count + 1);
                data[e.eco].count += 1;
                data[e.eco].blunders += blunder.filter(obj => obj.id === e.id).length;
                data[e.eco].mistakes += mistake.filter(obj => obj.id === e.id).length;
                data[e.eco].inaccuracy += inaccuracy.filter(obj => obj.id === e.id).length;
            }
        })
        
        Object.keys(data).map(e => {
            data[e].aveCaps = data[e].aveCaps.toFixed(1)
        })
        setRows(() => Object.values(data))
        // console.log(data)
        // console.log(Object.values(data))
    }, [openings])

    return (
        <Table customCol={columns} data={rows} width={720} />
    )
}

export default Table_Opening
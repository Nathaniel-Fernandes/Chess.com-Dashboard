import React, { useState, useEffect } from 'react'
import { GameStore } from '../../State/store'
import Pie from '../ResponsivePie'

/**
 * @description A pie chart of the reason why the user lost
 */
const Pie_Reason4Loss = ({ width, height }) => {

    const Games = GameStore(state => state.Games)
    const [loading, setLoading] = useState(true)
    const [reason, setReason] = useState({})

    useEffect(() => {
        const d = {}
        setLoading(() => true)

        for(let i = 0; i < Games.length; i++) {
            const type = Games[i].result;
            // console.log(type)

            if(type !== "win") {
                if(d[type] === undefined) {
                    // console.log(reason)
                    d[type] = 1;
                } 
                else {
                   d[type] += 1
                }
                // console.log(d)
            }
        }

        setReason(() => d)
        setLoading(() => false)
        // console.log(data, reason)
    }, [Games]);

    if(!loading) {
        const data = Object.keys(reason).map((e, i) => { 
            return {
                id: e, 
                label: mapTermToName(e), 
                value: reason[e]
            }
        })
        // console.log(data)

        return (
            <Pie 
                data={data} 
                width={width} 
                height={height}
                title="Reason for Loss or Draw"
            />
        )
    } 
    
    return null; // default return if loading
}

const mapTermToName = (term) => {
    if(term === 'resigned') return 'resigned'
    if(term === 'timeout') return 'timeout'
    if(term === 'checkmated') return 'checkmate'
    if(term === 'timevsinsufficient') return 'ILC'

    return term
}

// Pie_Reason4Loss.whyDidYouRender = true

export default Pie_Reason4Loss;
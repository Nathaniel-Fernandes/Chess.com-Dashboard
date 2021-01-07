import React, { useState, useEffect } from 'react'
import { store } from '../../State/store'
import Pie from '../ResponsivePie'
import { mapTermToGameResult } from '../../BusinessLogic/helpers'

const defaultState = {"win":0,"draw":0,"loss":0}

const Pie_Results = ({ width, height }) => {
    // console.log(store.getState().Games)
    
    const data = store(state => state.Games)
    const [loading, setLoading] = useState(true)
    const [reason, setReason] = useState({"win":0,"draw":0,"loss":0})

    useEffect(() => {
        setLoading(() => true)
        setReason(() => { return {"win":0,"draw":0,"loss":0}})

        for(let i = 0; i < data.length; i++) {
            const type = mapTermToGameResult(data[i].result);
            // console.log(type)

            if(type === "win") {
                setReason((e) => {
                    return {...e, "win": e.win + 1}
                })
            } else if (type === "draw") {
                setReason((e) => {
                    return {...e, "draw": e.draw + 1}
                })   
            } else {
                setReason((e) => {
                    return {...e, "loss": e.loss + 1}
                })
            }
        }

        setLoading(() => false)
        // console.log(data, reason)
    }, [data]);

    if(!loading) {
        const data = Object.keys(reason).map((e) => { 
            return {id: e, label: e, value: reason[e]}
        })
        console.log(data)

        return (
            <Pie data={data} width={width} height={height} title="Game Results" />
        )
    }

    return null; // default return
}

// Pie_Results.whyDidYouRender = true

export default Pie_Results;


/*

            <ResponsivePie 
                data={ data }
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                padAngle={3}
                cornerRadius={2}
                innerRadius={0.5}
                sortByValue={true}
                enableRadialLabels={true}
                radialLabelsSkipAngle={10}
                radialLabelsLinkHorizontalLength={8}
                sliceLabelsSkipAngle={10}
                sliceLabelsSkipAngle={10}
                borderWidth={1}
                borderColor="#a17a5b"
                theme={{
                    fontSize: "16px",
                    fontWeight: 'bold'
                }}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', '1.4' ] ] }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={
                    Object.keys(data).map((e) => {
                        console.log(e)
                        return {match: { id: data[e].id}, id: (e % 2 === 0) ? 'lines' : 'dots'}
                    })
                }
                legends={[
                    {
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 65,
                        translateY: 0,
                        itemsSpacing: 5,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'square',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000',
                                    backgroundColor: '#FFFF00'
                                }
                            }
                        ]
                    }]}
            />
*/
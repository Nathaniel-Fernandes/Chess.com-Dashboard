import React, { useState, useEffect } from 'react'
import { store } from '../../State/store'
import { ResponsiveBar, Bar } from '@nivo/bar'

const Barchart_TacticsPhases = ({ width, height }) => {

    const [the_data, setThe_data] = useState([])
    const [the_keys, setKeys] = useState([])

    const tactics = store((state) => {
        return {
            "Win the Exchange":state.winningExchange,
            "Underdefended Piece":state.underdefended,
            "Trapped piece":state.trapped,
            "Hanging Piece":state.hanging,
            "Relative Pin":state.relativePin,
            "Absolute Pin":state.absolutePin,
            Skewer:state.skewer,
            Fork:state.fork,
            "Mate":state.mate,
        }
    })

    
    useEffect(() => {
        const d = [{phase: "Opening"}, {phase: "Middlegame"}, {phase: "Endgame"}];
        const k = [] 

        Object.keys(tactics).map((e) => {
            const opening = tactics[e].filter((obj) => obj.phase === "open").length
            const middle = tactics[e].filter((obj) => obj.phase === "middle").length
            const end = tactics[e].filter((obj) => obj.phase === "end").length

            d[0][e] = opening
            d[1][e] = middle
            d[2][e] = end

            if(opening + middle + end !== 0) k.push(e)
        })

        // console.log(d)

        setThe_data(() => d)
        setKeys(() => k)

    }, [])

    const Title = ({ width, height }) => {
        // console.log(data)
        const style = {fontWeight: 'bold'}

        return (
            <text 
                x={width / 2}
                y={-10}
                textAnchor="middle"
                style={style}
            >
                Tactics vs. Game Phases
            </text>
        )
    } 
    // console.log(the_data)
    return (
        <Bar
            data={
                the_data
            }
            keys={the_keys}
            indexBy="phase"
            width={width}
            height={height}
            margin={{ top: 25, right: 160, bottom: 80, left: 30 }}
            colors={{ scheme: 'set1' }}
            // groupMode="grouped"
            layers={['grid', 'axes', 'bars', 'markers', 'legends', 'annotations',Title]}
            axisBottom={{
                tickSize: 8,
                tickPadding: 5,
                // tickRotation: -20,
                legend: 'Tactic',
                legendPosition: 'middle',
                legendOffset: 50
            }}
            labelSkipHeight={20}
            padding={0.25}
            enableGridX
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    )
}

export default Barchart_TacticsPhases
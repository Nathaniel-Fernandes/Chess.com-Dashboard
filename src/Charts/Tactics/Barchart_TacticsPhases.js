import React, { useState, useEffect } from 'react'
import { store } from '../State/store'
import { ResponsiveBar } from '@nivo/bar'

const Barchart_TacticsPhases = () => {

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
    const defaultTactics = [{phase:"Opening"},{phase:"Middle"},{phase:"Endgame"}]
    const [the_data, setThe_data] = useState(defaultTactics)
    
    useEffect(() => {
        const d = defaultTactics;

        Object.keys(tactics).map((e) => {
            const opening = tactics[e].filter((obj) => obj.phase === "open").length
            const middle = tactics[e].filter((obj) => obj.phase === "middle").length
            const end = tactics[e].filter((obj) => obj.phase === "end").length

            d[0][e] = opening
            d[1][e] = middle
            d[2][e] = end
        })
        // d.sort((a, b) => {
        //     const result =  ((b.Blundered || 0) + (b.Missed || 0) + (b.Got || 0)) - ((a.Blundered || 0) + (a.Missed || 0) + (a.Got || 0))
        //     // console.log(result)
        //     return result
        // })
        console.log(d)

        setThe_data(() => d)

    }, [])

    return (
        <ResponsiveBar
            data={
                the_data
            }
            keys={Object.keys(tactics)}
            indexBy="phase"
            margin={{ top: 50, right: 150, bottom: 80, left: 30 }}
            // groupMode="grouped"
            axisBottom={{
                tickSize: 8,
                tickPadding: 5,
                tickRotation: -20,
                legend: 'Tactic',
                legendPosition: 'middle',
                legendOffset: 70
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
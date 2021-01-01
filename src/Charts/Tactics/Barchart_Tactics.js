import React, { useState, useEffect } from 'react'
import { store } from '../../State/store'
import { Bar } from '@nivo/bar'

const Barchart_Tactics = ({ width, height }) => {

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

    const [the_data, setThe_data] = useState([])
    const [max, setMax] = useState(0)

    
    useEffect(() => {
        setThe_data(() => [])

        const d = Object.keys(tactics).map((e) => {
            return {
                "tactic": e,
                "Blundered": tactics[e].filter((obj) => obj.class === "blunders").length || null,
                "Missed": tactics[e].filter((obj) => obj.class === "missed").length || null,
                "Got": tactics[e].filter((obj) => obj.class === "got").length || null
            }
        })
        d.sort((a, b) => {
            const result =  ((b.Blundered || 0) + (b.Missed || 0) + (b.Got || 0)) - ((a.Blundered || 0) + (a.Missed || 0) + (a.Got || 0))
            // console.log(result)
            return result
        })
        // console.log(d)

        setMax(() => d[0].Blundered + d[0].Missed + d[0].Got)
        setThe_data(() => d)

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
                Tactics by Category
            </text>
        )
    } 

    return (
        <Bar
            data={
                the_data.filter(obj => ((obj.Blundered || 0) + (obj.Missed || 0) + (obj.Got || 0) !== 0))
            }
            keys={['Blundered','Missed', 'Got']}
            indexBy="tactic"
            width={width}
            height={height}
            margin={{ top: 50, right: 130, bottom: 80, left: 60 }}
            // groupMode="grouped"
            axisLeft={{
                tickValues: 5,
                legend: 'Count',
                legendPosition: 'middle',
                legendOffset: -30,
            }}
            axisBottom={{
                tickSize: 8,
                tickPadding: 5,
                tickRotation: -20,
                legend: 'Tactic',
                legendPosition: 'middle',
                legendOffset: 70
            }}
            labelSkipHeight={10}
            padding={0.25}
            enableGridX
            layers={['grid', 'axes', 'bars', 'markers', 'legends', 'annotations',Title]}
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

export default Barchart_Tactics
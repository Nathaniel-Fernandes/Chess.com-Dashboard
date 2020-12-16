import React, { useState, useEffect } from 'react'
import { store } from '../State/store'
import { ResponsivePie } from '@nivo/pie'

const Pie_Reason4Loss = () => {

    const data = store(state => state.Games)
    const [reason, setReason] = useState({})

    useEffect(() => {
        const d = {}

        for(let i = 0; i < data.length; i++) {
            const type = data[i].result;
            console.log(type)

            if(type !== "win") {
                if(d[type] === undefined) {
                    console.log(reason)
                    d[type] = 1;
                } 
                else {
                   d[type] += 1
                }
                console.log(d)
            }
        }

        setReason(() => d)
        // console.log(data, reason)
    }, [data]);

    if(1 === 1) {
        const data = Object.keys(reason).map((e, i) => { 
            return {id: e, label: e, value: reason[e]}
        })
        console.log(data)

        return (
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
        )
    }

}

export default Pie_Reason4Loss;
import React, { useState, useEffect } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { useTheme } from '@nivo/core'

const CustomTooltip = ({id, value, data}) => {
    const theme = useTheme()
    // console.log(nameLookUp)
    return (
        <div style={{ ...theme.tooltip.container, width: '300px',maxHeight:'200px'}}>
            <strong>ECO:</strong> {data.eco} <br />
            <strong>Name:</strong>
                {data.name[0]}
            <br />
            <strong>Won:</strong> {data.Won || 0}   <br />
            <strong>Lost:</strong> {data.Lost || 0}
        </div>
        
    )
}

const Barchart_Openings = ({ white, black }) => {
    
    const [data, setData] = useState({})
    const [max, setMax] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(() => true)
        console.log("!!!!")
        const d = {}

        white.map((e) => {
            // console.log(e)
            const o = e.name.substring(0,2);
            if(d[o]) {
                d[o].Won += e.won || 0;
                d[o].Lost += e.loss || 0;
                if(d[o].name.indexOf(e.description) === -1) d[o].name.push(e.description);
            } else {
                d[o] = {eco: `${o}X`, name: [e.description], Won:e.won || 0, Lost:e.loss || 0}
            }
        })

        black.map((e) => {
            // console.log(e)
            const o = e.name.substring(0,2);
            if(d[o]) {
                d[o].Won += (e.won || 0);
                d[o].Lost += (e.loss || 0);
                if(d[o].name.indexOf(e.description) === -1) d[o].name.push(e.description)
            } else {
                d[o] = {eco: `${o}X`, name: [e.description], Won:(e.won || 0), Lost:(e.loss || 0)}
            }
        })
        
        const final = Object.values(d)
        let maxValue = max;
        final.map((e) => {
            if((e.Won || 0) + (e.Lost || 0) > maxValue)  {
                maxValue = (e.Won || 0) + (e.Lost || 0);
            }
        })
        
        console.log(maxValue)
        console.log(d)
        setData(() => Object.values(d))
        setMax(() => maxValue)

        // console.log(Object.values(d))
        setLoading(() => false)

    },[]);

    console.log(max, data)

    if(!loading) {
        return (
            <ResponsiveBar
                data={data.sort((a, b) => b.Won === a.Won ? b.Won + b.Lost - (a.Won + a.Lost) : b.Won - a.Won)}
                keys={[ 'Won', 'Lost']}
                indexBy="eco"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                axisBottom={{
                    tickSize: 5,
                    // tickPadding: 5,
                    tickRotation: -30,
                    legend: 'Openings',
                    legendPosition: 'middle',
                    legendOffset: 40
                }}
                enableGridX
                axisLeft={{
                    tickValues:[...Array(max + 1).keys()]
                }}
                labelSkipHeight={12}
                labelTextColor={{ from: '#000000', modifiers: [ [ 'darker', 1.6 ] ] }}
                tooltip={CustomTooltip}
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
                animate={false}
                // motionStiffness={90}
                // motionDamping={15}
            />
        )
    } else {
        return null
    }
 
}

export default Barchart_Openings;
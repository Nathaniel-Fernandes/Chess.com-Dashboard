import React, { memo, useMemo, useCallback } from 'react'
import { Sunburst } from '@nivo/sunburst'
import { useTheme } from '@nivo/core'

// place these out here so it's not recreated
const layers = ['sliceLabels', 'slices']
const margin = { top: 50, right: 130, bottom: 80, left: 60 }
const defs = []

const Sunburst_ECO = ({white, black, width, height}) => {
    const data = useMemo(() => {
        return {
            name: "Openings",
            children: [
                {
                    name: "White", 
                    color:"#FFFFFF", 
                    children:white, 
                    description: "White", 
                    total:white.reduce((a,b) => (a+b.value), 0), 
                    won:white.reduce((a,b) => (a+b.won), 0),
                    loss:white.reduce((a,b) => (a+b.loss), 0)
                },
                {
                    name: "Black", 
                    color:"#000000", 
                    children:black, 
                    description: "Black", 
                    total:black.reduce((a,b)=> (a+b.value), 0), 
                    won:black.reduce((a,b) => (a+b.won), 0),
                    loss:black.reduce((a,b) => (a+b.loss), 0)
                }
            ]
        }
    }, [white.length, black.length])

    const colors = useCallback(({ id }) => pickWhiteBlack(id), [])
    const childColor = useCallback(() => pickCustomPalette(customPalette2), [])
    
    return (
        <Sunburst
            data={data}
            id="name"
            value="value"
            width={width}
            height={height}
            margin={margin}
            cornerRadius={4}
            borderWidth={2}
            colors={colors}
            childColor={childColor}
            animate={false}
            motionConfig="gentle"
            isInteractive={true}
            tooltip={CustomTooltip}
            layers={layers}
            defs={defs}
        />
    )
}

Sunburst_ECO.whyDidYouRender = true

export default memo(Sunburst_ECO);

// const customPalette = ["#E8C1A0","#F47560","#F1E15B","#E8A838","#61CDBB","#97E3D5"]
const customPalette2 = ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"]

const pickCustomPalette = (palette) => {
    const i = Math.floor(Math.random()*palette.length)
    const color = palette[i]
    // console.log(i, color)

    return color;
}

const pickWhiteBlack = (id) => {
    if(id === "White") { 
        return "#fff1d9" 
    }

    return "#000000" 
}

const CustomTooltip = ({id, value, data}) => {
    const theme = useTheme()
    // console.log(nameLookUp)
    return (
        <div style={{ ...theme.tooltip.container}}>
            <strong>Name:</strong> {data.description} <br />
            <strong>ECO:</strong> {id} <br />
            <strong>Played:</strong> {value} ({(value / data.total * 100).toFixed(1)}%) <br />
            <strong>Won:</strong> {data.won}   <br />
            <strong>Lost:</strong> {data.loss}
        </div>
        
    )
}
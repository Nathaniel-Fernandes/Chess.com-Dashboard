import React from 'react'
import { XAxis,YAxis,BarSeries,DensitySeries } from '@data-ui/histogram'
import { baseLabel } from '@data-ui/theme/lib/svgLabel'
import { store } from '../../State/store'
import ResponsiveHistogram from '../ResponsiveHistogram'


const Histogram_MoveTime = ({ type = "blunder", x = "percent", width, height }) => {

    const MoveData = {
        blunder: store(state => state.blunder),
        mistake: store(state => state.mistake),
        inaccuracy: store(state => state.inaccuracy)
    }

    const Fill = {
        blunder: "#CA3432",
        mistake: "#E58F2A",
        inaccuracy: "#6650D1" // "#5c533b"
    }

    const DataAccessor = {
        percent: datum => datum?.timeToThinkPercent,
        value: datum => datum?.timeToThink
    }

    // console.log(blunders, mistakes)
    return (
        // <ResponsiveHistogram
        <ResponsiveHistogram
            ariaLabel=""
            height={height}
            width={width}
            orientation="vertical"
            cumulative={false}
            binCount={20}
            binType="numeric"
            valueAccessor={DataAccessor[x]}
            renderTooltip={({ event, datum, data, color }) => (
                <div>
                  <strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
                  <div><strong>count </strong>{datum.count}</div>
                  <div><strong>cumulative </strong>{datum.cumulative}</div>
                  <div><strong>density </strong>{datum.density}</div>
                </div>
            )}
        >
            <BarSeries animated rawData={MoveData[type]} fill={Fill[type]}/>
            {/* <DensitySeries
                stroke="black"
                showArea={false}
                smoothing={0.01}
                kernel="gaussian"
                rawData={MoveData[type]}
                fill={Fill[type]}
            /> */}

            <XAxis 
                label= {x === "percent" ? "Time Left % of Total Game" : "Time Left (s)" }
                axisStyles = {{
                    label: {
                    'bottom': {
                        ...baseLabel,
                        fontSize: '18px',
                        fill: 'black',
                        y: '46'
                    },
                    }
                }}
            />

            <YAxis 
                label="Count"
                axisStyles = {{
                    label: {
                    'left': {
                        ...baseLabel,
                        fontSize: '18px',
                        fill: 'black',
                        y: -35
                    },
                    }
                }}
            />
        </ResponsiveHistogram>
    )
}

// Histogram_MoveTime.whyDidYouRender = true

export default Histogram_MoveTime
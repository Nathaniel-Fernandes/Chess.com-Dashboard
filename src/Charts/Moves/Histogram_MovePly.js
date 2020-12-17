import React from 'react'
import { XAxis,YAxis,BarSeries,DensitySeries } from '@data-ui/histogram'
import { store } from '../../State/store'
import ResponsiveHistogram from '../ResponsiveHistogram'

const Histogram_MovePly = ({ type = "blunder", x = "percent" }) => {

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

    // this is only unique thing - might be able to extract
    const DataAccessor = {
        percent: datum => datum.PlyPercent,
        value: datum => datum.Ply
    }

    // console.log(blunders, mistakes)
    return (
        // <ResponsiveHistogram
        <ResponsiveHistogram
            ariaLabel=""
            height={400}
            width={600}
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
            <DensitySeries
                stroke="#e64980"
                showArea={false}
                smoothing={0.01}
                kernel="gaussian"
                rawData={MoveData[type]}
                fill={Fill[type]}
            />

            <XAxis />
            <YAxis />
        </ResponsiveHistogram>
    )
}

export default Histogram_MovePly
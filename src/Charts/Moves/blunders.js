import React from 'react'
import { Histogram, withParentSize, XAxis,YAxis,BarSeries,DensitySeries } from '@data-ui/histogram'
import { store } from '../../State/store'

export const ResponsiveHistogram = withParentSize(({parentWidth, parentHeight, ...rest}) => {

    return (
            <Histogram
              width={parentWidth}
              height={parentHeight}
              {...rest}
            />
          );
    
});

const Histogram_BlundersTime = () => {

    const blunders = store(state => state.blunder)
    const mistakes = store(state => state.mistake)
    const inaccuracy = store(state => state.inaccuracy)

    console.log(blunders, mistakes)
    return (
        // <ResponsiveHistogram
        <ResponsiveHistogram
            ariaLabel="IDK what this does"
            height={400}
            width={600}
            orientation="vertical"
            cumulative={false}
            binCount={20}
            binType="numeric"
            valueAccessor={datum => datum.timeToThink}
            renderTooltip={({ event, datum, data, color }) => (
                <div>
                  <strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
                  <div><strong>count </strong>{datum.count}</div>
                  <div><strong>cumulative </strong>{datum.cumulative}</div>
                  <div><strong>density </strong>{datum.density}</div>
                </div>
              )}
        >
            {/* <BarSeries animated rawData={blunders} fill="red"/> */}
            {/* <DensitySeries
                stroke="#e64980"
                showArea={true}
                smoothing={0.01}
                kernel="gaussian"
                rawData={blunders}
                fill="red"
            /> */}
            {/* <BarSeries animated rawData={mistakes} fill="orange"/>
            <DensitySeries
                stroke="#e64980"
                showArea={true}
                smoothing={0.01}
                // kernel="parabolic"
                rawData={mistakes}
                fill="orange"
            /> */}
            <BarSeries animated rawData={inaccuracy} fill="blue"/>
            {/* <DensitySeries
                stroke="#e64980"
                showArea={true}
                smoothing={0.01}
                kernel="gaussian"
                rawData={inaccuracy}
                fill="blue"
            /> */}

            <XAxis />
            <YAxis />
        </ResponsiveHistogram>
    )
}

export default Histogram_BlundersTime
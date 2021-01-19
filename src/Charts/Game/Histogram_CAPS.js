import { useState, useEffect } from 'react'
import { GameStore } from "../../State/store";
import ResponsiveHistogram from "../ResponsiveHistogram";
import { XAxis, YAxis, BarSeries } from "@data-ui/histogram";
import { baseLabel } from '@data-ui/theme/lib/svgLabel'

const Histogram_CAPS = ({ height, width }) => {
  
  const [meanCAPS, setMeanCAPS] = useState(0)
  
  const games = GameStore((state) => state.Games);
  
  useEffect(() => {
    const reducer = (value, currObj) => value + (currObj.CAPS || 0)

    const total = games.reduce(reducer, 0)
    const count = games.length

    // console.log(total, count)
    setMeanCAPS(total / count)

  }, [games.length])
  
	console.log(meanCAPS)
  return (
    <ResponsiveHistogram
      ariaLabel="Histogram of Chess.com CAPS % Score"
      height={height}
      width={width}
      orientation="vertical"
      cumulative={false}
      binCount={10}
      binType="numeric"
      valueAccessor={datum => datum?.CAPS || 50}
      limits={[0, 100]}
      renderTooltip={({ event, datum, data, color }) => {
        // console.log(data)
        return (
        <div>
          <strong style={{ color }}>
            {datum.bin0} to {datum.bin1}
          </strong>
          <div>
            <strong>count </strong>
            {datum.count}
          </div>
          <div>
            <strong>cumulative </strong>
            {datum.cumulative}
          </div>
          <div>
            <strong>density </strong>
            {datum.density}
          </div>
          <div>
            <strong>MEAN: </strong>
            {meanCAPS.toFixed(1)}
          </div>
        </div>
      )
    }}
    >
      <BarSeries animated rawData={games} fill="red" />
      {/* <DensitySeries
          stroke="#e64980"
          showArea={true}
          smoothing={0.01}
          kernel="gaussian"
          rawData={blunders}
          fill="red"
      /> */}

      <XAxis
        label="Chess.com CAPS Score"
        axisStyles = {{
          label: {
            'bottom': {
              // ...xAxisStyles,
              ...baseLabel,
              fontSize: '18px',
              fill: 'black',
              y: '46'
            },
          }
        }}
        // labelProps={{
        //   // ...xAxisStyles,
        //   fontSize: "100px"
        // }}
      />
      <YAxis 
        label="Count"
        stroke="black"
        axisStyles = {{
          label: {
            'left': {
              // ...xAxisStyles,
              ...baseLabel,
              fontSize: '18px',
              fill: 'black',
              y: -35
            },
          }
        }}
      />
    </ResponsiveHistogram>
  );
};

// Histogram_CAPS.whyDidYouRender = true;

export default Histogram_CAPS;

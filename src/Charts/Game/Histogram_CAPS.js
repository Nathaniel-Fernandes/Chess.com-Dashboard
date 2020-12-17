import { store } from '../State/store'
import ResponsiveHistogram from '../ResponsiveHistogram';
import { XAxis,YAxis,BarSeries } from '@data-ui/histogram'

const Histogram_CAPS = () => {

  const games = store(state => state.Games)
 
    return (
      <ResponsiveHistogram
        ariaLabel=""
        height={400}
        width={600}
        orientation="vertical"
        cumulative={false}
        binCount={10}
        binType="numeric"
        valueAccessor={datum => datum.CAPS}
        renderTooltip={({ event, datum, data, color }) => (
            <div>
              <strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
              <div><strong>count </strong>{datum.count}</div>
              <div><strong>cumulative </strong>{datum.cumulative}</div>
              <div><strong>density </strong>{datum.density}</div>
            </div>
          )}
      >
      <BarSeries animated rawData={games} fill="red"/>
      {/* <DensitySeries
          stroke="#e64980"
          showArea={true}
          smoothing={0.01}
          kernel="gaussian"
          rawData={blunders}
          fill="red"
      /> */}
   
      <XAxis />
      <YAxis />
  </ResponsiveHistogram>
    )
};

export default Histogram_CAPS;
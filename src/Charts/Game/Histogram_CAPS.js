import { store } from "../../State/store";
import ResponsiveHistogram from "../ResponsiveHistogram";
import { XAxis, YAxis, BarSeries } from "@data-ui/histogram";
import { baseLabel } from '@data-ui/theme/lib/svgLabel'

const Histogram_CAPS = ({ height, width }) => {
  const games = store((state) => state.Games);
	// console.log(games)
  return (
    <ResponsiveHistogram
      ariaLabel="Histogram of Chess.com CAPS % Score"
      height={height}
      width={width}
      orientation="vertical"
      cumulative={false}
      binCount={10}
      binType="numeric"
      valueAccessor={(datum) => datum?.CAPS}
      limits={[0, 100]}
      renderTooltip={({ event, datum, data, color }) => (
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
        </div>
      )}
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

import { useEffect, useState } from 'react'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter, Legend } from 'recharts';
import { ResponsiveBar } from '@nivo/bar'
import { DateFromGame } from '../BusinessLogic/helpers';
import { store } from '../State/store'
import { ResponsiveHistogram } from './Moves/blunders';
import { Histogram, withParentSize, XAxis,YAxis,BarSeries,DensitySeries } from '@data-ui/histogram'


// const data = [{x: 1, y: 20}, {x: 2, y: 21},{x: 1.5, y: 15},{x: 4, y: 10},{x: 3, y: 25}];

// function formatXAxis(tickItem) {
//   // If using moment.js
//   return moment(tickItem).format('MMM Do YY')
// }

const CAPS_Histogram = () => {

  const games = store(state => state.Games)
 
    // console.log(bins)
    return (
      <ResponsiveHistogram
        ariaLabel="IDK what this does"
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

export default CAPS_Histogram;

     


// const defaultBin = {"10":0, "20":0,"30":0,"40":0,"50":0,"60":0,"70":0,"80":0,"90":0,"100":0}
// useEffect(() => {
//   setLoading(() => true)
//   setBins({...defaultBin})


//   for(let i = 0; i < data.length; i++) {
//     // console.log(i)
//       if(data[i].CAPS === undefined) { console.log(data[i].id)}


//       let bin = (Math.floor(data[i].CAPS/10) + 1) * 10;
//       // console.log(bin, bins[bin])
//       // bin = bin.toString()
//       setBins((prev) => {
//           // console.log(prev, bin, prev[bin], bin.toString())
//           return {...prev, [bin]: (prev[bin]+1)}
//       })
//   }
//   setLoading(() => false)
// }, [data])
// <ResponsiveBar 
// data={[
//     {id:  1, value: bins["10"]},
//     {id:  2, value: bins["20"]},
//     {id:  3, value: bins["30"]},
//     {id:  4, value: bins["40"]},
//     {id:  5, value: bins["50"]},
//     {id:  6, value: bins["60"]},
//     {id:  7, value: bins["70"]},
//     {id:  8, value: bins["80"]},
//     {id:  9, value: bins["90"]},
//     {id: 10, value: bins["100"]}
// ]}
// margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
// padding={0}
// // valueScale={{"type":"linear"}}
// xScale={{
//     type: "linear",
//     min: 0,
//     max: 100
// }}
// yScale={{
//     type:"linear",
//     max:'auto'
// }}
// colorBy="id"
// axisBottom={{
//     tickSize: 5,
//     tickPadding: 5,
//     tickRotation: 0,
//     legend: 'country',
//     legendPosition: 'middle',
//     legendOffset: 32
// }}
// axisLeft={{
//     tickSize: 5,
//     tickPadding: 5,
//     tickRotation: 0,
//     tickValues:5
// }}
// enableGridX={true}
// enableGridY={true}
// gridXValues={10}

// />
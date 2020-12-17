import React from 'react'
import  { ResponsiveScatterPlot } from '@nivo/scatterplot'

const Scatter = ({ data }) => {
	const margin = { top: 60, right: 140, bottom: 70, left: 90 };
	const xScale = { type: "time", format: "%m/%d/%Y %H:%M:%S", precision: "minute" }
	const yScale = { type: "linear", min: 0, max: 100 }
	const axisBottom = {
		orient: "bottom",
		tickSize: 5,
		tickPadding: 5,
		tickRotation: 0,
		format: "%b %d",
		tickValues: "every 2 days",
	}
	const axisLeft = {
		orient: "left",
		tickSize: 5,
		tickPadding: 5,
		tickRotation: 0,
		legend: "CAPS Score",
		legendPosition: "middle",
		legendOffset: -60,
	}
	const legends = [
		{
			anchor: "bottom-right",
			direction: "column",
			justify: false,
			translateX: 130,
			translateY: 0,
			itemWidth: 100,
			itemHeight: 12,
			itemsSpacing: 5,
			itemDirection: "left-to-right",
			symbolSize: 12,
			symbolShape: "circle",
			effects: [
			{
				on: "hover",
				style: {
				itemOpacity: 1,
				},
			},
			],
		},
	]

  	return (
		<ResponsiveScatterPlot
			data={data}
			margin={margin}
			xScale={xScale}
			xFormat="time:%Y-%m-%d"
			yScale={yScale}
			blendMode="multiply"
			axisTop={null}
			axisRight={null}
			axisBottom={axisBottom}
			axisLeft={axisLeft}
			legends={legends}
		/>
	);
};

export default Scatter;


{
    /* <ScatterChart width={600} height={400}>
  <CartesianGrid strokeDasharray="3 3" />
  <YAxis type="number" dataKey="CAPS" name="CAPS"/>
  <XAxis type="number" domain={["dataMin","dataMax"]} dataKey="date" name="Date"/>
  <Tooltip />
  <Scatter name="White" data={White} r={7} stroke="#000000" legendType="circle" fill="e5e4e2"/>
  <Scatter name="Black" data={Black} fill= "#33475b" />
  <Legend />
  </ScatterChart> */
  }
  
  // useEffect(() => {
  //   setWhite(() => [])
  //   setBlack(() => [])
  //   for(let i = 0; i < data.length; i++) {
  //     // console.log(i)
  //     if(data[i].color === "white") {
  //       setWhite((arr) => [...arr, data[i]])
  //       console.log(White, data[i])
  //     }
  //     else {
  //       setBlack((arr) => [...arr, data[i]])
  //       console.log(Black, data[i])
  //     }
  //   }
  //   console.log(White)
  //   console.log(Black)
  
  // },[]);
  
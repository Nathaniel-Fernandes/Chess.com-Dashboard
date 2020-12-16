import { useEffect, useState } from 'react'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter, Legend } from 'recharts';
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { DateFromGame } from '../BusinessLogic/helpers';
import { store } from '../State/store'

// const data = [{x: 1, y: 20}, {x: 2, y: 21},{x: 1.5, y: 15},{x: 4, y: 10},{x: 3, y: 25}];

// function formatXAxis(tickItem) {
//   // If using moment.js
//   return moment(tickItem).format('MMM Do YY')
// }

const CAPS_Scatter_Chart = () => {

  const data = store(state => state.Games)
  const [White, setWhite] = useState([]);
  const [Black, setBlack] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(() => true)
    setWhite([])
    setBlack([])

    for(let i = 0; i < data.length; i++) {
      // console.log(i)
      if(data[i].CAPS === undefined) { console.log(data[i].id)}
      if(data[i].color === 'white') {
        setWhite(prev => [...prev, {x:data[i].date, y:data[i].CAPS}])
      }
      else {
        setBlack(prev => [...prev, {x:data[i].date, y:data[i].CAPS}])
      }
    }

    console.log(White, Black)
    setLoading(() => false)
  }, [data])

  
  if(!loading) {
    // console.log(White, Black)
    return (
        <ResponsiveScatterPlot 
          data={[
            {id: 'white', data: White},
            {id: 'black', data: Black}
          ]}
          margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
        xScale={{
            type: 'time',
            format: '%Y-%m-%d %H:%M:%S',
            precision: 'minute',
        }}
          xFormat="time:%Y-%m-%d"
          yScale={{ type: 'linear', min: 0, max:100 }}
          // yFormat={function(e){return e+" cm"}}
          blendMode="multiply"
          axisTop={null}
          axisRight={null}
          axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              format: '%b %d',
              tickValues: 'every 2 days'

          }}
          axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'CAPS Score',
              legendPosition: 'middle',
              legendOffset: -60
          }}
          legends={[
              {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 130,
                  translateY: 0,
                  itemWidth: 100,
                  itemHeight: 12,
                  itemsSpacing: 5,
                  itemDirection: 'left-to-right',
                  symbolSize: 12,
                  symbolShape: 'circle',
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
        />
        

    )
  }
  else {
    return null
  }
};

export default CAPS_Scatter_Chart;

{/* <ScatterChart width={600} height={400}>
<CartesianGrid strokeDasharray="3 3" />
<YAxis type="number" dataKey="CAPS" name="CAPS"/>
<XAxis type="number" domain={["dataMin","dataMax"]} dataKey="date" name="Date"/>
<Tooltip />
<Scatter name="White" data={White} r={7} stroke="#000000" legendType="circle" fill="e5e4e2"/>
<Scatter name="Black" data={Black} fill= "#33475b" />
<Legend />
</ScatterChart> */}

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
import { Pie } from '@nivo/pie'

const PieChart = ({ data, width = 400, height = 400 }) => {
    const margin = { top: 40, right: 80, bottom: 80, left: 0 }
    const theme = { fontSize: "16px", fontWeight: 'bold'  }
    const borderColor = { from: 'color', modifiers: [ [ 'darker', '1.4' ] ] }
    const patterns = [
        {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true
        },
        {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
        }
    ]

    const legend = [
        {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 65,
            translateY: 0,
            itemsSpacing: 5,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'square',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000',
                        backgroundColor: '#FFFF00'
                    }
                }
            ]
        }]

    return (
        <Pie 
            data={data}
            width={width}
            height={height}
            margin={margin}
            padAngle={3}
            cornerRadius={2}
            innerRadius={0.5}
            sortByValue={true}
            enableRadialLabels={true}
            radialLabelsSkipAngle={10}
            radialLabelsLinkHorizontalLength={8}
            sliceLabelsSkipAngle={10}
            sliceLabelsSkipAngle={10}
            borderWidth={1}
            borderColor="#a17a5b"
            theme={theme}
            borderColor={borderColor}
            defs={patterns}
            fill={
                Object.keys(data).map((e) => {
                    console.log(e)
                    return {match: { id: data[e].id}, id: (e % 2 === 0) ? 'lines' : 'dots'}
                })
            }
            legends={legend}
        />
    )
}

export default PieChart;
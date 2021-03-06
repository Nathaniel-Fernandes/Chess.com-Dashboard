import { Pie } from '@nivo/pie'

const PieChart = ({ data, width, height, title, marginDef = false }) => {
    const margin = marginDef || { top: 40, right: 80, bottom: 50, left: (width < 520) ? 65 : 0 }

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
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 20,
            translateY: 30,
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

    // console.log(width, height)
    const Title = (data) => {
        // console.log(data)
        const style = {fontWeight: 'bold', fontSize: '19px'}

        // console.log(width, height)
        return (
            <text 
                x={data.centerX}
                y={-10}
                textAnchor="middle"
                style={style}
            >
                {title}
            </text>
        )
    } 

    // console.log(data)
    return (
        <Pie 
            data={data}
            width={width}
            height={height}
            margin={margin}
            padAngle={3}
            cornerRadius={2}
            innerRadius={0.5}
            // sortByValue={true}
            enableRadialLabels={false}
            radialLabelsSkipAngle={10}
            radialLabelsLinkHorizontalLength={8}
            radialLabelsLinkDiagonalLength={24}
            sliceLabelsSkipAngle={10}
            borderWidth={1}
            theme={theme}
            borderColor={borderColor}
            defs={patterns}
            layers={['slices', 'radialLabels', 'sliceLabels', 'legends', Title]}
            fill={
                Object.keys(data).map((e) => {
                    // console.log(e)
                    return {match: { id: data[e].id}, id: (e % 2 === 0) ? 'lines' : 'dots'}
                })
            }
            // legends={(width > 550) ? legend : false }
            legends={ legend }
			animate={false}

        />
    )
}

// PieChart.whyDidYouRender = true

export default PieChart;
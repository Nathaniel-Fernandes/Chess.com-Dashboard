import React from 'react'
import Game_Pie_Loss from './Game/Pie_Loss'
import AutoSizer from 'react-virtualized-auto-sizer'

const Chart = (props) => {

    return (
        <div>
            <AutoSizer>
                {
                    (({height, width}) => {
                        <Game_Pie_Loss height={height} width={width} />
                    }) 
                }
            </AutoSizer>
        </div>
    )
}

export default Chart;
import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import Game_Pie_Loss from '../Charts/Game/Pie_Loss'
import Game_Pie_Results from '../Charts/Game/Pie_Results'
import Game_Scatter_CAPS from '../Charts/Game/Scatter_CAPS'
import Game_Histogram_CAPS from '../Charts/Game/Histogram_CAPS'
import Move_Histogram_Ply from '../Charts/Moves/Histogram_MovePly'
import Move_Histogram_Time from '../Charts/Moves/Histogram_MoveTime'
import Opening_Data from '../Charts/Opening/opening'
import Tactics_Barchart from '../Charts/Tactics/Barchart_Tactics'
import Tactics_Barchart_Phases from '../Charts/Tactics/Barchart_TacticsPhases'

/*
    1. game_pie_loss, game_pie_results, game_scatter_caps, game_histogram_caps, 
    move_histogram_ply, move_histogram_time, opening_data_barchart, opening_data_sunburst, 
    tactics_barchart, tactics_barchart_phases
*/

const Chart = ({ chart }) => {
    const styles = {width: '100%'}

    // console.log(chartObj[chart])
    return (
        <div className="main-chart">
            <AutoSizer style={styles}>
                {
                    ({height, width}) => {
                        if(chart === "game_pie_loss") return <Game_Pie_Loss width={width} height={height} />;
                        if(chart === "game_pie_results") return <Game_Pie_Results width={width} height={height} />
                        if(chart === "game_scatter_caps") return <Game_Scatter_CAPS width={width} height={height} />
                        if(chart === "game_histogram_caps") return <Game_Histogram_CAPS width={width} height={height} />
                        if(chart === "move_histogram_ply_blunder") return <Move_Histogram_Ply width={width} height={height} type="blunder" x="percent"/>
                        if(chart === "move_histogram_ply_mistake") return <Move_Histogram_Ply width={width} height={height} type="mistake" x="percent"/>
                        if(chart === "move_histogram_ply_inaccuracy") return <Move_Histogram_Ply width={width} height={height} type="inaccuracy" x="percent"/>
                        if(chart === "move_histogram_time_blunder") return <Move_Histogram_Time width={width} height={height} type="blunder"/>
                        if(chart === "move_histogram_time_mistake") return <Move_Histogram_Time width={width} height={height} type="mistake"/>
                        if(chart === "move_histogram_time_inaccuracy") return <Move_Histogram_Time width={width} height={height} type="inaccuracy"/>
                        if(chart === "opening_data_barchart") return <Opening_Data width={width} height={height} type="barchart"  />
                        if(chart === "opening_data_sunburst") return <Opening_Data width={width} height={height} type="sunburst"  />
                        if(chart === "tactics_barchart") return <Tactics_Barchart width={width} height={height} />
                        if(chart === "tactics_barchart_phases") return <Tactics_Barchart_Phases width={width} height={height} />

                        return null
                    }
                }
             </AutoSizer> 
        </div>
    )
}

export default Chart;

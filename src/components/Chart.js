import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import GAME_PIE_LOSS from '../Charts/Game/Pie_Loss'
import GAME_PIE_RESULTS from '../Charts/Game/Pie_Results'
import GAME_SCATTER_CAPS from '../Charts/Game/Scatter_CAPS'
import GAME_HISTOGRAM_CAPS from '../Charts/Game/Histogram_CAPS'
import MOVE_HISTOGRAM_PLY from '../Charts/Moves/Histogram_MovePly'
import MOVE_HISTOGRAM_TIME from '../Charts/Moves/Histogram_MoveTime'
import OPENING_DATA from '../Charts/Opening/opening'
import TACTICS_BARCHART from '../Charts/Tactics/Barchart_Tactics'
import TACTICS_BARCHART_PHASES from '../Charts/Tactics/Barchart_TacticsPhases'
import { store } from '../State/store'

/*
    1. game_pie_loss, game_pie_results, game_scatter_caps, game_histogram_caps, 
    move_histogram_ply, move_histogram_time, opening_data_barchart, opening_data_sunburst, 
    tactics_barchart, tactics_barchart_phases
*/

const Chart = ({ chart, percentValue }) => {
    const styles = {width: '100%'}

    // so the grid/chart doesn't appear while data is being collected
    const analyzing = store(state => state.analysisStarted);
	const analysisPart = store(state => state.analysisPart)
    
    // console.log(analysisPart)

    return (
        <div className="main-chart">
            {(analyzing === false) && (analysisPart === 4) ?
                <AutoSizer style={styles}>
                    {
                        ({height, width}) => {
                            if(chart === "game_pie_loss")                  return <GAME_PIE_LOSS width={width} height={height} />;
                            if(chart === "game_pie_results")               return <GAME_PIE_RESULTS width={width} height={height} />
                            if(chart === "game_scatter_caps")              return <GAME_SCATTER_CAPS width={width} height={height} />
                            if(chart === "game_histogram_caps")            return <GAME_HISTOGRAM_CAPS width={width} height={height} />
                            if(chart === "move_histogram_ply_blunder")     return <MOVE_HISTOGRAM_PLY  x={percentValue} width={width} height={height} type="blunder" />
                            if(chart === "move_histogram_ply_mistake")     return <MOVE_HISTOGRAM_PLY  x={percentValue} width={width} height={height} type="mistake" />
                            if(chart === "move_histogram_ply_inaccuracy")  return <MOVE_HISTOGRAM_PLY  x={percentValue} width={width} height={height} type="inaccuracy" />
                            if(chart === "move_histogram_time_blunder")    return <MOVE_HISTOGRAM_TIME x={percentValue} width={width} height={height} type="blunder"/>
                            if(chart === "move_histogram_time_mistake")    return <MOVE_HISTOGRAM_TIME x={percentValue} width={width} height={height} type="mistake"/>
                            if(chart === "move_histogram_time_inaccuracy") return <MOVE_HISTOGRAM_TIME x={percentValue} width={width} height={height} type="inaccuracy"/>
                            if(chart === "opening_data_barchart")          return <OPENING_DATA width={width} height={height} type="barchart"  />
                            if(chart === "opening_data_sunburst")          return <OPENING_DATA width={width} height={height} type="sunburst"  />
                            if(chart === "tactics_barchart")               return <TACTICS_BARCHART width={width} height={height} />
                            if(chart === "tactics_barchart_phases")        return <TACTICS_BARCHART_PHASES width={width} height={height} />

                            return null
                        }
                    }
                </AutoSizer> : null
            }
        </div>
    )
}

// Chart.whyDidYouRender = true

export default Chart;

import React, { useState } from 'react'
import Chart from './Chart'
import ChartSidebar from './ChartSidebar';
import ChartTabs from './ChartTabs'
import '../App.css'
import TableComponent from './Table';
import ResourcesTab from '../Resources/ResourcesTab'


const ChartContainer = () => {

    const [tab, setTab] = useState('charts');
    const [chart, setChart] = useState('game_scatter_caps')

    // whether blunder_move_time/ply should use a percent of ply or value
    const [percentValue, setPercentValue] = useState('value')


    return (
        <div className="dashboard-center">
            <ChartTabs tab={tab} setTab={setTab} />

            { (tab === 'charts') ?
                [<div className="chart-container" key="11">
                    <Chart chart={chart} percentValue={percentValue} />
                    <ChartSidebar 
                        chart={chart} 
                        setChart={setChart}
                        percentValue={percentValue}
                        setPercentValue={setPercentValue} 
                    />
                </div>,<TableComponent chart={chart} key="12" />] : null
            }
            {
              (tab === 'resources') ?
               <ResourcesTab /> : null
            }
            

            
        </div>
    )
}

// ChartContainer.whyDidYouRender = true

export default ChartContainer
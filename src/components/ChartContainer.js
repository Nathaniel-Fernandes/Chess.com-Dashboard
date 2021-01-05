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

    return (
        <div className="dashboard-center">
            <ChartTabs tab={tab} setTab={setTab} />

            { (tab === 'charts') ?
                [<div className="chart-container" key="11">
                    <Chart chart={chart}/>
                    <ChartSidebar chart={chart} setChart={setChart} />
                </div>,<TableComponent chart={chart} key="12" />] : null
            }
            {
              (tab === 'resources') ?
               [<ResourcesTab />] : null
            }
            

            
        </div>
    )
}

ChartContainer.whyDidYouRender = true

export default ChartContainer
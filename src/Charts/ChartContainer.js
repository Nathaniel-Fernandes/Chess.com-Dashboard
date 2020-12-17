import React, { useState } from 'react'
import Chart from './Chart'
import ChartSidebar from './ChartSidebar';
import ChartTabs from './ChartTabs'
import '../App.css'

const ChartContainer = () => {

    const [Tab, setTab] = useState('charts');
    const [chart, setChart] = useState('Game_Pie_Loss')

    return (
        <div className="dashboard-center">
            <div className="chart-container">
                <ChartTabs setTab={setTab} />
                <Chart className="main-chart" chart={chart}/>
            </div>
            <ChartSidebar setChart={setChart} />
        </div>
    )
}

export default ChartContainer
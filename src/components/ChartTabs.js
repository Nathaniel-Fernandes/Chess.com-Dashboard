
const ChartTabs = ({tab, setTab}) => {

    return (
        <div className="chart-tabs" >
            <button onClick={() => setTab(() => 'charts')} className={tab === 'charts' ? 'active' : null}>Charts</button>
            <button onClick={() => setTab(() => 'insights')} className={tab === 'insights' ? 'active' : null}>Insights</button>
            <button onClick={() => setTab(() => 'resources')} className={tab === 'resources' ? 'active' : null}>Resources</button>
        </div>
    )
}

export default ChartTabs;
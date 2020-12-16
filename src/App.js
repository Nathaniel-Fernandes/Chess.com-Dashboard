import React, { useEffect, useState } from 'react';
import { initializeState } from "./BusinessLogic/Initialize";
import LoadForm from './components/LoadForm';
import { store } from './State/store';
import Scatter_CAPS from './Charts/Scatter_CAPS'
import Histo_CAPS from './Charts/Histo_CAPS'
import Pie_Reason4Loss from './Charts/Pie_Loss'
import Pie_Results from './Charts/Pie_Results'
import Chart from './Charts/Chart'
import Barchart_Tactics from './Charts/Barchart_Tactics'
import Barchart_TacticsPhases from './Charts/Barchart_TacticsPhases'
// import Sunburst_OpeningPercent from './Charts/Sunburst_OpeningPercent'
import Opening_Data from './Charts/Opening/opening'
import Histogram_BlundersTime from './Charts/Moves/blunders';
import Histogram_BlundersPly from './Charts/Moves/Histo_BlundersPly'

function App() {
	// useEffect(() => {
	// 	// load initial state
	// 	initializeState();

	// }, [])

	const loading = store(state => state.isLoading)

	const [initialized, setInitialized] = useState(false);
	const [popupBlocker, setPopupBlocker] = useState(false);
	
	const archive = store(state => state.GameArchive);
	const gameID_arr = store(state => state.Games);

	useEffect(() => {
		const t = window.open('','_blank');
		if(t === null || t === undefined || !t) {
			setPopupBlocker(true);
			return;
		}
		t.close();
		// setTimeout()
	},[])

  return (
    <div className="App">
      <header className="App-header">
        
      </header>


		{
			(popupBlocker) ? "Please disable your popup blocker" : ''
		}
		{
			(!initialized) ? <button onClick={() => {
				initializeState();
				console.log("initialization")
			}}>Click to Start</button> : ''
		}
		
		<p>{loading ? "Loading" : "View"}</p>
		<Chart>
			{/* {loading ? "loading" : <Histo_CAPS />} */}
			{loading ? "loading" : <Histogram_BlundersPly />}
		</Chart>		 
    </div>
  );
}

export default App;

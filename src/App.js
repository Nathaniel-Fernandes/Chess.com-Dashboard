import React, { useEffect, useState } from 'react';
import { initializeState } from "./BusinessLogic/Initialize";
import LoadForm from './components/LoadForm';
import { store } from './State/store';
import CAPS from './Charts/CAPS'

function App() {
	// useEffect(() => {
	// 	// load initial state
	// 	initializeState();

	// }, [])
	const [initialized, setInitialized] = useState(false)
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
		

		<p>{(store.getState().loading) ? "Loading" : "View"}</p>
		<ol>
			{archive.map(
				(e) => <li>{e}</li>
			)}
		</ol>
		<br />
		<ol>
			{gameID_arr.map(
				(e, key) => <li key={key}>{e.id}</li>
			)}
		</ol>

		 <CAPS />
    </div>
  );
}

export default App;

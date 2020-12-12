import React, { useEffect, useState } from 'react';
import { initializeState } from "./BusinessLogic/Initialize";
import LoadForm from './components/LoadForm';
import { store } from './State/store';

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
	  {/* initializeState */}
		{/* <LoadForm /> */}
		{
			(popupBlocker) ? "Please disable your popup blocker" : ''
		}
		{
			(!initialized) ? <button onClick={() => {
				initializeState()
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
				(e) => <li>{e.id}</li>
			)}
		</ol>


    </div>
  );
}

export default App;

import React, { useEffect } from 'react';
import { initializeState } from "./BusinessLogic/Initialize";
import LoadForm from './components/LoadForm';
import { store } from './State/store';

function App() {
	useEffect(() => {
		// load initial state
		initializeState();

	}, [])
	
	const archive = store(state => state.GameArchive);
	const gameID_arr = store(state => state.Games);



  return (
    <div className="App">
      <header className="App-header">
        
      </header>
		
		{/* <LoadForm /> */}

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

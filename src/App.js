import React, { useEffect, useState } from "react";
import { initializeState } from "./BusinessLogic/Initialize";
import { store } from "./State/store";
import NameHeader from "./components/NameHeader";
import ChartContainer from "./components/ChartContainer";
import Opening_Table from "./Tables/Table_Openings";
import UsernameForm from "./LoadingForms/UsernameForm";
import FormCard from './LoadingForms/Card'

function App() {
	const loading = store((state) => state.isLoading);
	console.log(loading);
	// const [initialized, setInitialized] = useState(true);
	const [popupBlocker, setPopupBlocker] = useState(false);

	useEffect(() => {
		const t = window.open("", "_blank");
		if (t === null || t === undefined || !t) {
		setPopupBlocker(true);
		return;
		}
		t.close();
		// setTimeout()
	}, []);
	// console.log(JSON.stringify(store.getState()))

	return (
		<>
			<div className="App">
				<FormCard />
				{loading ? (
					<button
					onClick={() => {
						initializeState();
						console.log("initialization");
					}}
					>
					Click to Start
					</button>
				) : (
					[<NameHeader />, <ChartContainer />]
				)}

				{popupBlocker ? "Please disable your popup blocker" : ""}

				<p>{loading ? "Loading" : "View"}</p>
			</div>
			{/* <div id="modal-root-form" /> */}
		</>
  );
}

export default App;

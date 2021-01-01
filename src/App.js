import React, { useEffect, useState } from "react";
import { store } from "./State/store";
import NameHeader from "./components/NameHeader";
import ChartContainer from "./components/ChartContainer";
import FormCard from './LoadingForms/Card'
import AnalysisProgress from './LoadingForms/AnalysisProgress'

function App() {
	const loading = store((state) => state.isLoading);
	const analyzing = store(state => state.analysisStarted);

	return (
		<>
			{ loading === true ? <FormCard /> :
				<div className="App">
					<p>{loading ? "Loading" : "View"}</p>
					<NameHeader />
					<ChartContainer />
				</div>
			}

			{
				analyzing === true ? <AnalysisProgress /> : null
			}
			{/* <AnalysisProgress /> */}

		</>
  );
}

export default App;

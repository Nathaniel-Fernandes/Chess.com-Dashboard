import React from "react";
import { store } from "./State/store";
import NameHeader from "./components/NameHeader";
import ChartContainer from "./components/ChartContainer";
import FormCard from './LoadingForms/Card'
import AnalysisProgress from './LoadingForms/AnalysisProgress'

function App() {
	const loading = store((state) => state.isLoading);
	const analyzing = store(state => state.analysisStarted);
	const analysisPart = store(state => state.analysisPart)


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
				analyzing === true || (analysisPart >= 1 && analysisPart <= 3)
					? <AnalysisProgress /> : null
			}

		</>
  );
}

export default App;

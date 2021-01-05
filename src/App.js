import React from "react";
import { store } from "./State/store";
import NameHeader from "./components/NameHeader";
import ChartContainer from "./components/ChartContainer";
import FormCard from './LoadingForms/Card'
import AnalysisProgress from './LoadingForms/AnalysisProgress'
import ThankYou from './Resources/thankYou'

function App() {
	const loading = store((state) => state.isLoading);
	const analyzing = store(state => state.analysisStarted);
	const analysisPart = store(state => state.analysisPart)

    console.log(analysisPart)


	return (
		<>
			{ loading === true ? <FormCard /> :
				<div className="App">
					<NameHeader />
					<ChartContainer />
					<ThankYou />

				</div>
			}

			{
				analyzing === true || (analysisPart >= 1 && analysisPart <= 3)
					? <AnalysisProgress /> : null
			}

		</>
  );
}

App.whyDidYouRender = true

export default App;

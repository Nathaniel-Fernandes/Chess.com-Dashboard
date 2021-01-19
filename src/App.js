import { useEffect } from "react"
import { store, DBStore, GenericStore } from "./State/store"
import NameHeader from "./components/NameHeader"
import ChartContainer from "./components/ChartContainer"
import FormCard from './LoadingForms/Card'
import AnalysisProgress from './LoadingForms/AnalysisProgress'
import ThankYou from './Resources/thankYou'

import Dexie from 'dexie';

function App() {
	const loading = GenericStore(state => state.isLoading);
	const analyzing = GenericStore(state => state.analysisStarted);
	const analysisPart = GenericStore(state => state.analysisPart)
	

	useEffect(() => {
		async function setupDatabse() {
			// See if there is already a database
			const databases = await Dexie.getDatabaseNames()
			console.log(databases)
			DBStore.getState().setDatabaseNames(databases)
		}

		setupDatabse().catch(err => console.log(err)); // this is top level catcher
		// console.log("hi")
	}, [])

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

// App.whyDidYouRender = true

export default App;

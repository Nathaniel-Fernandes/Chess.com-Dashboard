import { useEffect } from "react"
import { DBStore, GenericStore } from "./State/store"
import NameHeader from "./components/NameHeader"
import ChartContainer from "./components/ChartContainer"
import FormCard from './LoadingForms/Card'
import AnalysisProgress from './LoadingForms/AnalysisProgress'
import ThankYou from './Resources/thankYou'

function App() {
	const refreshCache = DBStore(state => state.refreshCount)
	const loading = GenericStore(state => state.isLoading);
	const analyzing = GenericStore(state => state.analysisStarted);
	const analysisPart = GenericStore(state => state.analysisPart)
	

	useEffect(() => {
		// get saved profiles
		// const savedProfiles = localStorage.getItem('chessint_saved_profiles')
		const getSavedProfiles = async () => {
			if('caches' in window) {
				await caches.keys().then(res => {
					const savedProfiles = res.filter(cacheName => cacheName.includes("-Dashboard-Store")).map(name => name.split('-')[0])
					DBStore.getState().setDatabaseNames(savedProfiles)
				}).catch(err => console.log(err))
			}
		}
		getSavedProfiles();
	}, [refreshCache])

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

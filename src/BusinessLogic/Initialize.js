import { GameStore, GenericStore } from '../State/store';
import { ArchiveURL } from './urls';
import { 
	ColorfromGame, 
	CreateURL, 
	GetURL, 
	IDfromURL, 
	ResultFromGame, 
	TimeControlFromGame, 
	TimeClassFromGame,
	DateFromGameSeconds,
	getOpponentfromGame,
	// addLogSelector, 
	addLog } from './helpers';
import { AnalyzeGame } from '../BusinessLogic/Analyze';

export const timeout = (ms = 5000) => { 
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const initializeState = () => {

	addLog("Starting Analysis")
	GenericStore.getState().setAnalysisStarted();
	

	// check if less then 100 games
	const maxGamesAllowed = GenericStore.getState().maxGamesAllowed;

	if (GameStore.getState().Games.length < maxGamesAllowed) {
		// console.log("hellow?")
		addLog("Collecting game IDs")
		addLog("Requesting game archive")

        GetURL(CreateURL(ArchiveURL, GenericStore.getState().UserName))
			.then((res, err) => {
					// primitive error handling
					if(err) { 
						// console.warn(err);
						addLog(`[ERROR] Failed to retrieve game archive for ${GenericStore.getState().UserName}`)
						return; 
					}
					else if(res.data.status === 404) return;

					GameStore.getState().setGameArchives(res.data.archives)		// think a synchronous call to update Archives
					// console.log(store.getState().GameArchive)				// prints out updated state
					
					return GameIDfromArchive().catch(err => console.log(err));
			})
			.then(async () => {
				GenericStore.getState().setAnalysisPart(2) // set part to "getting analysis data"
				const alreadyAnalyzed = GameStore.getState().receivedGameID;

				// console.log(maxGamesAllowed)

				for(let i = 0; i < maxGamesAllowed; i++) {
					// console.log(i)
					// This check will prevent duplicate analyses of games
					if(!alreadyAnalyzed.includes(GameStore.getState().Games[i].id)) {
						AnalyzeGame(GameStore.getState().Games[i])
									.catch(err => console.log(err));
						addLog(`[REQUEST] Data for Game ${GameStore.getState()?.Games?.[i]?.id}`)
					
						await timeout(1000);
					}
				}
			}
			).then(() => {
				// console.log(JSON.stringify(tacticsObj, null, '  '))
				addLog(`Finished loading games`)
				
				GenericStore.getState().setLoadingFalse();

				// store.getState().setAnalysisPart(3) // set part to "Finished!"
				GenericStore.getState().setAnalysisEnded();

			}).catch(err => {
				console.log(err)
			})
	}
}

/**
 * @description Adds the GameIDs to GameID array from the archive
 * @returns {void} A promise  
 * @todo don't hardcode # of games
 */
const GameIDfromArchive = async () => {
		// const addLog = store(state => state.setDebugLogs)

		GenericStore.getState().setAnalysisPart(1)
		addLog(`Extracting game id from archive`)


		// console.log("Current Store: ", store.getState())
		const maxGamesAllowed = GenericStore.getState().maxGamesAllowed;
		let archives = GameStore.getState().GameArchive;
		let i = archives.length - 1;
		let gamenum = GameStore.getState().Games.length;
		let games;

		// TESTS
		// 1. <100 games
		// 2. >100 games
		// 3. multiple archives
		while(archives[i] && i >= 0 && gamenum <= maxGamesAllowed) { 
			// console.log("GM top loop: ", gamenum)	
			
			// console.log(archives[i])

			await GetURL(archives[i])
				.then(res => {
					//  console.log(res.data)
					games = res.data.games

					//  console.log(games.length)

					for(let j = games.length - 1; j >= 0; j--) {
						// validation
						if(gamenum > maxGamesAllowed) {	break;	}	// break if exceed limit. In future not hardcode
						if(games[j].rules !== "chess") { continue; } // check if rules are chess or variant

						const id = IDfromURL(games[j].url);

						if (!GameStore.getState().Games.filter(obj => obj.id === id).length > 0) {
							// console.log('added')
							const color = ColorfromGame(games[j], GenericStore.getState().UserName);
							const result = ResultFromGame(games[j], color);
							const tc = TimeControlFromGame(games[j]);
							const tclass = TimeClassFromGame(games[j]);
							const date = DateFromGameSeconds(games[j].end_time, true);
							const opp = getOpponentfromGame(games[j], color)
						
						// FIX ME - this will not actually prevent duplicates b/c it's in an object form
						// if (!GameStore.getState().Games.filter(obj => obj.id === id).length > 0) { 	// could implement binarysearch in the future
							GameStore.getState().AddGame(id, color, result, tc, tclass, date, opp);
							gamenum += 1;
							GenericStore.getState().SetNeedAnalysis();	// performance optim: only do once
						}
						// console.log("GN in loop: ", gamenum)
					}
				})
				.catch(err => console.log(err))
			i--;	
		}
		
		addLog(`Finished extracting games`)
			// console.log("gameids state: ", store.getState().Games)

		// Analyze();
}
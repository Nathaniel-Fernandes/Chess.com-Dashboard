import { store } from '../State/store';
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
	store.getState().setAnalysisStarted();
	

	// check if less then 100 games
	const maxGamesAllowed = store.getState().maxGamesAllowed;

	if (store.getState().Games.length < maxGamesAllowed) {
		// console.log("hellow?")
		addLog("Collecting game IDs")
		addLog("Requesting game archive")

        GetURL(CreateURL(ArchiveURL, store.getState().UserName))
			.then((res, err) => {
					// primitive error handling
					if(err) { 
						console.warn(err);
						addLog(`[ERROR] Failed to retrieve game archive for ${store.getState().UserName}`)
						return; 
					}
					else if(res.data.status === 404) return;

					store.getState().setGameArchives(res.data.archives)		// think a synchronous call to update Archives
					console.log(store.getState().GameArchive)				// prints out updated state
					
					return GameIDfromArchive();
			})
			.then(async (res) => {
				store.getState().setAnalysisPart(2) // set part to "getting analysis data"

				for(let i = 0; i < maxGamesAllowed; i++) {
					AnalyzeGame(store.getState().Games[i]);
					console.log(`Request data Game ${i}`)
					addLog(`[REQUEST] Data for Game ${store.getState()?.Games?.[i]?.id}`)
					
					await timeout(1000);
				}
			}).then(() => {
				// console.log(JSON.stringify(tacticsObj, null, '  '))
				addLog(`Finished loading games`)
				
				store.getState().setLoadingFalse();

				store.getState().setAnalysisPart(3) // set part to "Finished!"
				store.getState().setAnalysisEnded();

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

		store.getState().setAnalysisPart(1)
		addLog(`Extracting game id from archive`)


		// console.log("Current Store: ", store.getState())
		const maxGamesAllowed = store.getState().maxGamesAllowed;
		let archives = store.getState().GameArchive;
		let i = archives.length - 1;
		let gamenum = store.getState().Games.length;
		let games;

		// TESTS
		// 1. <100 games
		// 2. >100 games
		// 3. multiple archives
		// (async _ => {
			while(archives[i] && i >= 0 && gamenum <= maxGamesAllowed) { 
				console.log("GM top loop: ", gamenum)	
				
				console.log(archives[i])

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
							const color = ColorfromGame(games[j], store.getState().UserName);
							const result = ResultFromGame(games[j], color);
							const tc = TimeControlFromGame(games[j]);
							const tclass = TimeClassFromGame(games[j]);
							const date = DateFromGameSeconds(games[j].end_time, true);
							const opp = getOpponentfromGame(games[j], color)
							
							// FIX ME - this will not actually prevent duplicates b/c it's in an object form
							if (!store.getState().Games.includes(id)) { 	// could implement binarysearch in the future
								store.getState().AddGame(id, color, result, tc, tclass, date, opp);
								gamenum += 1;
								store.getState().SetNeedAnalysis();	// performance optim: only do once
							}
							// console.log("GN in loop: ", gamenum)
						}
					})
				i--;	
			}
		
		addLog(`Finished extracting games`)
			// console.log("gameids state: ", store.getState().Games)

		// Analyze();
}
import { store } from '../State/store';
import { ArchiveURL } from './urls';
import { ColorfromGame, CreateURL, GetURL, IDfromURL, ResultFromGame, TimeControlFromGame, DateFromGame } from './helpers';
import { Analyze, AnalyzeGame } from '../BusinessLogic/Analyze';


export const initializeState = () => {
	// check if less then 100 games
	if (store.getState().Games.length < 100) {

        GetURL(CreateURL(ArchiveURL, store.getState().UserName))
			.then((res, err) => {
					// primitive error handling
					if(err) { console.warn(err); return; }
					else if(res.data.status === 404) return;

					store.getState().setGameArchives(res.data.archives)		// think a synchronous call to update Archives
					console.log(store.getState().GameArchive)				// prints out updated state
					
					return GameIDfromArchive();
			})
			.then((res) => {
				// for(let i = 0; i < 10; i++) {
					// AnalyzeGame(store.getState().Games[1]);
					// AnalyzeGame(store.getState().Games[2]);
					AnalyzeGame(store.getState().Games[0]);
				// }
			}) 
	}
}

/**
 * @description Adds the GameIDs to GameID array from the archive
 * @returns {void} A promise  
 * @todo don't hardcode # of games
 */
const GameIDfromArchive = async () => {
		console.log("Current Store: ", store.getState())
		let archives = store.getState().GameArchive;
		let i = archives.length - 1;
		let gamenum = store.getState().Games.length;
		let games;

		// TESTS
		// 1. <100 games
		// 2. >100 games
		// 3. multiple archives
		// (async _ => {
			while(archives[i] && i >= 0 && gamenum <= 100) { 
				console.log("GM top loop: ", gamenum)	
				
				console.log(archives[i])

				await GetURL(archives[i])
					.then(res => {
						//  console.log(res.data)
						games = res.data.games

						//  console.log(games.length)

						for(let j = 0; j < games.length; j++) {
							// validation
							if(gamenum > 100) {	break;	}	// break if exceed limit. In future not hardcode
							if(games[j].rules !== "chess") { continue; } // check if rules are chess or variant

							const id = IDfromURL(games[j].url)
							const color = ColorfromGame(games[j], store.getState().UserName)
							const result = ResultFromGame(games[j], color) 
							const tc = TimeControlFromGame(games[j])
							const date = DateFromGame(games[j]);
							
							if (!store.getState().Games.includes(id)) { 	// could implement binarysearch in the future
								store.getState().AddGame(id, color, result, tc, date);
								gamenum += 1;
								store.getState().SetNeedAnalysis();	// performance optim: only do once
							}
							// console.log("GN in loop: ", gamenum)
						}
					})
				i--;	
			}
			console.log("gameids state: ", store.getState().Games)

		// Analyze();
}
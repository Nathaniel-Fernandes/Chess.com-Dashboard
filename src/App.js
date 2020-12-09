import React, { useState, useEffect } from 'react'
import axios from "axios";
// import { atom, useAtom } from 'jotai';
import create from 'zustand';

// const { getState, setState, subscribe, destroy } = store

const store = create((set) => ({
	UserName: "speedyg6",
	
	GameArchive: [],
	setGameArchives: (archive) => set(state => ({ GameArchive: [...archive]})),

	GameIDs: [],
	AddGameID: (id) => set(state => ({ GameIDs: [...state.GameIDs, id].sort()})),

	GamesAllowed: 100,

	NeedAnalysis: true,
	SetNeedAnalysis: () => set(state => ({ NeedAnalysis: true}))
}))

const ArchiveURL = 'https://api.chess.com/pub/player/{}/games/archives';
const NewAnalysisURL = 'https://www.chess.com/analysis/game/live/{}?tab=report'
const GetAnalysisURL = 'https://www.chess.com/callback/analysis/game/live/{}/all'
const UserProfileURL = 'https://api.chess.com/pub/player/{}'

/**
 * @param {string} url the incomplete url
 * @param {string | number} id the id to fill the url
 */
const CreateURL = (url, id) => {
	return url.replace("{}", id);
}

// const UserName = atom("speedyg2");
// const GameArchive = atom([])
// const GameIDs = atom([])

const initializeState = () => {
	// const archives = []
	// get the archive
	// const [username] = useAtom(UserName);
	// console.log(UserName.read(), GameArchive, GameIDs)
	if (store.getState().GameIDs.length < 100) {
		axios.get(CreateURL(ArchiveURL, store.getState().UserName))
			.then(res => {
					if(res.data.status === 404) return;

					store.getState().setGameArchives(res.data.archives)
					console.log(store.getState().GameArchive)
					return GameIDfromArchive();
				})
			.then(
				console.log("Store gameidsm: ", store.getState().GameIDs)
			)
	}

}

/**
 * 
 * @param {string} url The URL with a Game ID in it 
 * @returns {number} The game id
 */
const IDfromURL = (url) => {
	const id = url.match(/\d{1,13}/g)

	if(id.length != 1) {
		throw {
			message: "IDfromURL to many matches",
			obj: id
		} 
	}

	return Number(id[0])
}

/**
 * 
 * @param {string} url The URL to get a response from
 * @returns
 */
const GetURL = async (url) => {
	return await axios.get(url);
}

const GameIDfromArchive = () => {
		console.log("Current Store: ", store.getState())
		let archives = store.getState().GameArchive;
		let i = archives.length - 1;
		let gamenum = store.getState().GameIDs.length;
		let games;

		// TESTS
		// 1. <100 games
		// 2. >100 games
		// 3. multiple archives
		(async _ => {
			while(archives[i] && i >= 0 && gamenum <= 100) { 
				console.log("GM top loop: ", gamenum)	
				
				console.log(archives[i])

				await GetURL(archives[i])
					.then(res => {
						//  console.log(res.data)
						games = res.data.games

						//  console.log(games.length)

						for(let j = 0; j < games.length; j++) {
							if(gamenum > 100) {
								break;
							}

							let id = IDfromURL(games[j].url)
							// console.log(id,)
							
							if (!store.getState().GameIDs.includes(id)) { 	// could implement binarysearch in the future
								store.getState().AddGameID(id);
								gamenum += 1;
								store.getState().SetNeedAnalysis();
							}
							// console.log("GN in loop: ", gamenum)
						}
					})
				i--;	
			}
			console.log("gameids state: ", store.getState().GameIDs)
		})()
}





function App() {
	// const [archives, setArchives] = useState([])
	// const [GameID, setGameID] = useState([])
	

	useEffect(() => {
		// load initial state
		initializeState();
		// get the archive
		// axios.get(`https://api.chess.com/pub/player/jacobsfrog/games/archives`)
		// 	.then(res => {
		// 			if(res.data.status === 404) return;
		// 			setArchives(res.data.archives);
		// 		}
		// 	).then(res => {
		// 		// console.log(archives);

		// 		let i = archives.length - 1;
		// 		let gamenum = GameID.length;
		// 		let games;

		// 		// TESTS
		// 		// 1. <100 games
		// 		// 2. >100 games
		// 		// 3. multiple archives
		// 		(async _ => {
		// 			while(archives[i] && i >= 0 && gamenum <= 100) { 
		// 				console.log("GM top loop: ", gamenum)	
						
		// 				console.log(archives[i])
		// 				await axios.get(archives[i])
		// 					.then(res => {
		// 						//  console.log(res.data)
		// 						games = res.data.games
		
		// 						//  console.log(games.length)
		
		// 						for(let j = 0; j < games.length; j++) {
		// 							if(gamenum > 100) {
		// 								break;
		// 							}
		
		// 							let id = games[j].url.match(/\d{1,12}$/g)
		// 							// console.log(id, ...id)
		
		// 							setGameID(prev => [...prev, ...id])
		// 							gamenum += 1;
		// 							console.log("GN in loop: ", gamenum)
		// 						}
		// 						console.log(GameID)
		// 					})
		
		// 				i--;	
		// 			}
		// 			console.log(GameID)
		// 		})()
		// 	})
				
			
		
				
				
			
		
	}, [])

	// useEffect(() => {
	
	// }, [archives])
	
	// useEffect(() => {
	// 	if(GameID.length >= 100) {
	// 	}
	// }, [GameID])


  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;

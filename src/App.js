import React, { useState, useEffect } from 'react'
import axios from "axios";


function App() {
	const [archives, setArchives] = useState([])
	const [GameID, setGameID] = useState([])
	

	useEffect(() => {
		// get the archive
		axios.get(`https://api.chess.com/pub/player/jacobsfrog/games/archives`)
			.then(res => {
					if(res.data.status === 404) return;
					setArchives(res.data.archives);
				}
			).then(res => {
				// console.log(archives);

				let i = archives.length - 1;
				let gamenum = GameID.length;
				let games;

				// TESTS
				// 1. <100 games
				// 2. >100 games
				// 3. multiple archives
				(async _ => {
					while(archives[i] && i >= 0 && gamenum <= 100) { 
						console.log("GM top loop: ", gamenum)	
						
						console.log(archives[i])
						await axios.get(archives[i])
							.then(res => {
								//  console.log(res.data)
								games = res.data.games
		
								//  console.log(games.length)
		
								for(let j = 0; j < games.length; j++) {
									if(gamenum > 100) {
										break;
									}
		
									let id = games[j].url.match(/\d{1,12}$/g)
									// console.log(id, ...id)
		
									setGameID(prev => [...prev, ...id])
									gamenum += 1;
									console.log("GN in loop: ", gamenum)
								}
								console.log(GameID)
							})
		
						i--;	
					}
					console.log(GameID)
				})()
			})
				
			
		
				
				
			
		
	}, [])

	useEffect(() => {
	
	}, [archives])
	
	useEffect(() => {
		if(GameID.length >= 100) {
		}
	}, [GameID])


  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;

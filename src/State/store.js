import create from 'zustand';

/*
	Used Usernames:
	jacobsfrog
	speedyg2
	Brothersinparis
	johnletox
*/
export const store = create((set) => ({
	isLoading: true,
	setLoadingFalse: () => set(state => ({ isLoading: false })),

	analysisStarted: false,
	setAnalysisStarted: () => set(state => ({ analysisStarted: true})),
	setAnalysisEnded: () => set(state => ({ analysisStarted: false})),

	debugLogs: [],
	setDebugLogs: (log) => set(state => ({ debugLogs: [...state.debugLogs, log]})),
	
	analysisSteps: {
		0: "Starting process",
		1: "Collecting games",
		2: "Getting Analysis Data",
		3: "Requesting Chess.com Analysis",
		4: "Done! Please close."
	},
	analysisPart: 0,
	setAnalysisPart: (part) => { set(state => ({ analysisPart: part}))},

	receivedGameID: [],
	setReceivedGameID: (id) => set(state => ({ receivedGameID: [...state.receivedGameID, id]})),

	failedGameID: [],
	setFailedGameID: (id) => set(state => ({ failedGameID: [...state.failedGameID, id]})),

	NeedAnalysis: false,
	SetNeedAnalysis: () => set(state => ({ NeedAnalysis: true})),

	maxGamesAllowed: 50,

	UserName: "",
	setUsername: (username) => set(state => ({ UserName: username})),
	
	GameArchive: [],
	setGameArchives: (archive) => set(state => ({ GameArchive: [...archive]})),

	Games: [],
	AddGame: (id, color, result, tc, tclass, date, opponent) => set(state => ({ 
		Games: [...state.Games, {
			id:id,
			color:color, 
			result:result, 
			timecontrol: tc, 
			timeclass: tclass,
			date:date,
			opponent: opponent
		}]
	})),
	AddCAPStoGame: (id, CAPS) => {
		const temp = [...store.getState().Games]
		for(let i = 0; i < store.getState().Games.length; i++) {
			if(temp[i].id === id) {
				temp[i].CAPS = CAPS;
				set(state => ({
					Games: temp
				}))
				break;
			}
		}	
	},

	castled: [],
	addCastled: (record) => set(state => ({ castled: [...state.castled, record]})),

	opening: [],
	addOpening: (record) => set(state => ({ opening: [...state.opening, record]	})),

	blunder: [],
	mistake: [],
	inaccuracy: [],
	addMoveType: (movetype, record) => {
		const allowed = ["blunder", "mistake", "inaccuracy"];
		if(allowed.includes(movetype)) {
			set(state => ({[movetype]: [...state[movetype], record]}))
		}
	},

	gamePatterns: [],
	addGamePattern: (record) => set(state => ({ gamePatterns:[...state.gamePatterns, record]})),

	fork: [],
	mate: [],
	hanging: [],
	relativePin: [],
	absolutePin: [],
	trapped: [],
	underdefended: [],
	winningExchange: [],
	skewer:[],
	discovery: [],

	addTactic: (type, record) => {
		const allowed = [
			"fork", "mate", "hanging", "relativePin", "absolutePin", 
			"trapped", "underdefended", "winningExchange", "skewer", "discovery"];
		
		if(allowed.includes(type)) {
			set(state => ({[type]: [...state[type], record]}))
		}
		else {
			console.warn(`Tactic Type not allowed: ${type}`)
		}
	}

}))

/**
 * Structure of Tactics Data:
 * how to distinguish between missing tactic and getting it right?
 * 
 * missed_fork: { // + blunder fork as well?
 * 	 id: gameid
 *   ply: gameply (starts @ 0)
 *   color: yourcolor
 *   fen: (is it possible to get a fen string? -> eventually)
 *   time_left: seconds
 * 	 time_left: percentage
 *   time_spent: on move seconds
 * 	 gameresult: won/lost (1, 0)
 *   
 * }
 * 
 * got_fork {
 * 
 * }
 * 
 * castled {
 * 	 id: gameid
 *   castled: true/false
 *   ply:
 *   ply_percent:
 *   won: true/false
 * }
 * 
 * openings {
 * 	 id: gameid
 *   won: true/false
 *   caps: score
 *   date: dateplayed
 *   eco: eco // might be extraneous
 *   numberbookmoves: x
 * }
 * 
 * blunders/mistakes/inaccuracies {
 *   id:
 *   color:
 *   won: draw
 *   timeSpent: on move,
 *   timeLeft: 
 *   timeLeftPercent: 
 *   ply:
 *   plyPercent:
 *   phase: ofgame,
 *   fen: fen (eventually)
 * }
 */

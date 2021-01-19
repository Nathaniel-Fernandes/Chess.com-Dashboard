import create from 'zustand';

export const GenericStore = create(set => ({
	loadCachedState: (cached) => set(state => ({...state, ...cached})),

	maxGamesAllowed: 50,
	incMaxGamesAllowed: (amt = 50) => set(state => ({maxGamesAllowed: state.maxGamesAllowed + amt})),

	UserName: "",
	setUsername: (username) => set(state => ({ UserName: username})),

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

	NeedAnalysis: false,
	SetNeedAnalysis: () => set(state => ({ NeedAnalysis: true})),

}))

export const GameStore = create(set => ({
	loadCachedState: (cached) => set(state => ({...state, ...cached})),

	receivedGameID: [],
	setReceivedGameID: (id) => set(state => ({ receivedGameID: [...state.receivedGameID, id]})),

	failedGameID: [],
	setFailedGameID: (id) => set(state => ({ failedGameID: [...state.failedGameID, id]})),

		
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
		const temp = [...GameStore.getState().Games]
		for(let i = 0; i < GameStore.getState().Games.length; i++) {
			if(temp[i].id === id) {
				temp[i].CAPS = CAPS;
				set(state => ({
					Games: temp
				}))
				break;
			}
		}	
	},
}))

export const DataStore = create(set => ({
	loadCachedState: (cached) => set(state => ({...state, ...cached})),
	
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
		// else {
		// 	// console.warn(`Tactic Type not allowed: ${type}`)
		// }
	}
}))
export const DBStore = create(set => ({
		names: [],
		setDatabaseNames: (nameArr) => set(state => ({ names: nameArr})),

		refreshCount: 0,
		incRefreshCount: () => set(state => ({ refreshCount: state.refreshCount + 1})),


		totalGamesToday: 50,
		setTotalLimit: (amt = 50) => set(state => ({ totalGamesToday: state.totalGamesToday + amt})), 
		analysisDailyLimit: 100,

}))

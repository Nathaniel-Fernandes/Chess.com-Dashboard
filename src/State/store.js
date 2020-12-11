import create from 'zustand';

export const store = create((set) => ({
	UserName: "speedyg2",
	
	GameArchive: [],
	setGameArchives: (archive) => set(state => ({ GameArchive: [...archive]})),

	Games: [],
	AddGame: (id, color, result, tc, tclass, date) => set(state => ({ 
		Games: [...state.Games, {
			id:id,
			color:color, 
			result:result, 
			timecontrol: tc, 
			timeclass: tclass,
			date:date
		}].sort((a,b) => a.id - b.id)
	})),

	GamesAllowed: 100,

	NeedAnalysis: false,
	SetNeedAnalysis: () => set(state => ({ NeedAnalysis: true})),

	loading: true,
	setLoadingFalse: () => set(state => ({ isLoading: false })),

	castled: [],
	addCastled: (record) => set(state => ({ castled: [...state.castled, record]})),

	opening: [],
	addOpening: (record) => set(state => ({ opening: [...state.opening, record]	})),

	blunders: [],
	addBlunder: (record) => set(state => ({blunders: [...state.blunders, record]}))
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
 *   
 *   
 * }
 */

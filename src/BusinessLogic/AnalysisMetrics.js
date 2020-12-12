import { store } from '../State/store';
import { phase, plyPercent, calculateClockTime, totalFromTC } from './AnalyzeHelpers';

/**
* castled {
        id: gameid
        color
        castled: true/false,
        phase: open/middle/end
        ply:
        ply_percent:
        won: true/false
    }
*/
/**
 * 
 * @param {object} data The returned data object
 * @param {object} gameObj The game object
 */

export const AnalyzeCastle = ( data, gameObj ) => {

    const record = {
        id: gameObj.id, 
        color: gameObj.color, 
        won: (gameObj.result === "win") ? true : false,
        date: gameObj.date,
        castled: false,
        ply: -1,
        plyPercent: -1,
        phase: "NA",
    }

    let plyCastled = data.castled[gameObj.color];

    if(plyCastled != -1) { // -1 means did not castle
        plyCastled++;   // correct for TRUE ply (data starts @ 0 when should start at 1)

        record.castled = true;
        record.ply = plyCastled;
        record.plyPercent = plyPercent(plyCastled, data.totalPositions)
        record.phase = phase(plyCastled, data.gamePhases);
    }

    store.getState().addCastled(record);
    
    // console.log(store.getState().castled);
}

/**
 * blunder {
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

// export const AnalyzeBlunders = (data, gameObj) => {
//     let count = 0;
//     const p = data.positions;
//     let i = (p[0].color === gameObj.color) ? 0 : 1;
//     const totalBlunders = data.tallies.report[gameObj.color].blunder;

//     let recordProto = {
//         id: gameObj.id, 
//         color: gameObj.color, 
//         won: (gameObj.result === "win") ? true : false,
//         ply: -1,
//         plyPercent: -1,
//         phase: "NA",
//         timeSpent: -1,
//         timeToThink: -1,
//         timeToThinkPercent: -1
//     }

//     if(totalBlunders !== 0) {

//         while(count <= totalBlunders && i <= data.totalPositions - 2) {
//             if(p[i].classificationName === "blunder") {
//                 let record = {...recordProto};

//                 // console.log("index: ", i, p[i], record)


//                 record.ply = i + 1; // starts @ 0 so increment
//                 record.plyPercent = plyPercent(record.ply, data.totalPositions)
//                 record.phase = phase(record.ply, data.gamePhases);

//                 record.timeSpent = data.time.moves[i] / 10;
                
//                 record.timeToThink = calculateClockTime(data.time.moves, record.ply - 1, gameObj.timecontrol);
//                 record.timeToThinkPercent = record.timeToThink / totalFromTC(gameObj.timecontrol) * 100

//                 // console.log(record);
//                 store.getState().addBlunder(record);
//             }
//             i += 2;
//         }
//     }

//     console.log(store.getState().blunders)
// }

/**
 * 
 * @param {string} type "inaccuracy, mistake, blunder"
 * @param {object} data the analysis object
 * @param {object} gameObj the game object
 */
export const AnalyzeClassification = (type, data, gameObj) => {
	const allowed = ["blunder", "mistake", "inaccuracy"];
    if(!allowed.includes(type)) {
        throw {
            message: "invalid move type",
            type: type
        }
    }

    let count = 0;
    const p = data.positions;
    let i = (p[0].color === gameObj.color) ? 0 : 1;
    const totalType = data.tallies.report[gameObj.color][type];

    const recordProto = {
        id: gameObj.id, 
        color: gameObj.color, 
        won: (gameObj.result === "win") ? true : false,
        date: gameObj.date,
        eco: data.book.code,
        score: NaN,
        difference: NaN,
        scenarios: {},
        ply: -1,
        plyPercent: -1,
        phase: "NA",
        timeSpent: -1,
        timeToThink: -1,
        timeToThinkPercent: -1
    }

    if(totalType !== 0) {

        while(count < totalType && i <= data.totalPositions - 2) {
            if(p[i].classificationName === type) {
                let record = {...recordProto};

                // console.log("index: ", i, p[i], record)
                record.score = p[i].playedMove.score;
                record.difference = p[i].difference;
                record.scenarios = p[i].scenarios;

                record.ply = i + 1; // starts @ 0 so increment
                record.plyPercent = plyPercent(record.ply, data.totalPositions)
                record.phase = phase(record.ply, data.gamePhases);

                record.timeSpent = data.time.moves[i] / 10;
                
                record.timeToThink = calculateClockTime(data.time.moves, i, gameObj.timecontrol);
                record.timeToThinkPercent = record.timeToThink / totalFromTC(gameObj.timecontrol) * 100

                // **************************** COME BACK AND CHECK THIS
                // record.takeaway = {
                //     type: data.TEP.takeaways[i]?.[0].type, // need to check
                // }

                // console.log(record);
                store.getState().addMoveType(type, record);
                count++;
            }
            i += 2;
        }
    }

    // console.log(store.getState()[type])
}

// * openings {
//     * 	 id: gameid
//     *   won: true/false
//     *   caps: score
//     *   date: dateplayed
//     *   eco: eco // might be extraneous
//     *   numberbookply: x
//     *   
//     *   
//     * }
/**
 * 
 * @param {object} data The returned data object
 * @param {object} gameObj The game object
 */

export const AnalyzeOpenings = (data, gameObj) => {
    const record = {
        id: gameObj.id, 
        color: gameObj.color, 
        won: (gameObj.result === "win") ? true : false,
        date: gameObj.date,
        caps: data.CAPS[gameObj.color].all,
        eco: data.book.code,
        name: data.book.name,
        bookPly: data.bookPly,
    }

    store.getState().addOpening(record);
    // console.log(store.getState().opening);
}

/*
    pattern {
        id:
        won:
        color:
        [patternName]: {
            #ply:
            plyPercent:
            phase: [beg, mid, end]
        }
    }
*/
/**
 * 
 * @param {object} data The analysis data
 * @param {object} gameObj the game object
 */
export const AnalyzeGamePatterns = (data, gameObj) => {
    let record = {
        id: gameObj.id, 
        color: gameObj.color, 
        won: (gameObj.result === "win") ? true : false,
        eco: data.book.code,
        date: gameObj.date,
    }

    const d = data.TEP.moves[gameObj.color] // rename to make easier to work with

    for(const i in d) {     // 

        let p = new Array();
        for(const j of d[i]) {
            let phs = phase(j, data.gamePhases);
            if(!p.includes(phs)) { p.push(phs); }

            if(p.length === 3) break;   // shortcircuit if already complete

            // console.log(j, data.gamePhases, phs)
        }

        // let record = {...recordProto};
        record[i] = {
            plyPresent: i.length,
            PercentPresent: plyPercent(i.length, data.totalPositions),
            phase: p
        }
    }

    store.getState().addGamePattern(record)
    // console.log(store.getState().gamePatterns)
}


/*
    tactictype {
        id
        color
        won
        date
        ply
        plypercent
        timeSpent
        time2think
        t2t%
        phase
        spotted
        fen - eventually
        class - (blunder/missed)

    }
*/
export const AnalyzeAllTactics = (data, gameObj) => {
    AnalyzeTactics("fork", data, gameObj);
    AnalyzeTactics("mate", data, gameObj);
    AnalyzeTactics("material left undefended", data, gameObj)
    AnalyzeTactics("undefended material", data, gameObj)
    AnalyzeTactics("pin", data, gameObj)
    AnalyzeTactics("trapped piece", data, gameObj)

    console.log(
        store.getState().fork, 
        store.getState().mate,
        store.getState().hanging,
        store.getState().relativePin,
        store.getState().absolutePin,
        store.getState().trapped
    )
}

export const AnalyzeTactics = (name, data, gameObj) => {
    const tacticProto = {
        id: gameObj.id, 
        type: {
            name: name,
            type: "NA",
            group: "NA"
        },
        color: gameObj.color, 
        won: (gameObj.result === "win") ? true : false,
        date: gameObj.date,
        eco: data.book.code,
        eval: {},
        scenarios: {},
        ply: -1,
        plyPercent: -1,
        phase: "NA",
        timeSpent: -1,
        timeToThink: -1,
        timeToThinkPercent: -1,
        class: "NA",
    }

    const p = data.positions;
    const t = data.TEP.takeaways;

    for(const i in t) {
        // i = Number(i)

        const ele = t[i]?.[0]
        // console.log(t, t.i, i, typeof(i), ele, ele?.color)

        if (ele?.color === gameObj.color) {
            console.log(ele.type)

            if(SameTacticType(ele.type,name)) {
                let record = {...tacticProto};

                // console.log("index: ", i, p[i], record)
                record.type.type = ele.type;
                record.type.group = ele.group;

                record.eval = {
                    scoreAfter: p[i - 1].playedMove.score,
                    difference: p[i - 1].difference
                }
                record.scenarios = p[i - 1].scenarios;

                record.ply = i; // the actual game ply
                record.plyPercent = plyPercent(record.ply, data.totalPositions)
                record.phase = phase(record.ply, data.gamePhases);
    
                record.timeSpent = data.time.moves[i - 1] / 10;
                
                record.timeToThink = calculateClockTime(data.time.moves, i - 1, gameObj.timecontrol);
                record.timeToThinkPercent = record.timeToThink / totalFromTC(gameObj.timecontrol) * 100
    
                record.class = ele.class
    
                // console.log(record);
                UpdateTacticsState(name, record);
            }
        }
    }
}

export const SameTacticType = (actual, user) => {
    const regex = "\\b" + user + "\\b";
    const index = actual.toLowerCase().search(new RegExp(regex))

    // console.log(regex, actual, index)

    if (index !== -1) {
        return true;
    }

    return false;
    // ele.type.toLowerCase().indexOf(new RegExp("\b" + name + "\b",g)) !== -1
}

export const UpdateTacticsState = (name, record) => {
    if(name === "fork") { store.getState().addTactic(name, record); return; }
    if(name === "mate") { store.getState().addTactic("mate", record); return; }
    if(name === "material left undefended" || name === "undefended material") { 
        store.getState().addTactic("hanging", record); return; 
    }
    if(name === "trapped") { store.getState().addTactic("trapped",record); return;}
    
    if(name.includes("pin")) { 
        if(record.type.group.includes("relative") || record.type.type.includes("relative")) {
            store.getState().addTactic("relativePin", record); return; 
        }
        store.getState().addTactic("absolutePin", record); return; 
    }

    console.warn(name, record.id, record) // if gets here then it is a new type of tactic
}

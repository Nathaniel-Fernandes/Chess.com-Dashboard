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

    let plyCastled = data?.castled[gameObj.color];

    if(plyCastled === undefined || plyCastled === null || !(typeof(plyCastled) === "number")) {
        console.warn({
            message: "Ply castled is undefined (data.castled[gameObj.color])",
            id: gameObj.id,
            color: gameObj.color,
            plyCastled: plyCastled
        })
        return;
    }

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
 * 
 * @param {string} type "inaccuracy, mistake, blunder"
 * @param {object} data the analysis object
 * @param {object} gameObj the game object
 */
export const AnalyzeClassification = (type, data, gameObj) => {
    // constants
	const allowed = ["blunder", "mistake", "inaccuracy"];
    const p = data?.positions;
    const totalType = data?.tallies?.report?.[gameObj.color]?.[type];
    
    // input validation
    if(!allowed.includes(type)) {
        throw {
            message: "invalid move type",
            type: type
        }
    }

    if(p === undefined || p === null || !p) {
        console.warn({
            message: "positions is undefined",
            id: gameObj.id,
            color: gameObj.color,
            p: p
        })
        return;
    }
    if(totalType === undefined || totalType === null || !(typeof(totalType) === "number")) {
        console.warn({
            message: "totalType is undefined",
            id: gameObj.id,
            color: gameObj.color,
            totalType: totalType
        })
        return;
    }
    

    let count = 0;
    let i = (p[0].color === gameObj.color) ? 0 : 1;

    const recordProto = {   // perhaps extract this to a different file?
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
                let record = {...recordProto, scenarios: {...recordProto.scenarios}};

                // console.log("index: ", i, p[i], record)
                record.score = p[i].playedMove.score;
                record.difference = p[i].difference;
                record.scenarios = p[i].scenarios;

                record.ply = i + 1; // starts @ 0 so increment
                record.plyPercent = plyPercent(record.ply, data.totalPositions)
                record.phase = phase(record.ply, data.gamePhases);

                if(data.time) {
                    // console.log("id: ", gameObj.id, data)
                    record.timeSpent = data.time.moves[i] / 10;
                    record.timeToThink = calculateClockTime(data.time.moves, i, gameObj.timecontrol);
                    record.timeToThinkPercent = record.timeToThink / totalFromTC(gameObj.timecontrol) * 100
                }
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
    if(data?.book === undefined) {
        console.warn(`data.book undefined for ${gameObj.id} ${gameObj.color}`)
    }
    if(data?.bookPly === undefined) {
        console.warn(`data.book undefined for ${gameObj.id} ${gameObj.color}`)
    }

    if(data?.CAPS?.[gameObj.color]?.all === undefined) {
        console.warn(`data.CAPS is undefined for ${gameObj.id} ${gameObj.color}`)
    }

    const record = {
        id: gameObj.id, 
        color: gameObj.color, 
        won: (gameObj.result === "win") ? true : false,
        date: gameObj.date,
        caps: data?.CAPS?.[gameObj.color]?.all,
        eco: data?.book?.code,
        name: data?.book?.name,
        bookPly: data?.bookPly,
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


    const d = data?.TEP?.moves?.[gameObj.color] // rename to make easier to work with

    if(d === undefined || d === null || !d) {
        console.warn({
            message: "data.TEP.moves[gameObj.color] is undefined",
            id: gameObj.id,
            color: gameObj.color
        })
        return;
    }

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
const tacticProto = {
    id: gameObj.id, 
    type: {}, 
    name: "NA",
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
*/
// const getName
export const AnalyzeAllTactics2 = (data, gameObj) => {
    const KnownTacticsTypes = [
        "fork", "mate","material left undefended",
        "undefended material","pin","trapped piece",
        "under-defended material", "winning exchange",
        "skewer"
    ];

    const tacticProto = {
        id: gameObj.id, 
        color: gameObj.color, 
        won: (gameObj.result === "win") ? true : false,
        eco: data.book.code,
        date: gameObj.date,
        type: {
            name: "NA",
            type: "NA",
            group: "NA"
        }, 
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

    const p = data?.positions;
    const t = data?.TEP?.takeaways;

    if(p === undefined || p === null || !p) {
        console.warn({
            message: "positions is undefined",
            id: gameObj.id,
            color: gameObj.color,
            p: p
        })
        return;
    }

    if(t === undefined || t === null || !t) {
        console.warn({
            message: "takeaways is undefined",
            id: gameObj.id,
            color: gameObj.color,
            t: t
        })
        return;
    }

    for(let i in t) {
        i = Number(i)

        for(let j = 0; j < t[i].length; j++) {
            const ele = t[i]?.[j]

            // console.log(t, t.i, i, typeof(i), ele, ele?.color)
            if (ele?.color === gameObj.color) {
                // console.log(ele.type)

                // warn if type is not in the known array
                if(!KnownTacticsTypes.some((e) => SameTacticType(ele.type, e))) {
                    console.warn("Not included", ele.type, gameObj.id) // if gets here then it is a new type of tactic
                }

                else {
                    console.warn(ele.type)

                    let record = {...tacticProto,};

                    // console.log("index: ", i, p[i], record)
                    record.type = {
                        type: ele.type,
                        group: ele.group
                    }
                    // record.type.
                    // console.log(ele.type, ele.group)

                    record.eval = {
                        scoreAfter: p[i - 1].playedMove.score,
                        difference: p[i - 1].difference
                    }

                    record.scenarios = p[i - 1].scenarios;

                    record.ply = i; // the actual game ply
                    record.plyPercent = plyPercent(record.ply, data.totalPositions)
                    record.phase = phase(record.ply, data.gamePhases);
        
                    if(data.time) {
                        record.timeSpent = data.time.moves[i - 1] / 10;
                        record.timeToThink = calculateClockTime(data.time.moves, i - 1, gameObj.timecontrol);
                        record.timeToThinkPercent = record.timeToThink / totalFromTC(gameObj.timecontrol) * 100
                    } else {
                        console.log("id: ", gameObj.id, data)
                    }
                    record.class = ele.class;
        
                    UpdateTacticsState(ele.type, record);
                }
            }
        }
    }

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
// export const AnalyzeAllTactics = (data, gameObj) => {
//     AnalyzeTactics("fork", data, gameObj);
//     AnalyzeTactics("mate", data, gameObj);
//     AnalyzeTactics("material left undefended", data, gameObj)
//     AnalyzeTactics("undefended material", data, gameObj)
//     AnalyzeTactics("pin", data, gameObj)
//     AnalyzeTactics("trapped piece", data, gameObj)

//     console.log(
//         store.getState().fork, 
//         store.getState().mate,
//         store.getState().hanging,
//         store.getState().relativePin,
//         store.getState().absolutePin,
//         store.getState().trapped
//     )
// }

/*
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
*/

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

// in major need of a refactoring
export const UpdateTacticsState = (name, record) => {
    name = name.toLowerCase();
    // console.log(name)

    if(SameTacticType(name, "trapped piece")) { 
        record.type.name = "trapped";
        store.getState().addTactic("trapped",record); return;
    }

    if(SameTacticType(name, "skewer")) { 
        record.type.name = "skewer";
        store.getState().addTactic("skewer",record); return;
    }

    if(SameTacticType(name,"fork")) {
        // console.log("added fork", record)
        // console.log(record.type.type)
        // console.log(re)
        record.type.name = "fork"; 
        store.getState().addTactic("fork", record); return; 
    }

    if(SameTacticType(name,"mate") || SameTacticType(record.type.group, "checkmate")) { 
        record.type.name = "mate"; 
        store.getState().addTactic("mate", record); return; 
    }
    if(SameTacticType(name,"material left undefended") || SameTacticType(name, "undefended material")) { 
        // console.log("added hanging", record)
        record.type.name = "hanging";
        store.getState().addTactic("hanging", record); return; 
    }
    

    if(SameTacticType(name, "under-defended material")) {
        record.type.name = "underdefended";
        store.getState().addTactic("underdefended", record); return;
    }

    if(SameTacticType(name, "winning exchange")) {
        // console.log("adding winning exchange")
        record.type.name = "winning exchange";
        store.getState().addTactic("winningExchange", record); return;
    }

    if(name.includes("pin")) { 
        if(record.type.group.includes("relative") || record.type.type.includes("relative")) {
            record.type.name = "relative pin";
            store.getState().addTactic("relativePin", record); return; 
        }
        record.type.name = "absolute pin";
        store.getState().addTactic("absolutePin", record); return; 
    }
}

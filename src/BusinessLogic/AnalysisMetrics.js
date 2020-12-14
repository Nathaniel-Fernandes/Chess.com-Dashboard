import { store } from '../State/store';
import { phase, plyPercent, calculateClockTime, totalFromTC, SameTacticType, UpdateTacticsState, oppositeColor } from './AnalyzeHelpers';
import { GetCurrentFen } from './fen';
import { CreateRecordProto, CreateTacticRecord } from './RecordPrototypes';

export const AddCaps = (data, gameObj) => {
    const caps = data?.CAPS?.[gameObj.color]?.all;
    if(caps === undefined) {
        console.warn(`data.CAPS is undefined for ${gameObj.id} ${gameObj.color}`);
        return;
    }

    store.getState().AddCAPStoGame(gameObj.id, caps)
    console.log(store.getState().Games)
}

/**
 * 
 * @param {object} data The returned data object
 * @param {object} gameObj The game object
 */

export const AnalyzeCastle = ( data, gameObj ) => {

    const record = CreateRecordProto(data, gameObj);
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
        
        record.fen = GetCurrentFen(data, record.ply, record.id)
    } else {
        record.castled = false;
    }

    store.getState().addCastled(record);
    console.log(store.getState().castled);
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
    const recordProto = CreateRecordProto(data, gameObj);

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

                record.fen = GetCurrentFen(data, record.ply, record.id)

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

    console.log(store.getState()[type])
}

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

    const record = CreateRecordProto(data, gameObj);
          record.caps = data?.CAPS?.[gameObj.color]?.all;
          record.name = data?.book?.name;
          record.bookPly = data?.bookPly;
          record.lastBookFEN = GetCurrentFen(data, record.bookPly + 1, gameObj.id)

    store.getState().addOpening(record);
    // console.log(store.getState().opening);
}


/**
 * 
 * @param {object} data The analysis data
 * @param {object} gameObj the game object
 */
export const AnalyzeGamePatterns = (data, gameObj) => {

    const record = CreateRecordProto(data, gameObj);
    const d = data?.TEP?.moves?.[gameObj.color] // rename to make easier to work with

    if(d === undefined || d === null || !d) {
        console.warn({
            message: "data.TEP.moves[gameObj.color] is undefined",
            id: gameObj.id,
            color: gameObj.color
        })
        return;
    }

    for(const i in d) {

        let p = new Array();
        for(const j of d[i]) {
            let phs = phase(j, data.gamePhases);

            if(!p.includes(phs)) { p.push(phs); }
            if(p.length === 3) break;   // shortcircuit if already complete
        }

        record[i] = {
            plyPresent: i.length,
            PercentPresent: plyPercent(i.length, data.totalPositions),
            phase: p
        }
    }

    store.getState().addGamePattern(record)
    // console.log(store.getState().gamePatterns)
}

/**
 * 
 * @param {object} data The data analysis object
 * @param {object} gameObj The game object
 */
export const AnalyzeAllTactics = (data, gameObj) => {
    const KnownTacticsTypes = [
        "fork", "mate","material left undefended",
        "undefended material","pin","trapped piece",
        "under-defended material", "winning exchange",
        "skewer"
    ];

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

                    const record = CreateTacticRecord(i-1,ele,p,data,gameObj)
                    // console.log(record);
                    
                    UpdateTacticsState(ele.type, record);
                }
            } 
            // NEEDS a BUNCH of refactoring, but at least it works
            else if(oppositeColor(ele?.color) === gameObj.color && ele.class === "blunders") {
                console.log("first")
                if(!t[i + 1] || t[i + 1].length === 0) {
                    console.log("second")

                    if(p[i].playedMove.moveLan !== ele.eval.pv[0]) {
                        console.log("third")
                        if(p[i].classificationName === "blunder" || p[i].classificationName === "mistake") {
                            
                                console.log("final")

                                // passed all the checks so now add this 
                                // warn if type is not in the known array
                                if(!KnownTacticsTypes.some((e) => SameTacticType(ele.type, e))) {
                                    console.warn("Opp: Not included", ele.type, gameObj.id) // if gets here then it is a new type of tactic
                                }

                                else {
                                    console.log("fourth")
                                    console.warn("opp: ", ele.type)
                    
                                    const record = CreateTacticRecord(i,ele,p,data,gameObj,"missed")
                                    console.log(record)

                                    UpdateTacticsState(ele.type, record);
                                } 
                        }
        
                    } else { // they are equal so you got the tactic
                        console.log("final")

                        // passed all the checks so now add this 
                        // warn if type is not in the known array
                        if(!KnownTacticsTypes.some((e) => SameTacticType(ele.type, e))) {
                            console.warn("Opp: Not included", ele.type, gameObj.id) // if gets here then it is a new type of tactic
                        }

                        else {
                            console.log("fourth")
                            console.warn("opp: ", ele.type)
            
                            const record = CreateTacticRecord(i,ele,p,data,gameObj,"got")
                            console.log(record)

                            UpdateTacticsState(ele.type, record);
                        } 
                    }
                }
            }
        }
    }
}

export const AnalyzeEndgames = (data, gameObj) => {
    // const record = CreateRecordProto(data, gameObj);
    const d = data?.TEP?.endgames; // rename to make easier to work with

    if(d.length > 0) {
        console.warn(d)
    }
}
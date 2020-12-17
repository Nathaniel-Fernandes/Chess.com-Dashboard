import { plyPercent, phase, calculateClockTime, totalFromTC } from './AnalyzeHelpers'
import { GetCurrentFen } from './fen'

export const CreateRecordProto = (data, gameObj) => {

    return {
        id: gameObj.id, 
        color: gameObj.color, 
        won: (gameObj.result === "win") ? true : false,
        date: gameObj.date,
        eco: data.book.code,
        CAPS: gameObj.CAPS,
        opponent: gameObj.opponent,
        timeControl: gameObj.timecontrol
    }
}

export const CreateTacticRecord = (j, ele, p, data, gameObj, the_class = undefined) => {
    const record = CreateRecordProto(data, gameObj);

    // console.log("index: ", i, p[i], record)
    record.class = (the_class !== undefined) ? the_class : ele.class;
    record.type = {
        type: ele.type,
        group: ele.group
    }
    // record.type.
    // console.log(ele.type, ele.group)

    record.eval = {
        scoreAfter: p[j].playedMove.score,
        difference: p[j].difference
    }

    record.scenarios = p[j].scenarios;

    record.ply = j+1; // the actual game ply
    record.plyPercent = plyPercent(record.ply, data.totalPositions)
    record.phase = phase(record.ply, data.gamePhases);

    record.fen = GetCurrentFen(data, record.ply, record.id)


    if(data.time) {
        record.timeSpent = data.time.moves[j] / 10;
        record.timeToThink = calculateClockTime(data.time.moves, j, gameObj.timecontrol);
        record.timeToThinkPercent = record.timeToThink / totalFromTC(gameObj.timecontrol) * 100
    } else {
        console.log("Missing Date.Time for id: ", gameObj.id, data)
    }

    return record;
}

/* CASTLED
const CastledProto = {
    id: gameObj.id, 
    color: gameObj.color, 
    won: (gameObj.result === "win") ? true : false,
    date: gameObj.date,
    castled: false,
    ply: -1,
    plyPercent: -1,
    phase: "NA",
}


const AnalyzeClassificationProto = {   // perhaps extract this to a different file?
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

    #OPENING
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

    GamePatterns {
        id:
        won:
        color:
        [patternName]: {
            #ply:
            plyPercent:
            phase: [beg, mid, end]
        }
    }

    TACTICS
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
*/
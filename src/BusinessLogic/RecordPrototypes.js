export const CreateRecordProto = (data, gameObj) => {

    return {
        id: gameObj.id, 
        color: gameObj.color, 
        won: (gameObj.result === "win") ? true : false,
        date: gameObj.date,
        eco: data.book.code
    }
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
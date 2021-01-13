import { CreateURL, GetURL } from './helpers';
import { CorsProxy, GetAnalysisURL, NewAnalysisURL } from './urls'
import { store } from '../State/store'
import { addLog } from './helpers'
/**
 * 
 * @param {string|number} id The game id
 * @returns {promise} The game data
 * @todo Need better error handling
 */
export const getGameData = async (id, time = 1) => {
    // function input validation
    ValidGameID(id);
    if(time <= 0 || time >= 5) {

        throw new Error(JSON.stringify({
            message: "Invoked getGameData too many times",
            the_id: id,
            the_time: time
        }))
    }

    return getGameAnalysis(id)
            .then((res) => {
                // console.log("Game data: ", res.data)

                if(!res.data.data) {
                    if(time === 1) {
                        // console.log(id);
                        newAnalysis(id);
                        return new Promise((resolve) => {
                            setTimeout(() => { return resolve(getGameData(id,time+1))}, 61000)
                        })
                    }
                    else if (time < 3) {
                        console.warn(`Tried to retrieve game ${id} ${time} times`)
                        addLog(`Tried to retrieve game ${id} ${time} times`)

                        // if(time === 3) { newAnalysis(id); /* try to restart again */ }
                        newAnalysis(id);
                        
                        return new Promise((resolve) => {
                            setTimeout(() => { return resolve(getGameData(id,time+1))}, 61000)
                        })
                    }
                    else {
                        store.getState().setFailedGameID(id)
                        addLog(`[ERROR] Failed to retrieve game ${id} after 3 attempts`)
                        throw new Error(JSON.stringify({
                            message: `Could not retrieve game data got ${id} after 3 attempts`,
                            response: res.data
                        }))
                    }
                }
                // got data values
                else {
                    // console.log(`got data for: ${id}`)
                    addLog(`[SUCCESS] Got data for ${id}`)
                    store.getState().setReceivedGameID(id)
                    // console.log(res.data.data.analysis)
                    return res.data.data.analysis;
                }

            }).catch(err => {
                console.warn(err.message)
            });
}

/**
 * @description Opens window of the analysis report which should
 * start the analysis
 * @param {string|number} id The game id
 * @returns {void}
 */
export const newAnalysis = async ( id ) => {
    ValidGameID(id);

    return openWindow(CreateURL(NewAnalysisURL, id))
}

/**
 * @param {string} url opens window in new tab and closes tab after 5 seconds
 * @returns timer to close window
 * @todo add check if tab is null to handle the error
 */
export const openWindow = async ( url ) => {
    if (typeof(url) !== "string") {
        throw new Error(JSON.stringify({
            message: "URL is not a valid string",
            type: typeof(url),
            the_url: url
        }))
    }

    const tab = window.open(url, '_blank');
    
    return (tab !== null || !!tab) ? setTimeout(() => tab.close(), 15000) : null // 
}

/**
 * @param {number|string} id The id of the game
 * @returns {JSON} The json result of the request 
 * @throws Error if id not a number
 */
export const getGameAnalysis = async ( id ) => {
    // Check if input is valid
    ValidGameID(id);

    return GetURL(CreateURL(CorsProxy + GetAnalysisURL, id));
}

/**
 * 
 * @param {number|string} id checks if the GameID is valid
 */
export const ValidGameID = (id) => {
    if (isNaN(Number(id)) || Number(id) <= 1) {    // I believe 2 is the lowest game id
        throw new Error(JSON.stringify({
            message: "ID is not a valid number",
            type: typeof(id),
            the_id: id
        }))
    }
}

/**
 * 
 * @param {number} ply The ply to compare
 * @param {array} phaseArr The array of phases
 */
export const phase = (ply, phaseArr) => {
    ply = Number(ply);
    const numPhases = phaseArr.length;


    if(isNaN(ply) || ply < 0) {
        throw new Error(JSON.stringify({
            message: "Invalid ply.",
            ply: ply
        }))
    }


    if(numPhases === 0 || ply < phaseArr[0]) {
        return "open";
    } else if(numPhases === 1 || ply < phaseArr[1]) {
        return "middle";
    } 
    
    return "end";
}

/**
 * 
 * @param {number} ply The ply to compare
 * @param {number} total The total number of ply
 */
export const plyPercent = (ply, total) => {
    ply = Number(ply)
    total = Number(total)

    if(isNaN(ply) || isNaN(total)) {
        throw new Error(JSON.stringify({
            message: "Invalid ply or total ply",
            ply: ply,
            total: total
        }))
    } else if(ply < 0 || total < 0) {
        throw new Error(JSON.stringify({
            message: "Ply cannot be negative",
            ply: ply,
            total: total
        }))
    }

    if(total - 1 !== 0) {
        return (ply / (total - 1)) * 100 // total positions includes start so -1
    } 
    
    return (ply / total) * 100
}


/**
 * 
 * @param {string} timecontrol The time control
 */
export const totalFromTC = (timecontrol) => {
    return parseInt(timecontrol);
}

/**
 * 
 * @param {string} timecontrol The time control
 */
export const incFromTC = (timecontrol) => {
    let increment = parseInt(timecontrol.match(/\+\d*/g));
        increment = (increment) ? increment : 0;

    return increment;
}
/**
 * 
 * @param {array} data array of the time for each move
 * @param {number} ply The current ply
 * @param {string} timecontrol The time control of the game
 * @todo check if ply is valid
 */
export const calculateClockTime = (times, ply, timecontrol) => {
    const total = totalFromTC(timecontrol);
    const increment = incFromTC(timecontrol);

    if(isNaN(total) || total <= 0 || increment < 0) {
        throw new Error(JSON.stringify({
            message: "Invalid time control or increment",
            total: total,
            increment: increment
        }))
    }

    // if(ply) 


    let final = total;
    // console.log(final)
    // gives time NOT including the time for ply
    // i.e. calculates time on clock on start of ply
    for(let i = ply % 2; i < ply; i += 2) { 
        final = final - times[i] / 10 + increment;
        // console.log(final, times[i] / 10, increment)
    }

    return final;
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


/**
 * @description Returns the opposite color of parameter
 * @param {string} color The initial color
 */
export const oppositeColor = (color) => {
    // console.log(color.toLowerCase())
    if(color.toLowerCase() !== "white" && color.toLowerCase() !== "black") {
        console.warn({
            message: "Not a known color",
            color: color
        })
    }

    return (color === "white") ? "black" : "white";
}

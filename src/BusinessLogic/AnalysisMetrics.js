import { store } from '../State/store';
import { phase, plyPercent } from './AnalyzeHelpers';

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
        // if(data.totalPositions - 1 !== 0) {
        //     record.plyPercent = (plyCastled / (data.totalPositions - 1)) * 100 // total positions includes start so -1
        // } else {
        //     record.plyPercent = (plyCastled / data.totalPositions) * 100
        // }

        record.phase = phase(plyCastled, data.gamePhases);
    }

    store.getState().addCastled(record);
    
    console.log(store.getState().castled);
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

export const AnalyzeBlunders = (data, gameObj) => {
    let count = 0;
    const p = data.positions;
    let i = (p[0].color === gameObj.color) ? 0 : 1;
    const totalBlunders = data.tallies.report[gameObj.color].blunder;

    let recordProto = {
        id: gameObj.id, 
        color: gameObj.color, 
        won: (gameObj.result === "win") ? true : false,
        ply: -1,
        plyPercent: -1,
        phase: "NA",
        timeSpent: -1,
        timeLeft: -1,
        timeLeftPercent: -1
    }

    if(totalBlunders !== 0) {

        while(count <= totalBlunders && i <= data.totalPositions - 2) {
            if(p[i].classificationName === "blunder") {
                let record = recordProto;

                record.ply = i + 1; // starts @ 0 so increment
                record.plyPercent = plyPercent(record.ply, data.totalPositions)
                record.phase = phase(record.ply, data.gamePhases);
                record.timeSpent = data.time.moves[i] / 10;



            }
            i += 2;
        }
    }

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
    console.log(store.getState().opening);
}

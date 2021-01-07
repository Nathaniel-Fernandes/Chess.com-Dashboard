import axios from "axios";
import { store } from '../State/store'

export const mapTermToGameResult = (term) => {
    if(term === 'win') return 'win'
    if(term === 'resigned') return 'loss'
    if(term === 'timeout') return 'loss'
    if(term === 'checkmated') return 'loss'
    if(term === 'timevsinsufficient') return 'draw'

    return 'loss';
}

// export const addLogSelector = state => state.setDebugLogs
export const addLog = store.getState().setDebugLogs

/**
 * @param {string} url the incomplete url
 * @param {string | number} replacement the replacement to fill the url
 * @returns {string} the completed url
 */
export const CreateURL = (url, replacement) => {
	return url.replace("{}", replacement);
}

/**
 * 
 * @param {string} url The URL to get a response from
 * @returns {promise} Promise with requested url
 */
export const GetURL = async (url) => {
	// const config = {
	// 	// headers: {
	// 		// 'X-Contact': 'Chess Intellect (chessintellect.com)',
	// 		// 'Accept': 'application/json, text/plain, */*'
	// 	// }
	// }
	return axios.get(url);
}

/**
 * 
 * @param {string} url The URL with a Game ID in it 
 * @returns {number} The game id
 * @throws Error if too many matches (!= 1)
 */
export const IDfromURL = (url) => {
	const id = url.match(/\d{1,13}/g)

	if(id.length !== 1) {
		throw new Error(JSON.stringify({
			message: "IDfromURL to many matches",
			obj: id
		}))
	}

	return Number(id[0])
}

export const getOpponentfromGame = (gameObj, color) => {
	if(color === "white") {
		return gameObj?.black?.username;
	}

	return gameObj?.white?.username
}

/**
 * @param {string} username the players username
 * @param {object} gameObj The game object of a game
 */
export const ColorfromGame = (gameObj, uname) => {
	if(uname === gameObj.white.username) {
		return "white";
	}

	else if(uname === gameObj.black.username) {
		return "black";
	}

	else {
		throw new Error(JSON.stringify({
			message: "Cannot find username in game. Perhaps this is the wrong game ID",
			username: uname,
			white: gameObj.white.username,
			black: gameObj.black.username
		}))
	}
}

export const TimeControlFromGame = (gameObj) => {
	return gameObj.time_control;
}

export const TimeClassFromGame = (gameObj) => {
	return gameObj.time_class;
}

const dateWithTimeZone = (seconds) => {
	const date = new Date(1970,0,1);
		date.setSeconds(seconds)
	
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
	if(timeZone === undefined || timeZone === null || !timeZone) {
		return date;
	}

	const utcDate = new Date(date.toLocaleString('en-US', { timeZone: "UTC" }));
	const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timeZone }));
	const offset = utcDate.getTime() - tzDate.getTime();

	date.setTime( date.getTime() - offset );
  
	return date;
};

export const DateFromGameSeconds = (seconds, humanReadable = true) => {
	
	const d = dateWithTimeZone(seconds)

	if(humanReadable) {
		return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
	}

	const formatted = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`

	// console.log(formatted);
	return formatted;
	// return gameObj.end_time;
}

/**
 * 
 * @param {object} gameObj the game object of a game
 * @param {string} color the player's color
 */
export const ResultFromGame = (gameObj, color) => {
	// console.log(color)
	if(color !== "white" && color !== "black") {
		throw new Error(JSON.stringify({
			message: "Not a valid color",
			color: color
		}))
	}

	return gameObj[color].result;
}


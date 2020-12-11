import axios from "axios";

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
		throw {
			message: "IDfromURL to many matches",
			obj: id
		} 
	}

	return Number(id[0])
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
		throw {
			message: "Cannot find username in game. Perhaps this is the wrong game ID",
			username: uname,
			white: gameObj.white.username,
			black: gameObj.black.username
		}
	}
}

export const TimeControlFromGame = (gameObj) => {
	return gameObj.time_control;
}

export const DateFromGame = (gameObj) => {
	return gameObj.end_time;
}

/**
 * 
 * @param {object} gameObj the game object of a game
 * @param {string} color the player's color
 */
export const ResultFromGame = (gameObj, color) => {
	// console.log(color)
	if(color !== "white" && color !== "black") {
		throw {
			message: "Not a valid color",
			color: color
		}
	}

	return gameObj[color].result;
}


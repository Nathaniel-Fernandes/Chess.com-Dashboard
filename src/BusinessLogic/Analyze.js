import { getGameData, ValidGameID } from './AnalyzeHelpers';
import { store } from '../State/store';
import { AnalyzeCastle, AnalyzeOpenings } from './AnalysisMetrics';

/**
 * @description Analyzes the games
 * @param {string|number} id The id of the game to analyze
 */
export const AnalyzeGame = async (game) => {  
    // function input validation
    ValidGameID(game.id);

    const data = await getGameData(game.id);
    console.log("game: ", game)

    AnalyzeCastle(data, game);
    AnalyzeOpenings(data, game);
    
}



import { getGameData, ValidGameID } from './AnalyzeHelpers';
import { 
    AnalyzeCastle, 
    AnalyzeClassification, 
    AnalyzeOpenings,
    AnalyzeGamePatterns,
    AnalyzeAllTactics,
    AddCaps
} from './AnalysisMetrics';

/**
 * @description Analyzes the games
 * @param {string|number} id The id of the game to analyze
 */
export const AnalyzeGame = async (game) => {  
    // function input validation
    ValidGameID(game.id);

    const data = await getGameData(game.id);
    // console.log("game: ", game)

    if(!data) {
        throw new Error(JSON.stringify({
            message: `Data is undefined for ${game.id}`,
            data: data,
            game: game
        }))
        // just get this to request another game
    }

    AddCaps(data, game);
    AnalyzeCastle(data, game);
    AnalyzeOpenings(data, game);
    AnalyzeClassification("blunder", data,game);
    AnalyzeClassification("mistake", data,game);
    AnalyzeClassification("inaccuracy", data,game);
    AnalyzeGamePatterns(data,game);
    AnalyzeAllTactics(data, game);

}


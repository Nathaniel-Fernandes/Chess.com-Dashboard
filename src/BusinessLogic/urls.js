import axios from 'axios'
// axios.defaults.headers.common['User-Agent'] = 'Chess Intellect (chessintellect.com)'
// axios.defaults.headers.common['Accept'] = 'application/json, text/plain, */*'


export const ArchiveURL = 'https://api.chess.com/pub/player/{}/games/archives';
export const NewAnalysisURL = 'https://www.chess.com/analysis/game/live/{}?tab=report'
export const GetAnalysisURL = 'https://www.chess.com/callback/analysis/game/live/{}/all'
export const UserProfileURL = 'https://api.chess.com/pub/player/{}'
export const CorsProxy = 'https://mysterious-harbor-28403.herokuapp.com/'
export const ChesscomMembership = 'https://www.chess.com/membership?ref_id=9730606'
export const ChesscomLoginURL = 'https://www.chess.com/login_and_go?ref_id=9730606'


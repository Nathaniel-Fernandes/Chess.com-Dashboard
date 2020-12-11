export const ArchiveURL = 'https://api.chess.com/pub/player/{}/games/archives';
export const NewAnalysisURL = 'https://www.chess.com/analysis/game/live/{}?tab=report'
export const GetAnalysisURL = 'https://www.chess.com/callback/analysis/game/live/{}/all'
export const UserProfileURL = 'https://api.chess.com/pub/player/{}'

export const CorsProxy = 'https://mysterious-harbor-28403.herokuapp.com/'

// axios.interceptors.response.use(null, (error) => {
//     if (typeof error.response === 'undefined') {
        
//     }
//     return Promise.reject(error)
//   })
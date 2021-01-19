import { useState, useEffect } from 'react'
import { DBStore, GenericStore, GameStore, DataStore } from '../State/store'
import { FaInfoCircle } from 'react-icons/fa'
import { initializeState } from '../BusinessLogic/Initialize'
// import Dexie from 'dexie'

const NameHeader = () => {
    const name = GenericStore(state => state.UserName);

    return (
        <div className = "name-header">
            <h2>
                Hello {name}!
            </h2>
            <NameHeaderButton />
        </div>

    )
}

const chooseTooltipMessage = (trigger) => {
    const messages = {
        AnalyzeSignedOut: "Please sign in. Guests can only analyze 50 games at once. (Refresh for changes to take effect)",
        AnalyzeMaxLimit: "You can only analyze 200 games per day. See you tomorrow!",
        Info: "The data is saved to your browser's cache. YOU WILL LOSE all your data if you clear the browser's cookies/cache. Export the data if you want to save it permanently.",
        DataSaved: "Data saved!"
    }
    // console.log(trigger, messages[trigger])
    return messages[trigger] || '';
}

const NameHeaderButton = () => {
    const [signedIn, setSignedIn] = useState(false)
    const [tooltip, setTooltip] = useState('')
    const [showTooltip, setShowTooltip] = useState(false)

    useEffect(() => {
        if(document.body.classList.contains('logged-in')) {
            setSignedIn(true);
        }
    },[])


    const handleAnalyzeMoreFocus = () => {
        if(!signedIn) {
            setShowTooltip(true)
            setTooltip(chooseTooltipMessage("AnalyzeSignedOut"))
        }
    }

    const handleInfoClick = () => {
        setShowTooltip(true)
        setTooltip(chooseTooltipMessage("Info"))
    }

    const handleSaveClick = () => {
        saveStateToCache();
        setShowTooltip(true)
        setTooltip(chooseTooltipMessage("DataSaved"))
    }

    return (
        <div className={`${signedIn ? '' : 'name-header-disabled'}`}>
            <button onClick={() => AnalyzeMoreGames(signedIn, setShowTooltip, setTooltip)} onFocus = {() => handleAnalyzeMoreFocus()} onBlur = {() => setShowTooltip(false)} 
                className="analyze-more">Analyze 50 more</button>

            {(signedIn === false) 
                ? <button className="save-cache-button" onClick={() => SignInToSaveButton()}>Sign in to Save</button>
                : <button className="save-cache-button" onClick={() => handleSaveClick()} onBlur = {() => setShowTooltip(false)}>Save</button>
            }
            <i tabIndex={1} onFocus = {() => handleInfoClick()} onBlur = {() => setShowTooltip(false)}>
                <FaInfoCircle/>
            </i>
            { (showTooltip) 
                ? <HeaderTooltip message={tooltip} /> : null
            }
        </div>
    )
}

const hitGameDailyLimit = () => {
    if(DBStore.getState().totalGamesToday >= DBStore.getState().analysisDailyLimit) {
        return true;
    }
    return false;
}

const AnalyzeMoreGames = (signedIn, setShowTooltip, setTooltip) => {
    // console.log('in here')
    if(!signedIn) return;
    // console.log('down here')

    if(hitGameDailyLimit()) {
        setTooltip(chooseTooltipMessage("AnalyzeMaxLimit"))
        setShowTooltip(true)
        return;
    }

    // otherwise analyze more games
    // 1. increase gamenum limit
    GenericStore.getState().incMaxGamesAllowed(50)
    DBStore.getState().setTotalLimit(50)
    // 2. Clear failed games
    // GameStore.getState().clearFailedGames();

    // 3. Begin the Initialization
    initializeState();
}

const HeaderTooltip = ({ message }) => {

    return (
        <>
            <br />
            <span className="name-header-tooltip">{message}</span>
        </>
    )
}


const saveStateToCache = async () => {
    // get username
    const userName = GenericStore.getState().UserName;

    if('caches' in window) { // if performance issues come up then will have to create way to not duplicate the stuff being serialized
        const dashboardCache = await caches.open(`${userName}-Dashboard-Store`)
        
        // Places the following files in the CACHE API (will migrate to INDEXDB if performance issues)
        const genericBlob = new Blob([JSON.stringify(GenericStore.getState())], {type: 'application/json'})
        const gameBlob = new Blob([JSON.stringify(GameStore.getState())], {type: 'application/json'})
        const dataBlob = new Blob([JSON.stringify(DataStore.getState())], {type: 'application/json'})

        dashboardCache.put(`${userName}_generic.json`, new Response(genericBlob))
        dashboardCache.put(`${userName}_game.json`, new Response(gameBlob))
        dashboardCache.put(`${userName}_data.json`, new Response(dataBlob))
    }
}

const SignInToSaveButton = () => {
    // 1. open login tab
    window.open("https://chessintellect.com/login-here/", "_blank");

    // 2. Save State to Cache
    saveStateToCache();
}

export default NameHeader;
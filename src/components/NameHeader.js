import { useState, useEffect } from 'react'
import { DBStore, GenericStore, GameStore, DataStore } from '../State/store'
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

const NameHeaderButton = () => {
    const [signedIn, setSignedIn] = useState(false)

    useEffect(() => {
        if(document.body.classList.contains('logged-in')) {
            setSignedIn(true);
        }
    },[])

    return (
        <>
            <button>Analyze 50 more</button>
            {(signedIn === false) 
                ? <button onClick={() => SignInToSaveButton()}>Sign in to Save</button>
                : <button onClick={() => SignInToSaveButton()}>Save</button>
            }
        </>
    )
}

const SignInToSaveButton = async () => {
    window.open("https://chessintellect.com/login-here/", "_blank");
    // addIndexDB();
    const userName = GenericStore.getState().UserName;
    const options = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    if('caches' in window) { // if performance issues come up then will have to create way to not duplicate the stuff being serialized
        const dashboardCache = await caches.open(`${userName}-Dashboard-Store`)
        
        // Places the following files in the CACHE API (will migrate to INDEXDB if performance issues)
        const genericBlob = new Blob([JSON.stringify(GenericStore.getState())], {type: 'application/json'})
        const gameBlob = new Blob([JSON.stringify(GameStore.getState())], {type: 'application/json'})
        const dataBlob = new Blob([JSON.stringify(DataStore.getState())], {type: 'application/json'})

        dashboardCache.put(`${userName}_generic.json`, new Response(genericBlob))
        dashboardCache.put(`${userName}_game.json`, new Response(gameBlob))
        dashboardCache.put(`${userName}_data.json`, new Response(dataBlob))

        // Add to local storage the names of saved profiles
        const lStorage = localStorage.getItem('chessint_saved_profiles')
        if( !lStorage ) {
            localStorage.setItem('chessint_saved_profiles', JSON.stringify([userName]))
        } else {
            const setStorage = new Set(JSON.parse(lStorage));
            setStorage.add(userName)

            localStorage.setItem('chessint_saved_profiles', JSON.stringify([...setStorage]))
        }
    }
}

// const addIndexDB = async () => {
//     const userName = GenericStore.getState().UserName;

//     DBStore.getState().setDB(new Dexie(`Dashboard-${userName}`))

//     let db = DBStore.getState().db

//     db.version(1).stores({
//         GenericStore: '&UserName',
//         GameStore: '++id',
//         castled: '',
//         opening: ,
//         blunder:,
//         mistake:
//         inaccuracy,
//         gamePatterns:,
//         fork: ,
//         mate:,
//         hanging: ,
//         relativePin: ,
//         absolutePin: ,
//         trapped: ,
//         underdefended: ,
//         winningExchange ,
//         skewer: ,
//         discovery: ,
//         fun
//     })
//     db.open().catch(e => console.warn("failed to open: ", e))
// }

// NameHeader.whyDidYouRender = true

export default NameHeader;
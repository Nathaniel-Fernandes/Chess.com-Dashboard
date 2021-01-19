import { useState, useEffect } from 'react'
import { store } from '../State/store'

const NameHeader = () => {
    const name = store(state => state.UserName);

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

const SignInToSaveButton = () => {
    window.open("https://chessintellect.com/login-here/", "_blank");
}

// NameHeader.whyDidYouRender = true

export default NameHeader;
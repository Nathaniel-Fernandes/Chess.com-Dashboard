import React, { useState } from 'react';
import { GetURL } from '../BusinessLogic/helpers';
import { ChesscomLoginURL, CorsProxy } from '../BusinessLogic/urls'

const chooseBackgroundColor = (loggedIn) => {
    if(loggedIn === true) {
        return {backgroundColor: "rgb(98, 169, 78)"}
    }
    else if(loggedIn === false) {
        return {backgroundColor: "#e03131"}
    }

    return null;
}

const ChesscomLogin = ({ setPage }) => {

    const [loggedIn, setLoggedIn] = useState(null)

    const resetValidation = () => {
        setLoggedIn(null);
    }


    return (
            <div className="username-form">
                <p className="chesscom-login-instructions" style={chooseBackgroundColor(loggedIn)}>{
                    (loggedIn === true) ? `Click to proceed.` :
                    "Click below and log into Chess.com."
                }</p>
                <p className="form-content">
                    <span title="Chess Intellect does NOT request any passwords. You must log in because Chess.com only lets logged-in members request new game analyses be created.">Why? </span>
                    <span title="You must be logged into Chess.com on the SAME browser window as the current Chessintellect.com tab. Don't login on a different browser window. Either open a new tab or click the button below to login."> Help!</span>
                </p>
                <p className="form-message">
                    You must sign in to Chess.com in the <b>same</b> browser window but a different tab. You must check this manually. You're good to go if you click the button below and are already logged in to your account. Otherwise, please login.
                </p>
                
                <div className="username-form-buttons">
                    <button onClick={() => setPage(page => page - 1)} className="grey-button">Back</button>
                    {loggedIn === true ? <button onClick={() => setPage(page => page + 1)} className="orange-button">Proceed</button> :
                        <button onClick={() => { setLoggedIn(true); window.open(ChesscomLoginURL, '_blank');}} className="orange-button">Log In</button>
                    }
                </div>
            </div>
    )
}

const testLoggedIn = async () => {
    const loggedIn = false;

    await GetURL(CorsProxy + 'https://www.chess.com/analysis/game/live/5687380484?tab=report')
          .then(res => {
              if(res.data.includes("Upgrade to Save") || res.data.includes("locked-message")) {
                  loggedIn = false;
              }
              else if(res.data.includes("Key Moments") || res.data.includes("Saved Analysis")) {
                  loggedIn = true
              }
              console.log(res.data)
          }).catch(err => {
              console.warn(err)
          })

    return loggedIn;
}


export default ChesscomLogin;
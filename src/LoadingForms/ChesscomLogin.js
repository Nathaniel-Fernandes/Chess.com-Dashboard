import React, { useState } from 'react';
import { CreateURL, GetURL } from '../BusinessLogic/helpers';
import { UserProfileURL } from '../BusinessLogic/urls';
import Portal from '../Portal'
import { ChesscomMembership } from '../BusinessLogic/urls'

const ChesscomLogin = ({ setPage }) => {

    const [loggedIn, setLoggedIn] = useState(null)

    const resetValidation = () => {
        setLoggedIn(null);
    }


    return (
            <div className="username-form">
                <p className="chesscom-login-instructions">{
                    // (premium === true) ? `Hello ${username}! Click to proceed` :
                    // (premium === false) ? `Only premium members allowed. Start a free trial!` :
                    // (valid === false) ? `That is not a valid username. Please try again` : "Please Enter Your Chess.com Username"
                    "Please click below and log into Chess.com."
                }</p>
                <p className="form-content">
                    <span title="Chess Intellect does NOT request any passwords. You must log in because Chess.com only lets logged-in members request new game analyses be created.">Why? </span>
                     <span title="You must be logged into Chess.com on the SAME browser window as the current Chessintellect.com tab. Don't login on a different browser window. Either open a new tab or click the button below to login."> Help!</span>
                </p>
                
                <div className="username-form-buttons">
                    <button onClick={() => setPage(page => page - 1)} className="grey-button">Back</button>
                    <button className="orange-button">Log In</button>
                    <button className="orange-button">Test Logged In</button>
                </div>

            </div>
    )
}


export default ChesscomLogin;
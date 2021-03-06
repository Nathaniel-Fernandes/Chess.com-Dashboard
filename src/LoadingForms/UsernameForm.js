import React, { useState } from 'react';
import { CreateURL, GetURL } from '../BusinessLogic/helpers';
import { UserProfileURL } from '../BusinessLogic/urls';
import { GenericStore, GameStore, DataStore, DBStore } from '../State/store'
import { ChesscomMembership } from '../BusinessLogic/urls'
import { FaTrashAlt } from 'react-icons/fa'

const UsernameForm = ({ setPage }) => {
    const databaseNames = DBStore(state => state.names) // put database name on store

    const [username, setUsername] = useState("")
    const [valid, setValid] = useState(null)
    const [premium, setPremium] = useState(null)

    const resetValidation = () => {
        setValid(null);
        setPremium(null);
    }

    const handleKeyPress = (e) => {
        setValid(null);
        setPremium(null);

        if(e.keyCode === 32) {
            e.preventDefault()
        }

        if(e.code === 'Enter' || e.code === "NumpadEnter") {
            validateUsername(e.target.value).catch(err => console.log(err));
            // console.log(e)
        }
    }
    const handleSetUsername = (e) => {
        if (e.target.value.includes(" ")) {
            const data = e.target.value.replace(/\s/g, "");
            setUsername(data)    
        }
        setUsername(e.target.value)
    }

    const validateUsername = async (username) => {
        let v = false; // v for valid

        const data = await GetURL(CreateURL(UserProfileURL, username))
                .then((res) => {
                    if(res.data.player_id) {
                        v = true
                    }
                    return res.data;
                })
                .catch(err => console.log(err));

        if(data?.status === "premium") {
            // console.log("premium: ", true)
            setPremium(true)
        }
        else if(v === true) {
            setPremium(false)
        }

        setValid(v)

        // console.log(false)
        return false;
    }

    const chooseBackgroundColor = (premium, valid) => {
        // console.log(premium, valid)
        if(premium === true) {
            return {backgroundColor: "rgb(98, 169, 78)"}
        }
        else if(premium === false || valid === false) {
            return {backgroundColor: "#e03131"}
        }

        return null;
    }

    return (
        <div className="username-form">
            <p className="username-form-instructions" style={chooseBackgroundColor(premium, valid)}>{
                (premium === true) ? `Hello ${username}! Click to proceed` :
                (premium === false) ? `Only premium Chess.com members allowed.` :
                (valid === false) ? `That is not a valid username. Please try again` : 
                "Please Enter Your Chess.com Username"
            }</p>
            { (premium === false) ?
                <p className="form-message">
                    Sadly you must be a premium member (<span title="Game Report Pro 
                    aggregates and analyzes the data that Chess.com stores from the analysis 
                    of your games. However, Chess.com only saves the analysis of premium members.">Why?</span>). 
                    Never fear! You can start a <b>free trial</b> and renew for as low as $2.42/month.
                    Alternatively, check out: <strong><a href="https://chessintellect.com/product-reviews/is-premium-chesscom-membership-worth-it/" target="_blank" rel="noreferrer">Is a Premium Chess.com Membership Worth it? [2021]</a></strong>
                </p> : null
            }
            {databaseNames.length > 0 && premium !== true && premium !== false && valid !== false ?
                
                <div className="saved-profiles">
                    <div className="message">
                        Continue as
                    </div>
                    <div className="profile-names">
                        {databaseNames.map(name => {
                        return (
                            <div className="profile-name">
                                <span onClick={() => loadProfile(name)}>
                                    {name}
                                </span>
                                <i onClick={() => clearCachedProfile(name)}><FaTrashAlt /></i>
                            </div>
                        )
                        })}
                    </div>
                </div>
                
            : null

            }
            {(premium !== true && premium !== false && valid !== false) ?
                <input 
                    onChange={handleSetUsername} 
                    onKeyDown={e => handleKeyPress(e)}
                    value={username}
                    placeholder="Chess.com username" 
                    type="text"
                    className="username-form-input"
                /> : null
            }

            <UsernameFormButtons 
                username={username}
                resetValidation={resetValidation}
                validateUsername={validateUsername}
                setPage={setPage}
                premium={premium} 
                valid={valid}
            />

        </div>
    )
}

const loadProfile = async (userName) => {
    // console.log(userName);
    // const Generic = 
    GenericStore.getState().loadCachedState(await caches.match(`${userName}_generic.json`).then(res => res.json()))
    GameStore.getState().loadCachedState(await caches.match(`${userName}_game.json`).then(res => res.json()))
    DataStore.getState().loadCachedState(await caches.match(`${userName}_data.json`).then(res => res.json()))
}

const clearCachedProfile = async (userName) => {
    caches.delete(`${userName}-Dashboard-Store`).then(console.log("successfully deleted!"))
    DBStore.getState().incRefreshCount();
}



const UsernameFormButtons = ({ setPage, username, resetValidation, validateUsername, premium, valid  }) => {
    const setUsername = GenericStore(state => state.setUsername)
    // const username_zustand = store(state => state.UserName)

    const nextPage = (u) => {
        setPage(page => page + 1)
        // console.log(username_zustand)
        setUsername(u)
        // console.log(username_zustand)
    }

    return (
        <div className="username-form-buttons">
            {
                (valid === false || premium === false) ? 
                    <button onClick={() => resetValidation()} className="grey-button">Retry</button> : null
            }
            {
                (valid === null && premium === null) ?
                <button onClick={() => validateUsername(username).catch(err => console.log(err))} className="orange-button">Validate</button> : null
            }
            {
                (valid === true && premium === false) ? 
                <button onClick={() => window.open(ChesscomMembership, '_blank')} className="green-button">Free Trial</button> : null
            }
            {
                (premium === true) ? <button onClick={() => nextPage(username)} className="orange-button">Proceed</button> : null
            }
            
        </div>
    )
}

// UsernameForm.whyDidYouRender = true

export default UsernameForm;
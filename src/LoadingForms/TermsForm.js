import React, { useState, useEffect } from 'react';
import { initializeState } from "../BusinessLogic/Initialize";
import { store } from '../State/store'

const chooseBackgroundColor = (agreed) => {
    if(agreed === true) {
        return {backgroundColor: "rgb(98, 169, 78)"}
    }

    return null;
}

const TermsForm = ({ setPage }) => {

    const [agreed, setAgreed] = useState(false)
    const [button1, setButton1] = useState(false)
    const [button2, setButton2] = useState(false)

    useEffect(() => {
        console.log("in here", button1, button2)
        if(button1 === true && button2 === true) {
            console.log("in double here")
            setAgreed(true)
        }
        else {
            setAgreed(false)
        }
    }, [button1, button2])

    console.log("agreed: ", agreed)
    return (
            <div className="username-form">
                <p className="username-form-instructions" style={chooseBackgroundColor(agreed)}>{
                    (agreed !== true) ? `Please agree to the Terms & Conditions.` :
                    "Start! Allow 5-10 min per 100 games"
                }</p>
                { agreed !== true ?
                    <div className="terms-conditions">
                        <div>
                            <input type="checkbox" id="access" checked={button1} onChange={() => setButton1(prev => !prev)} />
                            <label htmlFor="access">You allow Chess Intellect access to your Chess.com games and analysis reports.</label>
                        </div>
                        <div>
                            <input id="gameAnalysis" type="checkbox" checked={button2} onChange={() => setButton2(prev => !prev)} ></input>
                            <label htmlFor="gameAnalysis">If a game isn't previously analyzed, you want Chess Intellect to request that Chess.com analyzes that game on your behalf.</label>
                        </div>
                    </div> : null
                }
                
                
                {(agreed === true) ?
                    <p className="form-message">
                        We recommend you close all background programs/tabs to speed up the analysis. Chess Intellect may open a lot of windows - please do <b>NOT</b> close them manually. Thank you for using Game Report Pro! Please share your feedback :).
                    </p> : null
                }
                
                <div className="username-form-buttons">
                    <button onClick={() => setPage(page => page - 1)} className="grey-button">Back</button>
                    {agreed === true ? <button onClick={() => {store.getState().setLoadingFalse(); initializeState();}} className="orange-button">Proceed</button> : null  }
                </div>
            </div>
    )
}

TermsForm.whyDidYouRender = true

export default TermsForm;
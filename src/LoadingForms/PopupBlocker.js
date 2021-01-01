import React from 'react';

const chooseBackgroundColor = (popupBlocker, testing) => {
    if(testing === true) {
        return {backgroundColor:"#0091F7"}
    }
    else if(popupBlocker === false) {
        return {backgroundColor: "rgb(98, 169, 78)"}
    }
    else if(popupBlocker === true) {
        return {backgroundColor: "#e03131"}
    }

    return null;
}


const PopupBlockerForm = ({ setPage, popupBlocker, testPopup, timesTested, testing }) => {

    console.log(testing)
    // const [popupBlocker, setPopupBlocker] = useState(null)
    // const [testing, setTesting] = useState(false)

    return (
            <div className="username-form">
                <p className="chesscom-login-instructions" style={chooseBackgroundColor(popupBlocker, testing)}>{
                    (testing === true) ? `Testing ...` :
                    (popupBlocker === false) ? `You might be good to go :)` :
                    "Please allow popups for this site."
                }</p>

                { (timesTested === 0) ?
                    <p className="form-message">
                        <label>Why?</label>
                        To analyze your games, Chess Intellect will need to open different tabs. Your popup blocker will think these are "ads" and block them, thus preventing the analysis. 
                        <label>How?</label>These tutorials might be helpful: <a href="https://www.wikihow.com/Allow-Pop–ups" target='_blank'>WikiHow</a> and&nbsp;
                        <a href="https://support.lesley.edu/support/solutions/articles/4000009686-allowing-pop-ups-for-specific-sites" target="_blank">Lesley's IT Support</a>.
                        Click on the button below to test but it's <strong>not</strong> a 100% guarantee everything is working correctly. You might see a message like "One popup blocked." Please click it and select "Allow popups from chessintellect.com".
                    </p> :
                    <p className="form-message">
                        Your popup blocker might be disabled, but it's nearly impossible to programmatically check 
                        (especially if you're using Chrome). Feel free to continue! 
                        Come back to this step if the service doesn't work.
                    </p>
                }
                
                <div className="username-form-buttons">
                    <button onClick={() => setPage(page => page - 1)} className="grey-button">Back</button>
                    <button onClick={() => testPopup(e => e + 1)} className="orange-button">Test If Blocking</button>
                    {(popupBlocker === false || timesTested > 0) ? <button onClick={() => setPage(page => page + 1)} className="orange-button">Proceed</button> :
                        []
                    }
                </div>
            </div>
    )
}

export default PopupBlockerForm;
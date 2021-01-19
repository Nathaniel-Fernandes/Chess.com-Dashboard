import React, { useState, useEffect } from 'react';
import UsernameForm from './UsernameForm'
import ChesscomLogin from './ChesscomLogin'
import TermsForm from './TermsForm'
import PopupBlocker from './PopupBlocker'
import Portal from '../Portal'


const FormCard = () => {
    const [page, setPage] = useState(0)

	const [popupBlocker, setPopupBlocker] = useState(null);
    const [timesTested, setTimesTested] = useState(0)
    const [isTesting, setIsTesting] = useState(false)


    useEffect(() => {
        async function testing() {
        if(timesTested !== 0) {
            setIsTesting(true)

            await new Promise(res => setTimeout(() => res(1),3000)) 

            testPopup(setPopupBlocker).catch(err => console.log(err))
            setIsTesting(false)
        }}

        testing().catch(err => console.log(err))
		// t.close();
    }, [timesTested])


    return (
        <Portal rootRefID="modal-root-form">
            { 
                (page === 0) ? <UsernameForm setPage={setPage} /> :
                (page === 1) ? <ChesscomLogin setPage={setPage} /> : 
                (page === 2) ? <PopupBlocker 
                                    setPage={setPage} 
                                    popupBlocker={popupBlocker}
                                    testPopup={setTimesTested}
                                    timesTested={timesTested} 
                                    testing={isTesting}
                                /> :
                (page === 3) ? <TermsForm setPage={setPage} /> : null
            }

            <div className="form-page-counter">
                <div className={`${page === 0 ? "selected" : ''}`} />
                <div className={`${page === 1 ? "selected" : ''}`} />
                <div className={`${page === 2 ? "selected" : ''}`} />
                <div className={`${page === 3 ? "selected" : ''}`} />
            </div>
        </Portal>
    )
}

// FormCard.whyDidYouRender = true

export default FormCard;

const testPopup = async (setPopupBlocker) => {
    // const t = await new Promise(resolve => setTimeout(() => resolve(window.open("", "_blank")), 2500));
    const t = window.open("", '_blank');
    try {
        t.document.write("You are most likely good to go! Please close this tab and continue. (Popup opened by Chess Intellect)")
    } catch(err) {
        console.log(err)
    }

    // console.log(t)

    let blocked = await popupBlockerChecker.check(t).catch(err => console.log(err))
    // console.log(blocked)

    if(blocked === undefined) {
        if(t === null || t === undefined || !t) {
            blocked = true
        }
    }

    if (blocked === false) {
        setPopupBlocker(false);
    }
    else if (blocked === true) {
        setPopupBlocker(true)
        return;
    }
    // t.close()
}

const popupBlockerChecker = {
    check: async function(popup_window) {
        var scope = this;
        
        // console.log(popup_window)
        // console.log(scope)

        if (popup_window) {
            if(/chrome/.test(navigator.userAgent.toLowerCase())) {
                // console.log('path 1')
                
                // return new Promise(resolve => {
                    setTimeout(function () {
                        // return resolve(scope.is_popup_blocked(scope, popup_window))
                        return scope.is_popup_blocked(scope, popup_window)
                    },200);
                // })
                
            } else{
                // console.log('path 2')
                popup_window.onload = () => {
                    // console.log('path 2.25')
                   return scope.is_popup_blocked(scope, popup_window);
                };
            }

            // console.log('path 2.5')
        } else {
            // console.log('path 3')
            return scope.displayError();
        }
    },

    is_popup_blocked: function(scope, popup_window) {
        if ((popup_window.innerHeight > 0) === false){ 
            return scope.displayError();
        }
        // console.log('path 4')
        return false;
    },
    displayError: function(){
       alert("Popup Blocker is enabled! Please add this site to your exception list.");
       return true;
    }
};

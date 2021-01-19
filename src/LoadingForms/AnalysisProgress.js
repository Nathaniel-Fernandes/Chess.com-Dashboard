import React, { useEffect, useState, useRef } from 'react'
import Portal from '../Portal'
import PacmanLoader from 'react-spinners/PacmanLoader'
import { GenericStore, GameStore } from '../State/store'

const AnalysisProgress = () => {

    useEffect(() => {
        const root = document.querySelector('.ci-dashboard-grp')
        root.classList.add("inactivated")

        return () => root.classList.remove("inactivated") 
    }, [])

    return (
        <Portal rootRefID="modal-analysis-progress">
            <h1>Analysis in Progress</h1>
            <div className="loadingSpinner">
                <PacmanLoader color="#4A90E2"/>
            </div>

            <ProgressBar />
            <DebuggingLogs />
        </Portal>
    )
}

// AnalysisProgress.whyDidYouRender = true


export default AnalysisProgress;

const ProgressBar = () => {
    const analysisPart = GenericStore(state => state.analysisPart)
    const analysisSteps = GenericStore(state => state.analysisSteps)


    const maxGames = GenericStore(state => state.maxGamesAllowed)
    const numGameIDs = GameStore(state => state.Games)

    const receivedGameData = GameStore(state => state.receivedGameID.length)
    const failedGameData = GameStore(state => state.failedGameID.length)

    useEffect(() => {
        if(receivedGameData + failedGameData === maxGames) {
            GenericStore.getState().setAnalysisPart(4);
            // console.log(receivedGameData, failedGameData, maxGames)

        }
        // console.log(receivedGameData, failedGameData, maxGames)

    }, [receivedGameData, failedGameData])


    return (
        <div className="progress-bar">
            <progress max={maxGames} value={receivedGameData + failedGameData} />
            <span>
                { analysisPart === 1 ?
                    `${analysisSteps[1]}: ${numGameIDs.length}` :
                  analysisPart === 2 ?
                    `${analysisSteps[2]}` : 
                  analysisPart === 3 ?
                    `${analysisSteps[3]}` : 
                  analysisPart === 4 ?
                    `${analysisSteps[4]}` : null
                }
            </span>
        </div>
    )
}

const DebuggingLogs = () => {

    const logs = GenericStore(state => state.debugLogs)
    const [value, setValue] = useState('');
    const textAreaRef = useRef(null)

    useEffect(() => {
        
        if(logs.length !== 0) {
            setValue((e) => e + logs[logs.length - 1] + '\n')

            // update the scroll top of the textarea
            textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
        }
    }, [logs.length])


    return (
        <textarea readOnly={true} id="debug-logs" ref={textAreaRef} className="debugging-logs" value= {value} />
    )
}
import React, { useEffect, useState, useRef } from 'react'
import Portal from '../Portal'
import PacmanLoader from 'react-spinners/PacmanLoader'
import { store } from '../State/store'

const AnalysisProgress = () => {

    useEffect(() => {
        const root = document.getElementById('root')
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

export default AnalysisProgress;

const ProgressBar = () => {
    const analysisPart = store(state => state.analysisPart)
    const analysisSteps = store(state => state.analysisSteps)


    const maxGames = store(state => state.maxGamesAllowed)
    const numGameIDs = store(state => state.Games)

    const receivedGameData = store(state => state.receivedGameID.length)
    const failedGameData = store(state => state.failedGameID.length)

    useEffect(() => {
        if(receivedGameData + failedGameData === maxGames) {
            store.getState().setAnalysisPart(4);
        }
    }, [receivedGameData, failedGameData])

    // console.log(receivedGameData, failedGameData, maxGames)

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

    const logs = store(state => state.debugLogs)
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
        <textarea id="debug-logs" ref={textAreaRef} className="debugging-logs" value= {value} />
    )
}
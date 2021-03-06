import React, { useState, useEffect } from 'react'
import SUNBURST_ECO from './Sunburst_ECO'
import { DataStore } from '../../State/store'
import BARCHART_OPENINGS from './Barchart_Openings'



export const Opening_Data = ({ type, width, height }) => {
    // const defaultState = [{name:"White", children:[]}, {name:"Black",children:[]}]

    const data = DataStore(state => state.opening)

    const [loading, setLoading] = useState(true)
    const [white, setWhite] = useState([])
    const [black, setBlack] = useState([])

    useEffect(() => {
        setLoading(() => true)
        const w = {};
        const b = {};

        // console.log(data)
        data.filter((obj) => obj.color.toLowerCase() === "white").forEach((e, i, arr) => {
            if(w?.[e.eco]) {
                w[e.eco].value += 1
            } else {
                w[e.eco] = {
                    name: e.eco,
                    value: 1,
                    description: e.name,
                    total: arr.length,
                    won: 0,
                    loss: 0,
                }
            }

            if(e.won) w[e.eco].won += 1;
            else w[e.eco].loss += 1
        })

        data.filter((obj) => obj.color.toLowerCase() === "black").forEach((e, i, arr) => {
            // console.log(this)
            if(b?.[e.eco]) {
                b[e.eco].value += 1
            } else {
                b[e.eco] = {
                    name: e.eco,
                    value: 1,
                    description: e.name,
                    total: arr.length,
                    won: 0,
                    loss: 0
                }
            }

            if(e.won) b[e.eco].won += 1;
            else b[e.eco].loss += 1
        })

        setWhite(() => Object.values(w).sort((a, b) => b.value - a.value))
        setBlack(() => Object.values(b).sort((a, b) => a.value - b.value))
        setLoading(() => false)
    }, [data])

    // let randomNumberGenerator = 0;
    // useEffect(() => {
    //     randomNumberGenerator = seedrandom('random_number')

    // },[])

    if(!loading) {
        if(type.toLowerCase() === "sunburst") {
            return (
                <SUNBURST_ECO 
                    white={white} 
                    black={black} 
                    width={width} 
                    height={height} 
                    // rng={randomNumberGenerator}
                />
            )
        } 
        else if(type.toLowerCase() === "bar" || type.toLowerCase() === 'barchart') {
            return (
                <BARCHART_OPENINGS white={white} black={black} width={width} height={height} />
            )
        }
    }

    return null
}

// Opening_Data.whyDidYouRender = true

export default Opening_Data;
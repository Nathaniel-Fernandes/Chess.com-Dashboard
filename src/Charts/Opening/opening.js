import React, { useState, useEffect } from 'react'
import Sunburst_ECO from './Sunburst_ECO'
import { store } from '../../State/store'
import Barchart_Openings from './Barchart_Openings'


export const Opening_Data = ({ type, width, height }) => {
    // const defaultState = [{name:"White", children:[]}, {name:"Black",children:[]}]

    const data = store(state => state.opening)

    const [loading, setLoading] = useState(true)
    const [white, setWhite] = useState([])
    const [black, setBlack] = useState([])

    useEffect(() => {
        setLoading(() => true)
        const w = {};
        const b = {};

        // console.log(data)
        data.filter((obj) => obj.color.toLowerCase() === "white").map((e, i, arr) => {
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

        data.filter((obj) => obj.color.toLowerCase() === "black").map((e, i, arr) => {
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


    if(!loading) {
        if(type.toLowerCase() === "sunburst") {
            return (
                <Sunburst_ECO white={white} black={black} width={width} height={height} />
            )
        } 
        else if(type.toLowerCase() === "bar" || type.toLowerCase() === 'barchart') {
            return (
                <Barchart_Openings white={white} black={black} width={width} height={height} />
            )
        }
    }

    return null
}

export default Opening_Data;
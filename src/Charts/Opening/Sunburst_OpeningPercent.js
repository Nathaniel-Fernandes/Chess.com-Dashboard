// =============================
// DUPLICATE OF SUNBURST_ECO.JS
// =============================

// import React, { useState, useEffect } from 'react'
// import { store } from '../../State/store'
// import { ResponsiveSunburst } from '@nivo/sunburst'
// import { useTheme } from '@nivo/core'

// const Sunburst_OpeningPercent = () => {
//     // const defaultState = [{name:"White", children:[]}, {name:"Black",children:[]}]

//     const data = store(state => state.opening)
//     const [loading, setLoading] = useState(true)
//     const [white, setWhite] = useState([])
//     const [black, setBlack] = useState([])
//     const [nameLookUp, setName] = useState({})


//     useEffect(() => {
//         setLoading(() => true)
//         const w = {};
//         const b = {};
//         const n = {}

//         // console.log(data)
//         data.filter((obj) => obj.color.toLowerCase() === "white").map((e, i, arr) => {
//             if(w?.[e.eco]) {
//                 w[e.eco].value += 1
//             } else {
//                 w[e.eco] = {
//                     name: e.eco,
//                     value: 1,
//                     description: e.name,
//                     total: arr.length,
//                     won: 0,
//                     loss: 0,
//                 }
//             }
//             n[e.eco] = e.name

//             if(e.won) w[e.eco].won += 1;
//             else w[e.eco].loss += 1
//         })

//         data.filter((obj) => obj.color.toLowerCase() === "black").map((e, i, arr) => {
//             // console.log(this)
//             if(b?.[e.eco]) {
//                 b[e.eco].value += 1
//             } else {
//                 b[e.eco] = {
//                     name: e.eco,
//                     value: 1,
//                     description: e.name,
//                     total: arr.length,
//                     won: 0,
//                     loss: 0
//                 }
//             }
//             n[e.eco] = e.name

//             if(e.won) b[e.eco].won += 1;
//             else b[e.eco].loss += 1
//         })

//         setWhite(() => Object.values(w).sort((a, b) => b.value - a.value))
//         setBlack(() => Object.values(b).sort((a, b) => a.value - b.value))
//         setName(() => n)
//         // console.log("white", w, "black", b, n)
//         setLoading(() => false)

//     }, [])

//     const customPalette = ["#E8C1A0","#F47560","#F1E15B","#E8A838","#61CDBB","#97E3D5"]
//     const customPalette2 = ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"]
//     const pickCustomPalette = (palette) => {
//         const i = Math.floor(Math.random()*palette.length)
//         const color = palette[i]
//         console.log(i, color)

//         return color;
//     }
//     const pickWhiteBlack = (id) => {
//         if(id === "White") { 
//             return "#FFFFFF" 
//         }

//         return "#000000" 
//     }

//     if(!loading) {
//         const CustomTooltip = ({id, value, data}) => {
//             const theme = useTheme()
//             // console.log(nameLookUp)
//             return (
//                 <div style={{ ...theme.tooltip.container}}>
//                     <strong>Name:</strong> {data.description} <br />
//                     <strong>ECO:</strong> {id} <br />
//                     <strong>Played:</strong> {value} ({(value / data.total * 100).toFixed(1)}%) <br />
//                     <strong>Won:</strong> {data.won}   <br />
//                     <strong>Lost:</strong> {data.loss}
//                 </div>
                
//             )
//         }
//         // console.log(white)

//         return (
//             <ResponsiveSunburst
//                 data={
//                     {
//                         name: "Openings",
//                         children: [
//                             {
//                                 name: "White", 
//                                 color:"#FFFFFF", 
//                                 children:white, 
//                                 description: "White", 
//                                 total:white.reduce((a,b) => (a+b.value), 0), 
//                                 // value:white.reduce((a,b) => (a+b.value), 0),
//                                 won:white.reduce((a,b) => (a+b.won), 0),
//                                 loss:white.reduce((a,b) => (a+b.loss), 0)
//                             },
//                             {
//                                 name: "Black", 
//                                 color:"#000000", 
//                                 children:black, 
//                                 description: "Black", 
//                                 total:black.reduce((a,b)=> (a+b.value), 0), 
//                                 // value:black.reduce((a,b)=> (a+b.value), 0),
//                                 won:black.reduce((a,b) => (a+b.won), 0),
//                                 loss:black.reduce((a,b) => (a+b.loss), 0)
//                             }
//                         ]
//                     }
//                 }
//                 id="name"
//                 value="value"
//                 margin={{ top: 50, right: 130, bottom: 80, left: 60 }}
//                 cornerRadius={4}
//                 borderWidth={2}
//                 colors={({ id }) => pickWhiteBlack(id)}
//                 childColor={() => pickCustomPalette(customPalette2)}
//                 animate={false}
//                 motionConfig="gentle"
//                 isInteractive={true}
//                 tooltip={CustomTooltip}
//                 theme = {
//                     {
//                         tooltip: {
//                             name: "description"
//                         }
//                     }
//                 }
//             />
//         )
//     } else {
//         return null
//     }
  
// }

// export default Sunburst_OpeningPercent
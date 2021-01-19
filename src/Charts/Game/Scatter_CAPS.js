import { useEffect, useState } from "react";
import { GameStore } from "../../State/store";
import Scatter from '../ResponsiveScatterPlot'

// check if really updating White/Black state
const CAPS_Scatter_Chart = ({ width, height }) => {
  const data = GameStore(state => state.Games);
  const [loading, setLoading] = useState(true);

  const [White, setWhite] = useState([]);
  const [Black, setBlack] = useState([]);

  useEffect(() => {
    setLoading(() => true);
    setWhite([]);
    setBlack([]);

    for (let i = 0; i < data.length; i++) {
      // console.log(i)
      // if(data[i].CAPS === undefined) { console.log(data[i].id)}

      if (data[i].color === "white") {
        setWhite((prev) => [...prev, { x: data[i].date, y: data[i].CAPS }]);
      } else {
        setBlack((prev) => [...prev, { x: data[i].date, y: data[i].CAPS }]);
      }
    }

    // console.log(White, Black)
    setLoading(() => false);
  }, [data]);

  if (!loading) {
    // console.log(White, Black)
    return (
      <Scatter data={[
        { id: "white", data: White },
        { id: "black", data: Black },
        ]}
        width={width}
        height={height}
        title="CAPS Score vs. Time"
      />
    );
  }

  return null;
};

// CAPS_Scatter_Chart.whyDidYouRender = true

export default CAPS_Scatter_Chart;
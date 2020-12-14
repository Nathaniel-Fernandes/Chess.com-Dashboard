import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [{x: 1, y: 20}, {x: 2, y: 21},{x: 1.5, y: 15},{x: 4, y: 10},{x: 3, y: 25}];

const renderLineChart = () => {
  
  return (
    <LineChart width={600} height={400} data={data}>
      <Line type="monotone" dataKey="x" stroke="#8884d8" />
      <XAxis />
      <YAxis />
      <CartesianGrid />
      <Tooltip />
    </LineChart>
  )
};

export default renderLineChart;

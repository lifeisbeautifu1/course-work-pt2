import { useState } from "react";
import {
  Legend,
  Line,
  Label,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
  CartesianGrid,
} from "recharts";
import { calculateIteration } from "./utils/calculate";

function App() {
  // States
  const [l, setl] = useState(8);
  const [n, setN] = useState(1);
  const [λ, setλ] = useState(2);
  const [L, setL] = useState(10);

  let data: Array<any> = [];

  let z = L / 2;

  let firstGraph: any[] = [];

  for (let x = 0; x <= l; ++x) {
    let value = 0;
    for (let j = 1; j <= 20; ++j) {
      value += calculateIteration(l, n, z, λ, j, x);
    }
    data.push({
      x,
      u: value,
    });
  }

  firstGraph.push({
    data,
    name: "L = 5",
  });

  const dataFormater = (num: number) => {
    return num.toFixed(1);
  };

  let x = l / 2;

  data = [];

  for (let z = 0; z <= L; ++z) {
    let value = 0;
    for (let j = 1; j <= 20; ++j) {
      value += calculateIteration(l, n, z, λ, j, x);
    }
    data.push({
      z,
      u: value,
    });
  }
  let secondGraph: any[] = [];

  secondGraph.push({
    data,
    name: "x = l / 2",
  });

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen w-screen">
      <ComposedChart
        width={730}
        height={250}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x">
          <Label value="x" position="insideBottomRight" />
        </XAxis>
        <YAxis tickFormatter={dataFormater}>
          <Label value="u" position="insideTopLeft" />
        </YAxis>
        <Tooltip />
        <Legend />

        {firstGraph.map((i) => (
          <Line
            type="monotone"
            dot={false}
            dataKey="u"
            data={i.data}
            name={i.name}
            key={i.name}
            stroke="#8884d8"
          />
        ))}
      </ComposedChart>

      <ComposedChart
        width={730}
        height={250}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="z">
          <Label value="z" position="insideBottomRight" />
        </XAxis>
        <YAxis tickFormatter={dataFormater}>
          <Label value="u" position="insideTopLeft" />
        </YAxis>
        <Tooltip />
        <Legend />

        {secondGraph.map((i) => (
          <Line
            type="monotone"
            dot={false}
            dataKey="u"
            data={i.data}
            name={i.name}
            key={i.name}
            stroke="#82ca9d"
          />
        ))}
      </ComposedChart>
    </div>
  );
}

export default App;

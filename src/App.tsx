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
import {
  calculateIteration,
  calculateModuleOfComplexNumber,
} from "./utils/calculate";

function App() {
  // States
  const [l, setl] = useState(8);
  const [n, setN] = useState(1);
  const [λ, setλ] = useState(2);
  const [L, setL] = useState(10);

  let data: Array<any> = [];

  let colors: Array<string> = ["#f97316", "#22c55e", "#3b82f6", "#f43f5e"];

  let interval = [1, 2, 5, 10];

  let firstGraph: any[] = [];

  interval.forEach((z, i) => {
    data = [];
    for (let x = 0; x <= l; ++x) {
      let R = 0;
      let IM = 0;
      for (let j = 1; j <= 200; ++j) {
        const [tmpR, tmpIM] = calculateIteration(l, n, z, λ, j, x);
        R += tmpR;
        IM += tmpIM;
      }
      data.push({
        x,
        u: calculateModuleOfComplexNumber([R, IM]),
      });
    }
    firstGraph.push({
      data,
      name: `L = ${z}`,
      color: colors[i],
    });
  });

  const dataFormater = (num: number) => {
    return num.toFixed(1);
  };

  let x = l / 2;

  data = [];

  for (let z = 0; z <= L; ++z) {
    let R = 0;
    let IM = 0;
    for (let j = 1; j <= 200; ++j) {
      const [tmpR, tmpIM] = calculateIteration(l, n, z, λ, j, x);
      R += tmpR;
      IM += tmpIM;
    }
    data.push({
      z,
      u: calculateModuleOfComplexNumber([R, IM]),
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
        <XAxis dataKey="x" allowDuplicatedCategory={false}>
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
            stroke={i.color}
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

import { createContext, useContext, useState } from "react";
import {
  calculateIteration,
  calculateModuleOfComplexNumber,
} from "../utils/calculate";
import axios from "axios";

const calculationContext = createContext<{
  firstGraph: Array<any>;
  secondGraph: Array<any>;
  setFirstGraph: React.Dispatch<React.SetStateAction<any[]>>;
  setSecondGraph: React.Dispatch<React.SetStateAction<any[]>>;
  solve: (
    l: number,
    L: number,
    n: number,
    λ: number,
    K: number,
    I: number
  ) => void;
  test: (
    l: number,
    L: number,
    n: number,
    λ: number,
    z: number,
    X: number
  ) => void;
  loading: boolean;
}>({
  firstGraph: [],
  secondGraph: [],
  setFirstGraph: () => {},
  setSecondGraph: () => {},
  solve: async (
    l: number,
    L: number,
    n: number,
    λ: number,
    I: number,
    K: number
  ) => {},
  test: async (
    l: number,
    L: number,
    n: number,
    λ: number,
    z: number,
    X: number
  ) => {},
  loading: false,
});

type CalculationContextProviderProps = {
  children: React.ReactNode;
};

const CalculationContextProvider: React.FC<CalculationContextProviderProps> = ({
  children,
}) => {
  const [firstGraph, setFirstGraph] = useState<any[]>([]);

  const [secondGraph, setSecondGraph] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  let colors: Array<string> = [
    "#818cf8",
    "#6366f1",
    "#4f46e5",
    "#4338ca",
    "#3730a3",
    "#312e81",
  ];

  const test = async (
    l: number,
    L: number,
    n: number,
    λ: number,
    z: number,
    X: number
  ) => {
    setLoading(true);

    let data: Array<any> = [];

    let firstGraphTmp: any[] = [];

    let secondGraphTmp: any[] = [];

    // Это наложение

    const start = [10, 10];

    const tmp = [];
    const temp = [];
    // 6, 7
    for await (const mult of [1, 2, 3, 4, 5]) {
      const res = await axios.post("http://localhost:5000/", {
        l,
        L,
        n,
        λ,
        I: start[1],
        K: start[0],
      });
      const u = res.data;
      const data = [];
      for (let x = 0; x <= l; ++x) {
        data.push({
          x,
          u: u?.[Math.round(z / (L / start[0])) - 1][
            Math.round(x / (l / start[1]))
          ],
        });
      }
      firstGraphTmp.push({
        data,
        name: `I = ${start[1]} K = ${start[0]}`,
        color: colors[mult - 1],
      });
      const data2 = [];
      for (let z = 0; z <= L; ++z) {
        data2.push({
          z,
          u: u?.[z !== 0 ? Math.round(z / (L / start[0])) - 1 : 0][
            Math.round(X / (l / start[1]))
          ],
        });
      }
      secondGraphTmp.push({
        data: data2,
        name: `I = ${start[1]} K = ${start[0]}`,
        color: colors[mult - 1],
      });
      temp.push(data);
      tmp.push(data2);
      start[0] *= 2;
      start[1] *= 4;
    }

    let data3: any = [];
    for (let x = 0; x <= l; ++x) {
      let R = 0;
      let IM = 0;
      for (let j = 1; j <= 100; ++j) {
        const [tmpR, tmpIM] = calculateIteration(l, n, z, λ, j, x);
        R += tmpR;
        IM += tmpIM;
      }
      data3.push({
        x,
        u: calculateModuleOfComplexNumber([R, IM]),
      });
    }
    firstGraphTmp.push({
      data3,
      name: `Аналитическое`,
      color: "#333",
    });

    data = [];
    for (let z = 0; z <= L; ++z) {
      let R = 0;
      let IM = 0;
      for (let j = 1; j <= 100; ++j) {
        const [tmpR, tmpIM] = calculateIteration(l, n, z, λ, j, X);
        R += tmpR;
        IM += tmpIM;
      }
      data.push({
        z,
        u: calculateModuleOfComplexNumber([R, IM]),
      });
    }
    secondGraphTmp.push({
      data,
      name: `Аналитическое`,
      color: "#333",
    });

    tmp.forEach((t) => {
      let Sum = 0;
      t.forEach((el, index) => {
        Sum += Math.pow(Math.abs(el.u - data[index]?.u), 2);
      });
      console.log("Second:", Math.pow(Sum, 0.5));
    });

    temp.forEach((t) => {
      let Sum = 0;

      t.forEach((el, index) => {
        Sum += Math.pow(Math.abs(el.u - data3[index]?.u), 2);
      });
      console.log("First:", Math.pow(Sum, 0.5) / 3);
    });

    setFirstGraph(firstGraphTmp);

    setSecondGraph(secondGraphTmp);

    setLoading(false);
  };

  const solve = async (
    l: number,
    L: number,
    n: number,
    λ: number,
    K: number,
    I: number
  ) => {
    setLoading(true);

    let data: Array<any> = [];

    let firstGraphTmp: any[] = [];

    let secondGraphTmp: any[] = [];

    let tmp = L / 4;
    let interval = [
      Math.round(tmp),
      Math.round(tmp * 2),
      Math.round(tmp * 3),
      L,
    ];

    const res = await axios.post("http://localhost:5000/", {
      l,
      L,
      n,
      λ,
      I,
      K,
    });

    const u = res.data;

    interval.forEach((z, i) => {
      data = [];
      for (let x = 0; x <= l; ++x) {
        data.push({
          x,
          u: u?.[Math.round(z / (L / K)) - 1][Math.round(x / (l / I))],
        });
      }
      firstGraphTmp.push({
        data,
        name: `z = ${z}`,
        color: colors[i],
      });
    });

    tmp = l / 8;

    let xInterval = [
      Math.round(tmp),
      Math.round(tmp * 2),
      Math.round(tmp * 3),
      Math.ceil(tmp * 4),
    ];

    xInterval.forEach((x, i) => {
      data = [];
      for (let z = 0; z <= L; ++z) {
        data.push({
          z,
          u: u?.[Math.round(z !== 0 ? z / (L / K) - 1 : 0)][
            Math.round(x / (l / I))
          ],
        });
      }
      secondGraphTmp.push({
        data,
        name: `x = ${x}`,
        color: colors[i],
      });
    });

    setFirstGraph(firstGraphTmp);

    setSecondGraph(secondGraphTmp);

    setLoading(false);
  };

  return (
    <calculationContext.Provider
      value={{
        firstGraph,
        secondGraph,
        setFirstGraph,
        setSecondGraph,
        solve,
        test,
        loading,
      }}
    >
      {children}
    </calculationContext.Provider>
  );
};

export default CalculationContextProvider;

export const useCalculationContext = () => useContext(calculationContext);

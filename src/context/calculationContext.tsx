import { createContext, useContext, useState } from "react";
import axios from "axios";
import {
  calculateIteration,
  calculateModuleOfComplexNumber,
} from "../utils/calculate";
import type { SolveParams, TestParams } from "../types";

axios.defaults.baseURL = "http://localhost:5000";

const CalculationContext = createContext<{
  firstGraph: Array<any>;
  secondGraph: Array<any>;
  setFirstGraph: React.Dispatch<React.SetStateAction<any[]>>;
  setSecondGraph: React.Dispatch<React.SetStateAction<any[]>>;
  solve: (params: SolveParams) => void;
  test: (params: TestParams) => void;
  loading: boolean;
}>({
  firstGraph: [],
  secondGraph: [],
  setFirstGraph: () => {},
  setSecondGraph: () => {},
  solve: async () => {},
  test: async () => {},
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
    "#7B1FA2",
    "#673AB7",
    "#F48FB1",
    "#e11d48",
    "#f97316",
    "#22c55e",
    "#84cc16",
  ];

  const test = async ({ l, L, n, λ, z, X }: TestParams) => {
    setLoading(true);

    let firstGraphTmp: any[] = [];

    let secondGraphTmp: any[] = [];

    // Это разбиения для наложения
    // K    I
    const start = [
      [10, 10],
      [20, 20],
      [40, 40],
      [160, 160],
      [320, 320],
      [640, 640],
      [1280, 1280],
      // [2560, 2560],
    ];
    // const start = [
    //   [20, 20],
    //   [80, 40],
    //   [320, 80],
    //   [1280, 160],
    //   [5120, 320],
    // ];

    let index = 0;

    const promises = [];
    for (const [K, I] of start) {
      promises.push(
        axios.post("/", {
          l,
          L,
          n,
          λ,
          I,
          K,
        })
      );
    }

    let data = await Promise.all(promises);

    for await (const [K, I] of start) {
      const u = data[index].data;

      // First graph
      const firstGraphData = [];
      for (let x = 0; x <= l; ++x) {
        firstGraphData.push({
          x,
          u: u?.[Math.round(z / (L / K))][Math.round(x / (l / I))],
        });
      }
      firstGraphTmp.push({
        data: firstGraphData,
        name: `I = ${I} K = ${K}`,
        color: colors[index],
      });
      // First graph calculation over

      // Second graph
      const secondGraphData = [];
      for (let z = 0; z <= L; ++z) {
        secondGraphData.push({
          z,
          u: u?.[Math.round(z / (L / K))][Math.round(X / (l / I))],
        });
      }
      secondGraphTmp.push({
        data: secondGraphData,
        name: `I = ${I} K = ${K}`,
        color: colors[index],
      });
      // Second graph calculation over

      index++;
    }

    const K = start[start.length - 1][0];
    const I = start[start.length - 1][1];
    // First graph analitical calculation
    let firstGraphAnaliticData: any = [];

    for (let x = 0; x <= l; ++x) {
      let R = 0;
      let IM = 0;
      for (let t = 1; t <= 100; ++t) {
        const [tmpR, tmpIM] = calculateIteration({
          l,
          n,
          z: (Math.round(z / (L / K)) * L) / K,
          λ,
          t,
          x: (Math.round(x / (l / I)) * l) / I,
        });
        R += tmpR;
        IM += tmpIM;
      }
      firstGraphAnaliticData.push({
        x,
        u: calculateModuleOfComplexNumber([R, IM]),
      });
    }

    firstGraphTmp.push({
      data: firstGraphAnaliticData,
      name: `Аналитическое`,
      color: "#a3a3a3",
    });
    // First graph analitical calculation over

    // Second graph analitical calculation
    let secondGraphAnaliticData: any = [];
    for (let z = 0; z <= L; z++) {
      let R = 0;
      let IM = 0;
      for (let t = 1; t <= 100; ++t) {
        const [tmpR, tmpIM] = calculateIteration({
          l,
          n,
          z: (Math.round(z / (L / K)) * L) / K,
          λ,
          t,
          x: (Math.round(X / (l / I)) * l) / I,
        });
        R += tmpR;
        IM += tmpIM;
      }
      secondGraphAnaliticData.push({
        z,
        u: calculateModuleOfComplexNumber([R, IM]),
      });
    }

    secondGraphTmp.push({
      data: secondGraphAnaliticData,
      name: `Аналитическое`,
      color: "#a3a3a3",
    });
    // Second graph analitical calculation over

    setFirstGraph(firstGraphTmp);

    setSecondGraph(secondGraphTmp);

    setLoading(false);
  };

  const solve = async ({ l, L, n, λ, K, I }: SolveParams) => {
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

    const res = await axios.post("/", {
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
      for (let j = 0; j <= I; ++j) {
        data.push({
          x: (j * l) / I,
          u: u?.[Math.round(z / (L / K))][j],
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
      for (let j = 0; j <= K; ++j) {
        data.push({
          z: (j * L) / K,
          u: u?.[j][Math.round(x / (l / I))],
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
    <CalculationContext.Provider
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
    </CalculationContext.Provider>
  );
};

export default CalculationContextProvider;

export const useCalculationContext = () => useContext(CalculationContext);

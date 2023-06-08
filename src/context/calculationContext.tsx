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
    "#7B1FA2",
    "#673AB7",
    "#F48FB1",
    "#e11d48",
    "#f97316",
    "#22c55e",
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
    //             K    I
    const start = [
      [11, 11],
      [41, 21],
      [161, 41],
      [641, 161],
      [2561, 641],
      // [10241, 321],
    ];

    const tmp = [];
    const temp = [];
    // 6, 7
    let index = 1;
    for await (const [K, I] of start) {
      const res = await axios.post("http://localhost:5000/", {
        l,
        L,
        n,
        λ,
        I,
        K,
      });
      const u = res.data;

      const data = [];

      for (let x = 0; x <= l; x += 1) {
        // console.log("x index", x / (l / (start[1] - 1)));
        // console.log("z index", z / (L / (start[0] - 1)));
        data.push({
          x,
          u: u?.[Math.round(z / (L / (K - 1)))][Math.round(x / (l / (I - 1)))],
        });
      }
      firstGraphTmp.push({
        data,
        name: `I = ${I} K = ${K}`,
        color: colors[index - 1],
      });

      let data3: any = [];
      let Sum = 0;
      for (let i = 0; i <= I - 1; ++i) {
        let R = 0;
        let IM = 0;
        for (let j = 1; j <= 100; ++j) {
          const [tmpR, tmpIM] = calculateIteration(
            l,
            n,
            (Math.round(z / (L / (K - 1))) * L) / (K - 1),
            λ,
            j,
            (i * l) / (I - 1)
          );
          R += tmpR;
          IM += tmpIM;
        }
        data3.push({
          x: (i * l) / (I - 1),
          u: calculateModuleOfComplexNumber([R, IM]),
        });
        Sum += Math.pow(
          calculateModuleOfComplexNumber([R, IM]) -
            u[Math.round(z / (L / (K - 1)))][i],
          2
        );
      }
      Sum /= I - 1;
      Sum = Math.pow(Sum, 0.5);
      console.log(Sum);

      // firstGraphTmp.push({
      //   data: data3,
      //   name: `Аналитическое`,
      //   color: "#fff",
      // });
      // const data2 = [];
      // for (let z = 0; z <= L; ++z) {
      //   data2.push({
      //     z,
      //     u: u?.[Math.round(z / (L / (K - 1)))][Math.round(X / (l / (I - 1)))],
      //   });
      // }
      // secondGraphTmp.push({
      //   data: data2,
      //   name: `I = ${I} K = ${K}`,
      //   color: colors[index - 1],
      // });
      // temp.push(data);
      index++;
      // tmp.push(data2);
    }

    // let data4: any = [];
    // for (let z = 0; z <= L; z += 1) {
    //   let R = 0;
    //   let IM = 0;
    //   for (let j = 1; j <= 100; ++j) {
    //     const [tmpR, tmpIM] = calculateIteration(l, n, z, λ, j, X);
    //     R += tmpR;
    //     IM += tmpIM;
    //   }
    //   data4.push({
    //     x: X,
    //     u: calculateModuleOfComplexNumber([R, IM]),
    //   });
    // }
    // secondGraphTmp.push({
    //   data: data4,
    //   name: `Аналитическое`,
    //   color: "#fff",
    // });

    // temp.forEach((t) => {
    //   let Sum = 0;

    //   // let max = 0;
    //   t.forEach((el, index) => {
    //     Sum += Math.pow(Math.abs(el.u - data3[index]?.u), 2);
    //     // let norm = Math.abs(el.u - data3[index]?.u);
    //     // max = norm > max ? norm : max;
    //   });
    //   console.log("First:", Math.pow(Sum, 0.5));
    //   // console.log("First: ", max);
    // });

    // tmp.forEach((t) => {
    //   let Sum = 0;
    //   t.forEach((el, index) => {
    //     Sum += Math.pow(Math.abs(el.u - data4[index]?.u), 2);
    //   });
    //   console.log("Second:", Math.pow(Sum, 0.5));
    // });

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
          u: u?.[Math.round(z / (L / (K - 1)))][Math.round(x / (l / (I - 1)))],
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
      for (let j = 0; j < K; ++j) {
        data.push({
          z: (j * L) / (K - 1),
          u: u?.[j][Math.round(x / (l / (I - 1)))],
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

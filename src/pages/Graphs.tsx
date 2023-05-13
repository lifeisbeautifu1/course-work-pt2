import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import {
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  CartesianGrid,
} from "recharts";
import { useCalculationContext } from "../context/calculationContext";

const Graphs = () => {
  const { firstGraph, secondGraph, setFirstGraph, setSecondGraph } =
    useCalculationContext();

  const dataFormater = (num: number) => {
    return num.toFixed(1);
  };

  const navigate = useNavigate();

  useEffect(() => {
    let index = 0,
      interval = 2500;

    const rand = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const animate = (star) => {
      star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
      star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

      star.style.animation = "none";
      star.offsetHeight;
      star.style.animation = "";
    };

    for (const star of document.getElementsByClassName("magic-star")) {
      setTimeout(() => {
        animate(star);

        setInterval(() => animate(star), 1000);
      }, index++ * (interval / 3));
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 py-12 items-center">
      <div className="h-screen flex flex-col items-center">
        <h1 className="font-bold header text-5xl text-center mb-10 text-gray-200">
          График модуля комплексной амплитуды <br />{" "}
          <span className="magic">
            <span className="magic-star">
              <svg viewBox="0 0 512 512">
                <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
              </svg>
            </span>
            <span className="magic-star">
              <svg viewBox="0 0 512 512">
                <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
              </svg>
            </span>
            <span className="magic-star">
              <svg viewBox="0 0 512 512">
                <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
              </svg>
            </span>
            <span className="magic-text">при фиксированном z</span>
          </span>
        </h1>

        <LineChart
          width={1200}
          height={550}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid stroke="#333" />
          <XAxis
            tick={{ fill: "gray" }}
            dataKey="x"
            style={{
              fontSize: 18,
            }}
            label={{
              fill: "#FFFFFF",
              value: "Ширина x",
              fontWeight: 700,
              position: "bottom",
              fontSize: 20,
              offset: 3,
            }}
            allowDuplicatedCategory={false}
          />
          <YAxis
            dataKey={"u"}
            style={{
              fontSize: 18,
            }}
            tick={{ fill: "gray" }}
            width={150}
            label={{
              fontSize: 20,
              fontWeight: 700,
              fill: "#FFFFFF",
              value: "Амплитуда u(t, z)",
              angle: -90,
            }}
            tickFormatter={dataFormater}
          />
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: 40, fontSize: 20 }}
          />

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
        </LineChart>
      </div>
      <div className="h-screen flex flex-col items-center">
        <h1 className="font-bold header text-5xl text-center mb-10 text-gray-200">
          График модуля комплексной амплитуды <br />{" "}
          <span className="magic">
            <span className="magic-star">
              <svg viewBox="0 0 512 512">
                <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
              </svg>
            </span>
            <span className="magic-star">
              <svg viewBox="0 0 512 512">
                <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
              </svg>
            </span>
            <span className="magic-star">
              <svg viewBox="0 0 512 512">
                <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
              </svg>
            </span>
            <span className="magic-text">при фиксированном x</span>
          </span>
        </h1>
        <LineChart
          width={1200}
          height={550}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid stroke="#333" />
          <XAxis
            tick={{ fill: "gray" }}
            dataKey="z"
            style={{
              fontSize: 18,
            }}
            label={{
              fill: "#FFFFFF",
              fontWeight: 700,
              value: "Длина z",
              position: "bottom",
              fontSize: 20,
              offset: 3,
            }}
            allowDuplicatedCategory={false}
          />
          <YAxis
            dataKey={"u"}
            style={{
              fontSize: 18,
            }}
            tick={{ fill: "gray" }}
            width={150}
            label={{
              fontSize: 20,
              fontWeight: 700,
              fill: "#FFFFFF",
              value: "Амплитуда u(t, z)",
              angle: -90,
            }}
            tickFormatter={dataFormater}
          />
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: 40, fontSize: 20 }}
          />

          {secondGraph.map((i) => (
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
        </LineChart>
      </div>
      <button
        onClick={() => {
          setFirstGraph([]);
          setSecondGraph([]);
          navigate("/");
        }}
        type="button"
        className="py-2.5 px-10 text-sm font-medium text-gray-900 bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:text-blue-700 inline-flex items-center"
      >
        Назад
      </button>
    </div>
  );
};

export default Graphs;

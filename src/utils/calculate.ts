import { createNDimArray } from "./";
import Complex from "complex.js";

export const findU = (
  l: number,
  L: number,
  n: number,
  λ: number,
  I: number,
  K: number
) => {
  const k = (2 * Math.PI) / λ;

  const q = new Complex(0, 1 / (2 * k * n));

  const Hx = l / I;
  const Hz = L / K;

  const γ = Hz / Math.pow(Hx, 2);

  const ψ = (x: number) => {
    return 12 * Math.exp(-Math.pow((2 * x - l) / (0.4 * l), 4));
  };

  const u = createNDimArray([K + 1, I + 1]);

  if (u) {
    for (let k = 0; k < K + 1; ++k) {
      u[k][0] = new Complex(0, 0);
      u[k][I] = new Complex(0, 0);
    }

    for (let i = 1; i < I; ++i) {
      u[0][i] = new Complex(ψ(i * Hx), 0);
    }

    let a = new Complex(0, 0);
    a = a.add(q.mul(-γ));
    let b = new Complex(0, 0);
    b = b.add(1).add(q.mul(2).mul(γ));
    let c = new Complex(0, 0);
    c = c.add(q.mul(-γ));

    for (let n = 0; n < K; ++n) {
      const α = new Array(K);
      const β = new Array(K);
      α[0] = new Complex(0, 0);
      β[0] = new Complex(0, 0);
      for (let j = 1; j < I; ++j) {
        const del = b.add(c.mul(α[j - 1]));
        α[j] = a.neg().div(del);
        // α[j] = -a / (b + c * α[j - 1]);
        β[j] = u[n][j].sub(c.mul(β[j - 1])).div(del);
        // β[j] = (u[n][j] - c * β[j - 1]) / (b + c * α[j - 1]);
      }
      u[n + 1][I - 1] = new Complex(0, 0);
      for (let j = I - 2; j > 0; --j) {
        // u[n + 1][j] = α[j] * u[n + 1][j + 1] + β[j];
        u[n + 1][j] = α[j].mul(u[n + 1][j + 1]).add(β[j]);
      }
    }

    return u;
  }
};

export const calculateInnerFunction = (l: number, n: number, x: number) => {
  return (
    (24 / l) *
    Math.exp(-Math.pow((2 * x - l) / (0.4 * l), 4)) *
    Math.sin((Math.PI * n * x) / l)
  );
};

export const calculateIteration = (
  l: number,
  n: number,
  z: number,
  λ: number,
  t: number,
  x: number
) => {
  const An = calculateAn(l, t);
  const rightSide = calculateRightSide(l, t, x);
  const [R, IM] = calucateComplexNumber(l, n, z, λ, t);
  return [R * An * rightSide, IM * An * rightSide];
};

export const calculateRightSide = (l: number, n: number, x: number) => {
  return Math.sin((Math.PI * n * x) / l);
};

export const calculateModuleOfComplexNumber = (numbers: [number, number]) => {
  const [x, y] = numbers;
  return Math.sqrt(x * x + y * y);
};

export const calucateComplexNumber = (
  l: number,
  n: number,
  z: number,
  λ: number,
  t: number
) => {
  let value = (λ * Math.PI * t * t * z) / (4 * l * l * n);
  return [Math.cos(value), Math.sin(value)];
};

export const calculateAn = (l: number, n: number) => {
  const t = 1000;
  const h = l / t;
  const xi: Array<number> = [];
  const fxi: Array<number> = [];
  for (let i = 0; i < t + 1; ++i) {
    if (i == 0) {
      xi.push(0);
      fxi.push(calculateInnerFunction(l, n, 0));
    } else {
      xi.push(xi[i - 1] + h);
      fxi.push(calculateInnerFunction(l, n, xi[i - 1] + h));
    }
  }
  let oddSum = 0;
  let evenSum = 0;
  for (let i = 1; i < t; ++i) {
    if (i % 2 == 0) {
      evenSum += fxi[i];
    } else {
      oddSum += fxi[i];
    }
  }
  return (h / 3) * (fxi[0] + fxi[t] + 2 * evenSum + 4 * oddSum);
};

// export const check = (x: number) => {
//   return Math.sqrt(1 + 2 * x * x - x * x * x);
// };

// export const calculateAn = (l: number, n: number) => {
//   const t = 8;
//   const h = (2 - 1.2) / t;
//   const xi: Array<number> = [];
//   const fxi: Array<number> = [];
//   for (let i = 0; i < t + 1; ++i) {
//     if (i == 0) {
//       xi.push(1.2);
//       fxi.push(check(1.2));
//     } else {
//       xi.push(xi[i - 1] + h);
//       fxi.push(check(xi[i - 1] + h));
//     }
//   }
//   let oddSum = 0;
//   let evenSum = 0;
//   for (let i = 1; i < t; ++i) {
//     if (i % 2 == 0) {
//       evenSum += fxi[i];
//     } else {
//       oddSum += fxi[i];
//     }
//   }
//   console.log(xi, fxi);
//   console.log(evenSum, oddSum);
//   return (h / 3) * (fxi[0] + fxi[t] + 2 * evenSum + 4 * oddSum);
// };

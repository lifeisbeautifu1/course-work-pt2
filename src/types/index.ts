export interface SolveParams {
  l: number;
  L: number;
  n: number;
  λ: number;
  K: number;
  I: number;
}

export interface CalculateIterationParams {
  l: number;
  n: number;
  z: number;
  λ: number;
  t: number;
  x: number;
}

export interface TestParams {
  l: number;
  L: number;
  n: number;
  λ: number;
  z: number;
  X: number;
}

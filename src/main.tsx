import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CalculationContextProvider from "./context/calculationContext";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <CalculationContextProvider>
        <App />
      </CalculationContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

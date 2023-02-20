import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Parameters = lazy(() => import("./pages/Parameters"));
const Graphs = lazy(() => import("./pages/Graphs"));

function App() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<Parameters />} />
        <Route path="/solution" element={<Graphs />} />
      </Routes>
    </Suspense>
  );
}

export default App;

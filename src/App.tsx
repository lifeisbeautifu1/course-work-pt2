import { Route, Routes } from "react-router-dom";
import { Parameters, Graphs } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Parameters />} />
      <Route path="/solution" element={<Graphs />} />
    </Routes>
  );
}

export default App;

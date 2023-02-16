import { useState } from "react";
import { calculateAn } from "./utils/calculate";

function App() {
  // States
  const [l, setL] = useState(8);
  const [n, setN] = useState(1);
  const [λ, setλ] = useState(2);

  const res = calculateAn(l, 1);
  console.log(res);
  return <div>hello world</div>;
}

export default App;

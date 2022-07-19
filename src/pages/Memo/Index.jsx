import React, { useState } from "react";
import { useMemo } from "react";

export default function App() {
  let [color, setColor] = useState("red");
  return (
    <div>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p>
      {useMemo(() => {
        return <ExpensiveTree />;
      }, [])}
    </div>
  );
}

function ExpensiveTree() {
  let now = performance.now();
  while (performance.now() - now < 100) {
    // Artificial delay -- do nothing for 100ms
  }
  console.log(111);
  return <p>I am a very slow component tree.</p>;
}

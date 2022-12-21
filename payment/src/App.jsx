import React from "react";
import { Link } from "react-router-dom";

// The App component is not exported but it can be used to test your component in isolation
// Having a proper development environment to test the components separately
// is a critical element of micro-frontend architecture
function App() {
  return (
    <div
      style={{
        border: "solid",
        borderRadius: "10px",
        borderColor: "#0000ff",
      }}
    >
      <div>This is the Remote Payment App hosted at localhost:8082</div>
    </div>
  );
}

export default App;

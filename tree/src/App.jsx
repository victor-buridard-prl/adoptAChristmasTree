import React from "react";
import CatalogList from "./components/CatalogList";

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
      <div>This is the Remote Tree App hosted at localhost:8083</div>
      <CatalogList />
    </div>
  );
}

export default App;

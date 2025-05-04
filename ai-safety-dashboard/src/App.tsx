import React from "react";
import IncidentDashboard from "./components/IncidentDashboard";  // Import the new component

const App: React.FC = () => {
  return (
    <div className="App">
      <IncidentDashboard />  {/* Use the new component */}
    </div>
  );
};

export default App;

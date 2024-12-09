import { MonthProvider } from "./context/MonthContext";

import "./App.css";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Statistics from "./components/Statistics";
import Chart from "./components/Chart";
import { useState } from "react";

function App() {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");

  function onMenuChange(menuName) {
    setSelectedMenu(menuName);
  }

  return (
    <MonthProvider>
      <Header onMenuChange={onMenuChange} selectedMenu={selectedMenu} />
      {selectedMenu === "dashboard" && <Dashboard />}
      {selectedMenu === "statistics" && <Statistics />}
      {selectedMenu === "chart" && <Chart />}
    </MonthProvider>
  );
}

export default App;

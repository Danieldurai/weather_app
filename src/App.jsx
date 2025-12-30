import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import WeatherDashboard from "./WeatherDashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <WeatherDashboard></WeatherDashboard>
    </>
  );
}

export default App;

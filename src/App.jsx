import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import WeatherDashboard from "./WeatherDashboard";
import Globe from "./Globe";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <WeatherDashboard></WeatherDashboard> */}
      <Globe></Globe>
    </>
  );
}

export default App;

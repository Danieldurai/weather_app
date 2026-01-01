import { useState,  } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import WeatherDashboard from "./WeatherDashboard";
import { ViewContext, CityContext } from "./Context";
import Globe from "./Globe";

function App() {
  
  

  const [view, setView] = useState('globe')
  const [city, setCity] = useState('chennai')

  return (
    <>
    <CityContext.Provider value={{contextCity:city, setCity}}>
      <ViewContext.Provider value={{view, setView}} >
        {view == 'dashboard' ? <WeatherDashboard></WeatherDashboard>:  <Globe></Globe>}
          {/* <WeatherDashboard></WeatherDashboard> */}
         
      </ViewContext.Provider>
      </CityContext.Provider>
      
    </>
  );
}

export default App;

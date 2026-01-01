import React, { useState, useEffect, useRef, useContext } from "react";
import { ViewContext, CityContext } from "./Context";
import {
  Search,
  MapPin,
  Droplets,
  Wind,
  Sun,
  Sunrise,
  Sunset,
  Cloud,
  Eye,
  TrendingUp,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WeatherDashboard = () => {
  const {setView} = useContext(ViewContext)
  const {contextCity} = useContext(CityContext)


  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState(()=>contextCity || 'Chennai');
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState("");
  const [animate, setAnimate] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const debounceTimer = useRef(null);

  const API_KEY = "10b7d7207615b10078fbfe572427a8e6";

 

  // Fetch city suggestions function
  const fetchCitySuggestions = async (query) => {
    // if (apiKeys.length === 0 || query.length < 3) {
    //   setCitySuggestions([]);
    //   return;
    // }

    setLoadingSuggestions(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );

      if (response.ok) {
        const data = await response.json();
        setCitySuggestions(data);
        setShowSuggestions(true);
      }
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // Debounce effect
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (searchInput.length >= 3) {
      debounceTimer.current = setTimeout(() => {
        fetchCitySuggestions(searchInput);
      }, 500);
    } else {
      setCitySuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchInput]);

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    const cityName = `${suggestion.name},${suggestion.country}`;
    setSearchInput(cityName);
    setShowSuggestions(false);
    // Call your existing weather fetch function with cityName
    handleSearch(cityName);
  };

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError("");
      setAnimate(false);

      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );

      if (!currentRes.ok) throw new Error("City not found");

      const currentData = await currentRes.json();
      const { lat, lon } = currentData.coord;

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();

      const airRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const airData = await airRes.json();

      setWeather({
        current: currentData,
        forecast: forecastData,
        air: airData,
      });
      setCity(currentData.name);
      setLoading(false);
      setTimeout(() => setAnimate(true), 100);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    if (searchInput.trim()) {
      fetchWeather(searchInput);
      setSearchInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getAirQuality = (aqi) => {
    const levels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
    return levels[aqi - 1] || "Unknown";
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatShortTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  };

  const formatDay = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  const getWeatherEmoji = (icon) => {
    const emojiMap = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "⛅",
      "02n": "☁️",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌧️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "❄️",
      "13n": "❄️",
      "50d": "🌫️",
      "50n": "🌫️",
    };
    return emojiMap[icon] || "🌤️";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400 text-lg animate-pulse">
          Loading weather data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center animate-fade-in">
          <div className="text-red-400 text-lg mb-4">{error}</div>
          <button
            onClick={() => fetchWeather("Chennai")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-105"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const hourlyData = weather.forecast.list.slice(0, 12);
  const dailyData = weather.forecast.list
    .filter((item, index) => index % 8 === 0)
    .slice(0, 7);
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Chart data
  const tempChartData = hourlyData.map((item) => ({
    time: formatShortTime(item.dt),
    temp: Math.round(item.main.temp),
    feels: Math.round(item.main.feels_like),
  }));

  const humidityChartData = hourlyData.map((item) => ({
    time: formatShortTime(item.dt),
    humidity: item.main.humidity,
    clouds: item.clouds.all,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 p-4 md:p-8 font-light">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slide-in {
          animation: slideIn 0.6s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out;
        }
        .stagger-1 { animation-delay: 0.1s; opacity: 0; animation-fill-mode: forwards; }
        .stagger-2 { animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards; }
        .stagger-3 { animation-delay: 0.3s; opacity: 0; animation-fill-mode: forwards; }
        .stagger-4 { animation-delay: 0.4s; opacity: 0; animation-fill-mode: forwards; }
        .stagger-5 { animation-delay: 0.5s; opacity: 0; animation-fill-mode: forwards; }
        .stagger-6 { animation-delay: 0.6s; opacity: 0; animation-fill-mode: forwards; }
      `}</style>

      <div className="w-full">
      <div className="absolute top-10 left-8 flex items-center gap-4">
  {/* Text Logo */}
  <h1 className="text-4xl font-extralight text-white tracking-tighter select-none">
    WORLD<span className="font-bold text-[#00f2ff]">Weather</span>
  </h1>

  {/* 3D Animated Globe Container */}
  <div onClick={() => setView('globe')} className="group relative flex items-center justify-center cursor-pointer">
    
    {/* Tooltip - Appears on Group Hover */}
    <span className="absolute bottom-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-max px-2.5 py-1 bg-black/80 text-[#00f2ff] text-[10px] uppercase tracking-widest font-bold rounded border border-[#00f2ff]/50 backdrop-blur-md">
      Globe View
    </span>

    {/* The Pulsing Wrapper */}
    {/* Base: pulse-slow | Hover: pulse-fast & scale-up */}
    <div className="relative w-10 h-10 transition-transform duration-500 group-hover:scale-125
      animate-[pulse_2s_ease-in-out_infinite] 
      group-hover:animate-[pulse_0.8s_ease-in-out_infinite]">
      
      {/* 3D Lighting Overlay (The "Glass" Sphere Look) */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(0,242,255,0.6)_0%,transparent_70%)] z-10" />
      
      <svg 
        viewBox="0 0 24 24" 
        className="w-full h-full drop-shadow-[0_0_15px_rgba(0,242,255,0.7)] group-hover:drop-shadow-[0_0_25px_rgba(0,242,255,0.9)] transition-all duration-300"
        fill="none" 
        stroke="#00f2ff" 
        strokeWidth="1.5"
      >
        {/* Atmosphere / Outer Border */}
        <circle cx="12" cy="12" r="10" className="opacity-70" />
        
        {/* Latitudes */}
        <path d="M2 12h20" className="opacity-40" />
        <path d="M5 8h14" className="opacity-20" />
        <path d="M5 16h14" className="opacity-20" />

        {/* 3D Spinning Meridians */}
        <g className="animate-[spin-y_3s_linear_infinite] origin-center">
          <ellipse cx="12" cy="12" rx="4" ry="10" />
          <ellipse cx="12" cy="12" rx="9" ry="10" className="opacity-30" />
        </g>
      </svg>
    </div>
  </div>
</div>
        {/* Search Bar */}
        <div className={`mb-8 ${animate ? "animate-fade-in" : ""}`}>
          <div className="relative flex gap-2 max-w-3xl ml-auto">
            {/* <div className="relative flex-1">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search city or coordinates (e.g., 13.0827,80.2707)"
                className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 pl-12 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all duration-300"
              />
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-600 transition-colors" />
            </div> */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search city or coordinates (e.g., 13.0827,80.2707)"
                className="w-full px-4 py-3 pl-12 
             border border-gray-300 rounded-lg
             text-gray-900 placeholder-gray-400
             bg-white
             focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />

              {/* City Suggestions Dropdown */}
              {showSuggestions && citySuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {citySuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">
                          {suggestion.name}
                          {suggestion.state && `, ${suggestion.state}`}
                        </div>
                        <div className="text-sm text-gray-500">
                          {suggestion.country}
                          {suggestion.lat && suggestion.lon && (
                            <span className="ml-2">
                              ({suggestion.lat.toFixed(2)},{" "}
                              {suggestion.lon.toFixed(2)})
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {loadingSuggestions && searchInput.length >= 3 && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-center text-gray-500 text-sm">
                  Loading suggestions...
                </div>
              )}
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
            >
              Search
            </button>
          </div>
        </div>

        {/* Header */}
        <div
          className={`border-b border-gray-800 pb-4 mb-6 ${
            animate ? "animate-slide-in stagger-1" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500 transition-transform hover:scale-110" />
              <span className="text-xl">{weather.current.name}</span>
            </div>
            <span className="text-gray-500 text-sm">Updated {currentTime}</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Current Weather - Left Column */}
          <div
            className={`lg:col-span-1 ${
              animate ? "animate-scale-in stagger-2" : ""
            }`}
          >
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 h-full backdrop-blur-sm hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-6xl transition-transform hover:scale-110 duration-300">
                    {getWeatherEmoji(weather.current.weather[0].icon)}
                  </span>
                  <span className="text-7xl font-thin">
                    {Math.round(weather.current.main.temp)}°C
                  </span>
                </div>
              </div>
              <div className="text-gray-400 text-lg mb-2">
                Feels like {Math.round(weather.current.main.feels_like)}°C
              </div>
              <div className="text-2xl text-gray-300 capitalize mb-6">
                {weather.current.weather[0].description}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800 hover:border-blue-600/50 transition-all group">
                  <Droplets className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-gray-500 text-sm">Humidity</div>
                  <div className="text-2xl font-light">
                    {weather.current.main.humidity}%
                  </div>
                </div>
                <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800 hover:border-gray-600/50 transition-all group">
                  <Wind className="w-5 h-5 text-gray-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-gray-500 text-sm">Wind</div>
                  <div className="text-2xl font-light">
                    {Math.round(weather.current.wind.speed * 3.6)} km/h
                  </div>
                </div>
                <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800 hover:border-yellow-600/50 transition-all group">
                  <Sun className="w-5 h-5 text-yellow-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-gray-500 text-sm">UV Index</div>
                  <div className="text-2xl font-light">
                    {weather.current.clouds.all > 50 ? "3" : "6"}
                  </div>
                </div>
                <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800 hover:border-green-600/50 transition-all group">
                  <Eye className="w-5 h-5 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-gray-500 text-sm">Air Quality</div>
                  <div className="text-lg font-light">
                    {getAirQuality(weather.air.list[0].main.aqi)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Temperature Chart - Middle Column */}
          <div
            className={`lg:col-span-2 ${
              animate ? "animate-scale-in stagger-3" : ""
            }`}
          >
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg">Temperature Trend (12 Hours)</h3>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={tempChartData}>
                  <defs>
                    <linearGradient
                      id="tempGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="feelsGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="time"
                    stroke="#6b7280"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#f3f4f6",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="temp"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fill="url(#tempGradient)"
                    name="Temperature"
                  />
                  <Area
                    type="monotone"
                    dataKey="feels"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#feelsGradient)"
                    name="Feels Like"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Humidity & Clouds Chart */}
        <div className={`mb-6 ${animate ? "animate-fade-in stagger-4" : ""}`}>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg">Humidity & Cloud Coverage Analysis</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={humidityChartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="time"
                  stroke="#6b7280"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#f3f4f6",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Humidity %"
                  animationDuration={1000}
                />
                <Line
                  type="monotone"
                  dataKey="clouds"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Clouds %"
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className={`mb-6 ${animate ? "animate-fade-in stagger-5" : ""}`}>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Cloud className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg">Hourly Forecast</h3>
            </div>
            <div className="overflow-x-auto scrollbar-dark">
              <div className="flex gap-4 pb-2 p-1">
                {hourlyData.map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 bg-gray-950/50 rounded-lg p-4 min-w-[100px] text-center border border-gray-800 hover:border-blue-600/50 hover:scale-105 transition-all duration-300 cursor-pointer"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="text-sm text-gray-500 mb-2">
                      {formatTime(item.dt)}
                    </div>
                    <div className="text-3xl mb-2 transition-transform hover:scale-125 duration-300">
                      {getWeatherEmoji(item.weather[0].icon)}
                    </div>
                    <div className="text-xl font-light">
                      {Math.round(item.main.temp)}°
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {item.weather[0].main}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className={`mb-6 ${animate ? "animate-fade-in stagger-6" : ""}`}>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Sun className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg">7-Day Forecast</h3>
            </div>
            <div className="space-y-3">
              {dailyData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-950/50 rounded-lg p-4 border border-gray-800 hover:border-gray-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-gray-400 w-12">
                      {formatDay(item.dt)}
                    </span>
                    <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
                      {getWeatherEmoji(item.weather[0].icon)}
                    </span>
                    <span className="text-gray-300 capitalize">
                      {item.weather[0].description}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-500">
                      {Math.round(item.main.temp_min)}°
                    </span>
                    <span className="font-normal">
                      {Math.round(item.main.temp_max)}°
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sunrise & Sunset */}
        <div className={`${animate ? "animate-fade-in stagger-6" : ""}`}>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm hover:border-gray-700 transition-all duration-300">
            <div className="flex items-center justify-around">
              <div className="flex items-center gap-3 group cursor-pointer">
                <Sunrise className="w-6 h-6 text-orange-400 group-hover:scale-125 transition-transform duration-300" />
                <div>
                  <div className="text-gray-500 text-sm">Sunrise</div>
                  <div className="text-xl font-light">
                    {formatTime(weather.current.sys.sunrise)}
                  </div>
                </div>
              </div>
              <div className="h-12 w-px bg-gray-800"></div>
              <div className="flex items-center gap-3 group cursor-pointer">
                <Sunset className="w-6 h-6 text-pink-400 group-hover:scale-125 transition-transform duration-300" />
                <div>
                  <div className="text-gray-500 text-sm">Sunset</div>
                  <div className="text-xl font-light">
                    {formatTime(weather.current.sys.sunset)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;

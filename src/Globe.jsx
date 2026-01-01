import React, { useEffect, useRef, useState, useContext } from "react";
import { ViewContext, CityContext } from "./Context"; 
import * as THREE from "three";

// (Cities array remains the same)
const cities = [
  // --- ASIA (50) ---
  { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { name: "Delhi", lat: 28.6139, lng: 77.2090 },
  { name: "Shanghai", lat: 31.2304, lng: 121.4737 },
  { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
  { name: "Beijing", lat: 39.9042, lng: 116.4074 },
  { name: "Osaka", lat: 34.6937, lng: 135.5023 },
  { name: "Karachi", lat: 24.8607, lng: 67.0011 },
  { name: "Dhaka", lat: 23.8103, lng: 90.4125 },
  { name: "Chongqing", lat: 29.5630, lng: 106.5516 },
  { name: "Istanbul", lat: 41.0082, lng: 28.9784 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Manila", lat: 14.5995, lng: 120.9842 },
  { name: "Guangzhou", lat: 23.1291, lng: 113.2644 },
  { name: "Shenzhen", lat: 22.5431, lng: 114.0579 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Bangkok", lat: 13.7563, lng: 100.5018 },
  { name: "Seoul", lat: 37.5665, lng: 126.9780 },
  { name: "Jakarta", lat: -6.2088, lng: 106.8456 },
  { name: "Lahore", lat: 31.5497, lng: 74.3436 },
  { name: "Tehran", lat: 35.6892, lng: 51.3890 },
  { name: "Ho Chi Minh City", lat: 10.8231, lng: 106.6297 },
  { name: "Hong Kong", lat: 22.3193, lng: 114.1694 },
  { name: "Hanoi", lat: 21.0285, lng: 105.8542 },
  { name: "Hyderabad", lat: 17.3850, lng: 78.4867 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { name: "Kuala Lumpur", lat: 3.1390, lng: 101.6869 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Baghdad", lat: 33.3152, lng: 44.3661 },
  { name: "Riyadh", lat: 24.7136, lng: 46.6753 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Wuhan", lat: 30.5928, lng: 114.3055 },
  { name: "Taipei", lat: 25.0330, lng: 121.5654 },
  { name: "Chengdu", lat: 30.5728, lng: 104.0668 },
  { name: "Surat", lat: 21.1702, lng: 72.8311 },
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Jeddah", lat: 21.4858, lng: 39.1925 },
  { name: "Amman", lat: 31.9454, lng: 35.9284 },
  { name: "Tel Aviv", lat: 32.0853, lng: 34.7818 },
  { name: "Tashkent", lat: 41.2995, lng: 69.2401 },
  { name: "Baku", lat: 40.4093, lng: 49.8671 },
  { name: "Phnom Penh", lat: 11.5564, lng: 104.9282 },
  { name: "Ulaanbaatar", lat: 47.8864, lng: 106.9057 },
  { name: "Kathmandu", lat: 27.7172, lng: 85.3240 },
  { name: "Colombo", lat: 6.9271, lng: 79.8612 },
  { name: "Doha", lat: 25.2854, lng: 51.5310 },
  { name: "Abu Dhabi", lat: 24.4539, lng: 54.3773 },
  { name: "Muscat", lat: 23.5859, lng: 58.4059 },
  { name: "Kuwait City", lat: 29.3759, lng: 47.9774 },
  { name: "Pyongyang", lat: 39.0392, lng: 125.7625 },

  // --- EUROPE (40) ---
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Moscow", lat: 55.7558, lng: 37.6173 },
  { name: "Berlin", lat: 52.5200, lng: 13.4050 },
  { name: "Madrid", lat: 40.4168, lng: -3.7038 },
  { name: "Rome", lat: 41.9028, lng: 12.4964 },
  { name: "Kyiv", lat: 50.4501, lng: 30.5234 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Bucharest", lat: 44.4268, lng: 26.1025 },
  { name: "Vienna", lat: 48.2082, lng: 16.3738 },
  { name: "Hamburg", lat: 53.5511, lng: 9.9937 },
  { name: "Warsaw", lat: 52.2297, lng: 21.0122 },
  { name: "Budapest", lat: 47.4979, lng: 19.0402 },
  { name: "Barcelona", lat: 41.3851, lng: 2.1734 },
  { name: "Munich", lat: 48.1351, lng: 11.5820 },
  { name: "Milan", lat: 45.4642, lng: 9.1900 },
  { name: "Prague", lat: 50.0755, lng: 14.4378 },
  { name: "Sofia", lat: 42.6977, lng: 23.3219 },
  { name: "Brussels", lat: 50.8503, lng: 4.3517 },
  { name: "Birmingham", lat: 52.4862, lng: -1.8904 },
  { name: "Amsterdam", lat: 52.3676, lng: 4.9041 },
  { name: "Naples", lat: 40.8518, lng: 14.2681 },
  { name: "Stockholm", lat: 59.3293, lng: 18.0686 },
  { name: "Copenhagen", lat: 55.6761, lng: 12.5683 },
  { name: "Helsinki", lat: 60.1695, lng: 24.9354 },
  { name: "Oslo", lat: 59.9139, lng: 10.7522 },
  { name: "Dublin", lat: 53.3498, lng: -6.2603 },
  { name: "Lisbon", lat: 38.7223, lng: -9.1393 },
  { name: "Athens", lat: 37.9838, lng: 23.7275 },
  { name: "Manchester", lat: 53.4808, lng: -2.2426 },
  { name: "Lyon", lat: 45.7640, lng: 4.8357 },
  { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
  { name: "Zurich", lat: 47.3769, lng: 8.5417 },
  { name: "Geneva", lat: 46.2044, lng: 6.1432 },
  { name: "Valencia", lat: 39.4699, lng: -0.3763 },
  { name: "Seville", lat: 37.3891, lng: -5.9845 },
  { name: "Antwerp", lat: 51.2194, lng: 4.4025 },
  { name: "Rotterdam", lat: 51.9225, lng: 4.4792 },
  { name: "St Petersburg", lat: 59.9311, lng: 30.3609 },
  { name: "Belgrade", lat: 44.7866, lng: 20.4489 },

  // --- NORTH AMERICA (30) ---
  { name: "New York", lat: 40.7128, lng: -74.0060 },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "Chicago", lat: 41.8781, lng: -87.6298 },
  { name: "Houston", lat: 29.7604, lng: -95.3698 },
  { name: "Phoenix", lat: 33.4484, lng: -112.0740 },
  { name: "Philadelphia", lat: 39.9526, lng: -75.1652 },
  { name: "San Antonio", lat: 29.4241, lng: -98.4936 },
  { name: "San Diego", lat: 32.7157, lng: -117.1611 },
  { name: "Dallas", lat: 32.7767, lng: -96.7970 },
  { name: "San Jose", lat: 37.3382, lng: -121.8863 },
  { name: "Toronto", lat: 43.6532, lng: -79.3832 },
  { name: "Montreal", lat: 45.5017, lng: -73.5673 },
  { name: "Vancouver", lat: 49.2827, lng: -123.1207 },
  { name: "Mexico City", lat: 19.4326, lng: -99.1332 },
  { name: "Guadalajara", lat: 20.6597, lng: -103.3496 },
  { name: "Monterrey", lat: 25.6866, lng: -100.3161 },
  { name: "Havana", lat: 23.1136, lng: -82.3666 },
  { name: "Guatemala City", lat: 14.6349, lng: -90.5069 },
  { name: "Panama City", lat: 8.9824, lng: -79.5199 },
  { name: "San Juan", lat: 18.4655, lng: -66.1057 },
  { name: "Boston", lat: 42.3601, lng: -71.0589 },
  { name: "Miami", lat: 25.7617, lng: -80.1918 },
  { name: "Seattle", lat: 47.6062, lng: -122.3321 },
  { name: "Denver", lat: 39.7392, lng: -104.9903 },
  { name: "Washington DC", lat: 38.9072, lng: -77.0369 },
  { name: "Atlanta", lat: 33.7490, lng: -84.3880 },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { name: "Ottawa", lat: 45.4215, lng: -75.6972 },
  { name: "Calgary", lat: 51.0447, lng: -114.0719 },
  { name: "Las Vegas", lat: 36.1699, lng: -115.1398 },

  // --- SOUTH AMERICA (20) ---
  { name: "Sao Paulo", lat: -23.5505, lng: -46.6333 },
  { name: "Buenos Aires", lat: -34.6037, lng: -58.3816 },
  { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
  { name: "Bogota", lat: 4.7110, lng: -74.0721 },
  { name: "Lima", lat: -12.0464, lng: -77.0428 },
  { name: "Santiago", lat: -33.4489, lng: -70.6693 },
  { name: "Caracas", lat: 10.4806, lng: -66.9036 },
  { name: "Belo Horizonte", lat: -19.9167, lng: -43.9345 },
  { name: "Porto Alegre", lat: -30.0346, lng: -51.2177 },
  { name: "Brasilia", lat: -15.8267, lng: -47.9218 },
  { name: "Medellin", lat: 6.2442, lng: -75.5812 },
  { name: "Quito", lat: -0.1807, lng: -78.4678 },
  { name: "Guayaquil", lat: -2.1710, lng: -79.9224 },
  { name: "Montevideo", lat: -34.9011, lng: -56.1645 },
  { name: "Asuncion", lat: -25.2637, lng: -57.5759 },
  { name: "La Paz", lat: -16.5000, lng: -68.1500 },
  { name: "Santa Cruz", lat: -17.7833, lng: -63.1833 },
  { name: "Curitiba", lat: -25.4290, lng: -49.2671 },
  { name: "Recife", lat: -8.0543, lng: -34.8813 },
  { name: "Manaus", lat: -3.1190, lng: -60.0217 },

  // --- AFRICA (15) ---
  { name: "Cairo", lat: 30.0444, lng: 31.2357 },
  { name: "Lagos", lat: 6.5244, lng: 3.3792 },
  { name: "Kinshasa", lat: -4.4419, lng: 15.2663 },
  { name: "Johannesburg", lat: -26.2041, lng: 28.0473 },
  { name: "Nairobi", lat: -1.2864, lng: 36.8172 },
  { name: "Addis Ababa", lat: 9.0320, lng: 38.7469 },
  { name: "Alexandria", lat: 31.2001, lng: 29.9187 },
  { name: "Casablanca", lat: 33.5731, lng: -7.5898 },
  { name: "Cape Town", lat: -33.9249, lng: 18.4241 },
  { name: "Durban", lat: -29.8587, lng: 31.0218 },
  { name: "Accra", lat: 5.6037, lng: -0.1870 },
  { name: "Algiers", lat: 36.7538, lng: 3.0588 },
  { name: "Khartoum", lat: 15.5007, lng: 32.5599 },
  { name: "Luanda", lat: -8.8383, lng: 13.2344 },
  { name: "Dar es Salaam", lat: -6.7924, lng: 39.2083 },

  // --- OCEANIA (5) ---
  { name: "Sydney", lat: -33.8688, lng: 151.2093 },
  { name: "Melbourne", lat: -37.8136, lng: 144.9631 },
  { name: "Brisbane", lat: -27.4698, lng: 153.0251 },
  { name: "Perth", lat: -31.9505, lng: 115.8605 },
  { name: "Auckland", lat: -36.8485, lng: 174.7633 }
];

const Globe = () => {
  const mountRef = useRef(null);
  const [hoveredCity, setHoveredCity] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isRotating, setIsRotating] = useState(true);

  const globeRef = useRef(null);
  const isDraggingRef = useRef(false);
  const isHoveringRef = useRef(false);
  const isRotatingRef = useRef(true);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  const { setView } = useContext(ViewContext);
  const { setCity } = useContext(CityContext);

  const setWeather = () => {
    setCity(selectedCity.name);
    setView('dashboard');
  };

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // --- STARFIELD ---
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 3000;
    const posArray = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff, transparent: true, opacity: 0.8 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // --- GLOBE ---
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load("https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg");
    
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshPhongMaterial({ 
        map: earthTexture, 
        shininess: 15,
        bumpScale: 0.05 
      })
    );
    scene.add(globe);
    globeRef.current = globe;

    // --- ATMOSPHERE GLOW ---
    const atmosphereGeom = new THREE.SphereGeometry(1.1, 64, 64);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(0.0, 0.95, 1.0, 1.0) * intensity;
        }
      `,
      side: THREE.BackSide,
      transparent: true
    });
    const atmosphere = new THREE.Mesh(atmosphereGeom, atmosphereMat);
    scene.add(atmosphere);

    // --- MARKERS ---
    const markersGroup = new THREE.Group();
    cities.forEach((city) => {
      const radius = 1.01;
      const phi = (90 - city.lat) * (Math.PI / 180);
      const theta = (city.lng + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);

      // Neon Marker Glow
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.012, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x00f2ff })
      );
      marker.position.set(x, y, z);
      marker.userData = { city };
      markersGroup.add(marker);
    });
    globe.add(markersGroup);

    // --- LIGHTING ---
    scene.add(new THREE.AmbientLight(0x404040, 1));
    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(5, 3, 5);
    scene.add(mainLight);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markersGroup.children);

      if (intersects.length > 0) {
        setHoveredCity(intersects[0].object.userData.city);
        setTooltipPos({ x: e.clientX, y: e.clientY });
        isHoveringRef.current = true;
        document.body.style.cursor = "pointer";
      } else {
        setHoveredCity(null);
        isHoveringRef.current = false;
        document.body.style.cursor = "default";
      }

      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousMousePositionRef.current.x;
        const deltaY = e.clientY - previousMousePositionRef.current.y;
        globe.rotation.y += deltaX * 0.005;
        globe.rotation.x += deltaY * 0.005;
        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onClick = (e) => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markersGroup.children);
      if (intersects.length > 0) {
        setSelectedCity(intersects[0].object.userData.city);
        setIsRotating(false);
      }
    };

    const onMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };
    
    const onMouseUp = () => (isDraggingRef.current = false);

    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("mousedown", onMouseDown);
    renderer.domElement.addEventListener("click", onClick);
    window.addEventListener("mouseup", onMouseUp);

    const animate = () => {
      requestAnimationFrame(animate);
      if (isRotatingRef.current && !isDraggingRef.current && !isHoveringRef.current) {
        globe.rotation.y += 0.0015;
      }
      // Subtle background star drift
      stars.rotation.y += 0.0001;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-[#020617] relative overflow-hidden font-sans">
      <div ref={mountRef} className="w-full h-full" />

      {/* Manual Stop Button */}
      <button
        onClick={() => setIsRotating(!isRotating)}
        className={`absolute bottom-10 left-10 z-[110] px-6 py-2.5 rounded-full border transition-all duration-500 flex items-center gap-3 backdrop-blur-xl font-bold tracking-widest text-[10px] uppercase shadow-[0_0_20px_rgba(0,0,0,0.5)]
          ${isRotating ? "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20" : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"}`}
      >
        <span className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${isRotating ? "bg-red-500 animate-pulse" : "bg-emerald-500"}`} />
        {isRotating ? "Freeze Orbit" : "Resume Orbit"}
      </button>

      {/* Hover Tooltip - Minimal Glass */}
      {hoveredCity && !selectedCity && (
        <div
          className="absolute z-[100] pointer-events-none p-3 px-5 bg-black/40 border border-[#00f2ff]/30 rounded-full shadow-[0_0_20px_rgba(0,242,255,0.15)] backdrop-blur-md text-white flex items-center gap-3 animate-in fade-in zoom-in-90"
          style={{ left: tooltipPos.x, top: tooltipPos.y - 30, transform: "translateX(-50%)" }}
        >
          <div className="w-2 h-2 rounded-full bg-[#00f2ff] animate-ping" />
          <span className="text-sm font-medium tracking-wide">{hoveredCity.name}</span>
        </div>
      )}

      {/* CITY DETAILS MODAL - Hyper UI */}
      {selectedCity && (
        <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-[#0f172a]/80 border border-white/10 p-8 rounded-[2rem] max-w-sm w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-8 duration-500 backdrop-blur-2xl">
            <div className="flex justify-between items-start mb-8">
              <div className="relative">
                <h2 className="text-4xl font-bold text-white tracking-tight">{selectedCity.name}</h2>
                <div className="h-1 w-12 bg-[#00f2ff] mt-2 rounded-full" />
              </div>
              <button 
                onClick={() => setSelectedCity(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all border border-white/10"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[10px] uppercase text-white/30 mb-1 tracking-tighter font-bold">Latitude</p>
                <p className="text-white font-mono text-lg">{selectedCity.lat.toFixed(2)}°</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[10px] uppercase text-white/30 mb-1 tracking-tighter font-bold">Longitude</p>
                <p className="text-white font-mono text-lg">{selectedCity.lng.toFixed(2)}°</p>
              </div>
            </div>

            <button 
              className="group relative w-full bg-[#00f2ff] hover:bg-[#00f2ff] text-black font-black py-5 rounded-2xl transition-all shadow-[0_0_30px_rgba(0,242,255,0.3)] overflow-hidden"
              onClick={setWeather}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                LAUNCH REPORT
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>
          </div>
        </div>
      )}

      {/* Header UI - With Integrated Pulsing Globe */}
      <div className="absolute top-10 left-10 flex flex-col gap-1">
  {/* Logo and Globe Row */}
  <div className="flex items-center gap-5">
    <div className="group relative cursor-pointer">
      <h1 className="text-4xl font-extralight text-white tracking-tighter select-none">
        WORLD<span className="font-bold text-[#00f2ff]">Weather</span>
      </h1>
      {/* Subtle Scanner Line Animation */}
      <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent opacity-50 animate-shimmer" />
    </div>

    {/* 3D Pulsing Globe Icon */}
    <div className="relative w-8 h-8 group transition-all duration-500 hover:scale-125">
      <div className="absolute inset-0 rounded-full bg-[#00f2ff]/20 animate-ping" />
      <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-[0_0_8px_#00f2ff]" fill="none" stroke="#00f2ff" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" className="opacity-40" />
        <g className="animate-spin-y origin-center">
          <ellipse cx="12" cy="12" rx="4" ry="10" />
        </g>
      </svg>
    </div>
  </div>

  {/* NEW: Instruction Text */}
  <div className="flex items-center gap-2 mt-2 px-1">
    <div className="h-[1px] w-4 bg-[#00f2ff]/50" />
    <p className="text-[10px] uppercase tracking-[0.3em] text-[#00f2ff]/80 font-medium animate-pulse">
      Select a city from globe
    </p>
  </div>
</div>
    </div>
  );
};

export default Globe;
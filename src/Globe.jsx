import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// (Cities array remains the same as your provided list)
const cities = [
  { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { name: "Delhi", lat: 28.7041, lng: 77.1025 },
  { name: "Shanghai", lat: 31.2304, lng: 121.4737 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Beijing", lat: 39.9042, lng: 116.4074 },
  { name: "Osaka", lat: 34.6937, lng: 135.5023 },
  { name: "Karachi", lat: 24.8607, lng: 67.0011 },
  { name: "Dhaka", lat: 23.8103, lng: 90.4125 },
  { name: "Bangkok", lat: 13.7563, lng: 100.5018 },
  { name: "Seoul", lat: 37.5665, lng: 126.978 },
  { name: "Hong Kong", lat: 22.3193, lng: 114.1694 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Istanbul", lat: 41.0082, lng: 28.9784 },
  { name: "Tehran", lat: 35.6892, lng: 51.389 },
  { name: "Jakarta", lat: -6.2088, lng: 106.8456 },
  { name: "Manila", lat: 14.5995, lng: 120.9842 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Ho Chi Minh City", lat: 10.8231, lng: 106.6297 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Lahore", lat: 31.5497, lng: 74.3436 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Kuala Lumpur", lat: 3.139, lng: 101.6869 },
  { name: "Baghdad", lat: 33.3152, lng: 44.3661 },
  { name: "Riyadh", lat: 24.7136, lng: 46.6753 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Tel Aviv", lat: 32.0853, lng: 34.7818 },
  { name: "Jerusalem", lat: 31.7683, lng: 35.2137 },
  { name: "Kabul", lat: 34.5553, lng: 69.2075 },
  { name: "Kathmandu", lat: 27.7172, lng: 85.324 },
  { name: "Colombo", lat: 6.9271, lng: 79.8612 },
  { name: "Hanoi", lat: 21.0285, lng: 105.8542 },
  { name: "Taipei", lat: 25.033, lng: 121.5654 },
  { name: "Pyongyang", lat: 39.0392, lng: 125.7625 },
  { name: "Ulaanbaatar", lat: 47.8864, lng: 106.9057 },
  { name: "Yangon", lat: 16.8661, lng: 96.1951 },
  { name: "Moscow", lat: 55.7558, lng: 37.6173 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Berlin", lat: 52.52, lng: 13.405 },
  { name: "Madrid", lat: 40.4168, lng: -3.7038 },
  { name: "Rome", lat: 41.9028, lng: 12.4964 },
  { name: "Kyiv", lat: 50.4501, lng: 30.5234 },
  { name: "Barcelona", lat: 41.3851, lng: 2.1734 },
  { name: "Athens", lat: 37.9838, lng: 23.7275 },
  { name: "Vienna", lat: 48.2082, lng: 16.3738 },
  { name: "Amsterdam", lat: 52.3676, lng: 4.9041 },
  { name: "Brussels", lat: 50.8503, lng: 4.3517 },
  { name: "Warsaw", lat: 52.2297, lng: 21.0122 },
  { name: "Budapest", lat: 47.4979, lng: 19.0402 },
  { name: "Stockholm", lat: 59.3293, lng: 18.0686 },
  { name: "Copenhagen", lat: 55.6761, lng: 12.5683 },
  { name: "Oslo", lat: 59.9139, lng: 10.7522 },
  { name: "Helsinki", lat: 60.1695, lng: 24.9354 },
  { name: "Prague", lat: 50.0755, lng: 14.4378 },
  { name: "Dublin", lat: 53.3498, lng: -6.2603 },
  { name: "Lisbon", lat: 38.7223, lng: -9.1393 },
  { name: "Munich", lat: 48.1351, lng: 11.582 },
  { name: "Milan", lat: 45.4642, lng: 9.19 },
  { name: "Hamburg", lat: 53.5511, lng: 9.9937 },
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "Mexico City", lat: 19.4326, lng: -99.1332 },
  { name: "Toronto", lat: 43.6532, lng: -79.3832 },
  { name: "Chicago", lat: 41.8781, lng: -87.6298 },
  { name: "Houston", lat: 29.7604, lng: -95.3698 },
  { name: "Miami", lat: 25.7617, lng: -80.1918 },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { name: "Vancouver", lat: 49.2827, lng: -123.1207 },
  { name: "Montreal", lat: 45.5017, lng: -73.5673 },
  { name: "Phoenix", lat: 33.4484, lng: -112.074 },
  { name: "Seattle", lat: 47.6062, lng: -122.3321 },
  { name: "Boston", lat: 42.3601, lng: -71.0589 },
  { name: "Las Vegas", lat: 36.1699, lng: -115.1398 },
  { name: "Atlanta", lat: 33.749, lng: -84.388 },
  { name: "Denver", lat: 39.7392, lng: -104.9903 },
  { name: "Washington DC", lat: 38.9072, lng: -77.0369 },
  { name: "Philadelphia", lat: 39.9526, lng: -75.1652 },
  { name: "San Diego", lat: 32.7157, lng: -117.1611 },
  { name: "Dallas", lat: 32.7767, lng: -96.797 },
  { name: "Guadalajara", lat: 20.6597, lng: -103.3496 },
  { name: "Havana", lat: 23.1136, lng: -82.3666 },
  { name: "São Paulo", lat: -23.5505, lng: -46.6333 },
  { name: "Buenos Aires", lat: -34.6037, lng: -58.3816 },
  { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
  { name: "Lima", lat: -12.0464, lng: -77.0428 },
  { name: "Bogotá", lat: 4.711, lng: -74.0721 },
  { name: "Santiago", lat: -33.4489, lng: -70.6693 },
  { name: "Caracas", lat: 10.4806, lng: -66.9036 },
  { name: "Brasília", lat: -15.8267, lng: -47.9218 },
  { name: "Montevideo", lat: -34.9011, lng: -56.1645 },
  { name: "Quito", lat: -0.1807, lng: -78.4678 },
  { name: "La Paz", lat: -16.5, lng: -68.15 },
  { name: "Cairo", lat: 30.0444, lng: 31.2357 },
  { name: "Lagos", lat: 6.5244, lng: 3.3792 },
  { name: "Kinshasa", lat: -4.4419, lng: 15.2663 },
  { name: "Johannesburg", lat: -26.2041, lng: 28.0473 },
  { name: "Nairobi", lat: -1.2864, lng: 36.8172 },
  { name: "Casablanca", lat: 33.5731, lng: -7.5898 },
  { name: "Addis Ababa", lat: 9.032, lng: 38.7469 },
  { name: "Cape Town", lat: -33.9249, lng: 18.4241 },
  { name: "Algiers", lat: 36.7538, lng: 3.0588 },
  { name: "Accra", lat: 5.6037, lng: -0.187 },
  { name: "Dakar", lat: 14.7167, lng: -17.4677 },
  { name: "Dar es Salaam", lat: -6.7924, lng: 39.2083 },
  { name: "Kampala", lat: 0.3476, lng: 32.5825 },
  { name: "Luanda", lat: -8.8383, lng: 13.2344 },
  { name: "Abidjan", lat: 5.36, lng: -4.0083 },
  { name: "Sydney", lat: -33.8688, lng: 151.2093 },
  { name: "Melbourne", lat: -37.8136, lng: 144.9631 },
  { name: "Brisbane", lat: -27.4698, lng: 153.0251 },
  { name: "Perth", lat: -31.9505, lng: 115.8605 },
  { name: "Auckland", lat: -36.8485, lng: 174.7633 },
  { name: "Wellington", lat: -41.2865, lng: 174.7762 },
  { name: "Adelaide", lat: -34.9285, lng: 138.6007 },
];

const Globe = () => {
  const mountRef = useRef(null);
  const [hoveredCity, setHoveredCity] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isRotating, setIsRotating] = useState(true); // Rotation State

  const globeRef = useRef(null);
  const cloudRef = useRef(null);
  const isDraggingRef = useRef(false);
  const isHoveringRef = useRef(false);
  const isRotatingRef = useRef(true); // Ref for the animation loop
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  // Sync state with ref for the animation loop
  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
    );
    const cloudTexture = textureLoader.load(
      "https://unpkg.com/three-globe/example/img/earth-clouds.png"
    );

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshPhongMaterial({ map: earthTexture, shininess: 5 })
    );
    scene.add(globe);
    globeRef.current = globe;

    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(1.02, 64, 64),
      new THREE.MeshPhongMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.4,
      })
    );
    scene.add(clouds);
    cloudRef.current = clouds;

    const markersGroup = new THREE.Group();
    cities.forEach((city) => {
      const radius = 1.005;
      const phi = (90 - city.lat) * (Math.PI / 180);
      const theta = (city.lng + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);

      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.012, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x00f2ff })
      );
      marker.position.set(x, y, z);
      marker.userData = { city };
      markersGroup.add(marker);
    });
    globe.add(markersGroup);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(5, 3, 5);
    scene.add(sun);

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
        clouds.rotation.y += deltaX * 0.005;
        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => (isDraggingRef.current = false);

    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const animate = () => {
      requestAnimationFrame(animate);
      // ROTATION LOGIC: Check manual toggle AND hover status
      if (
        isRotatingRef.current &&
        !isDraggingRef.current &&
        !isHoveringRef.current
      ) {
        globe.rotation.y += 0.001;
        clouds.rotation.y += 0.0012;
      }
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
        className={`absolute bottom-10 left-10 z-[110] px-6 py-2.5 rounded-full border transition-all duration-300 flex items-center gap-3 backdrop-blur-md font-bold tracking-widest text-[10px] uppercase
          ${
            isRotating
              ? "bg-red-500/10 border-red-500/50 text-red-400 hover:bg-red-500/20"
              : "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20"
          }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isRotating ? "bg-red-500 animate-pulse" : "bg-emerald-500"
          }`}
        />
        {isRotating ? "Stop Rotation" : "Resume Rotation"}
      </button>

      {/* Tooltip */}
      {hoveredCity && (
        <div
          className="absolute z-[100] pointer-events-none p-4 bg-white/10 border border-white/20 rounded-xl shadow-2xl backdrop-blur-md text-white"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y - 15,
            transform: "translate(-50%, -100%)",
          }}
        >
          <h3 className="text-lg font-bold text-[#00f2ff]">
            {hoveredCity.name}
          </h3>
          <div className="text-[10px] uppercase tracking-widest text-white/50 mt-1">
            {hoveredCity.lat.toFixed(2)}° N / {hoveredCity.lng.toFixed(2)}° E
          </div>
        </div>
      )}

      {/* Header UI */}
      <div className="absolute top-10 left-10 pointer-events-none">
        <h1 className="text-4xl font-extralight text-white tracking-tighter">
          WORLD<span className="font-bold text-[#00f2ff]">SCAN</span>
        </h1>
      </div>
    </div>
  );
};

export default Globe;

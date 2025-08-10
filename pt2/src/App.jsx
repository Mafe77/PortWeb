import "./App.css";
import NavBar from "./components/NavBar.jsx";
import ScrollingText from "./components/ScrollingText.jsx";
import { useState } from "react";
import gsap from "gsap";
import Draggable from "gsap/src/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";
import MyCanvas from "./components/MyCanvas.jsx";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  // gsap.registerPlugin(Draggable, InertiaPlugin);

  // Draggable.create(".tab", {
  //   bounds: ".container",
  //   inertia: true,
  // });

  return (
    <>
      <div className="relative grid grid-cols-5 auto-rows-min gap-2 w-screen h-screen border-4">
        <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <MyCanvas activeTab={activeTab} />
        {/* <ScrollingText className="absolute inset-0 z-[-1]" /> */}
      </div>
      <svg>
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            stitchTiles="stitch"
          />
          <feColorMatrix
            in="colorNoise"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
          <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
          <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
        </filter>
      </svg>
    </>
  );
}

export default App;

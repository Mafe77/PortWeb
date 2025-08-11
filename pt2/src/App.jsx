import "./App.css";
import NavBar from "./components/NavBar.jsx";
import ScrollingText from "./components/ScrollingText.jsx";
import { useState, useRef, useEffect } from "react";
import MyCanvas from "./components/MyCanvas.jsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaComputer, FaFolderOpen } from "react-icons/fa6";
import GoDesc from "./components/GoDesc.jsx";
import NavBarV2 from "./components/NavBarV2.jsx";
import FancyBorder from "./components/Border.jsx";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  // gsap.registerPlugin(Draggable, InertiaPlugin);

  // Draggable.create(".tab", {
  //   bounds: ".container",
  //   inertia: true,
  // });

  return (
    <>
      <div className="relative grid grid-cols-6 auto-rows-min gap-2 w-screen h-screen top-0 left-0">
        {/* <NavBar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
        <NavBarV2 />
        <FancyBorder className="relative w-screen h-screen" />
        <MyCanvas activeTab={activeTab} />
        {/* <ScrollingText className="absolute inset-0 z-[-1]" /> */}
      </div>

      <div className="w-screen h-screen z-0">
        <div className="relative top-30 -right-150 border-t-3 w-191 border-black">
          <div className="text-9xl font-light relative -left-142 -top-20">
            PROJECTS
          </div>
        </div>
      </div>
      <div className="w-screen h-screen bg-white z-20 relative"></div>
      <div className="absolute w-screen h-[20%] bg-red-500 z-20"></div>

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

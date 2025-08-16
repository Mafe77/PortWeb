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
import Horizontal from "./components/Horizontal.jsx";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  // gsap.registerPlugin(Draggable, InertiaPlugin);

  // Draggable.create(".tab", {
  //   bounds: ".container",
  //   inertia: true,
  // });

  return (
    <>
      <div className="relative w-screen h-screen ">
        {/* <NavBar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
        <NavBarV2 />
        <FancyBorder className="w-screen h-screen" />
        <MyCanvas activeTab={activeTab} />
        {/* <ScrollingText className="absolute inset-0 z-[-1]" /> */}
        {/* <div className="relative w-screen h-[200px] bg-red-500 z-20 bottom-0"></div> */}
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

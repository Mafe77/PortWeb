import "./App.css";
import NavBar from "./components/NavBar.jsx";
import ScrollingText from "./components/ScrollingText.jsx";
import { useState } from "react";
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
      <div className="relative grid grid-cols-6 auto-rows-min gap-2 w-screen h-screen">
        {/* <NavBar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
        <NavBarV2 />
        {/* <div className="absolute col-start-2 col-span-3 row-start-2 row-span-3 border-2 w-screen h-screen"></div>
        <div className="absolute top-20 left-1/2 w-[80%] h-px bg-black z-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-20 w-px h-[80%] bg-black z-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="test absolute row-start-2 row-span-4 col-span-3 col-start-2  h-[300px] w-[300px]"></div> */}
        <FancyBorder className="absolute w-screen h-screen" />

        <MyCanvas activeTab={activeTab} />
        {/* <ScrollingText className="absolute inset-0 z-[-1]" /> */}
        {activeTab === "go" && <GoDesc className="z-10" />}
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

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
  gsap.registerPlugin(Draggable, InertiaPlugin);

  Draggable.create(".tab", {
    bounds: ".container",
    inertia: true,
  });

  return (
    <div className="relative grid grid-cols-5 auto-rows-min gap-2 w-screen h-screen container">
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <MyCanvas activeTab={activeTab} />
      <ScrollingText className="w-full overflow-hidden" />
    </div>
  );
}

export default App;

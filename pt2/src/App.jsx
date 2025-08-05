import "./App.css";
import Keys from "./Keys.jsx";
import Keys2 from "./iKeys.jsx";
import { Canvas } from "@react-three/fiber";
import NavBar from "./components/NavBar.jsx";
import ScrollingText from "./components/ScrollingText.jsx";
import {
  View,
  PerspectiveCamera,
  Environment,
  Preload,
  Lightformer,
  OrbitControls,
} from "@react-three/drei";
import { useState } from "react";
import useKeysModel from "./components/Keychains/KeyLoader.jsx";
import { EightBallKey } from "./components/Keychains/EightBallKey.jsx";
import { BoardKey } from "./components/Keychains/BoardKey.jsx";
import {
  EffectComposer,
  HueSaturation,
  DotScreen,
} from "@react-three/postprocessing";
import gsap from "gsap";
import Draggable from "gsap/src/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const { nodes, materials } = useKeysModel();
  gsap.registerPlugin(Draggable, InertiaPlugin);

  Draggable.create(".tab", {
    bounds: ".container",
    inertia: true,
  });

  return (
    <div className="relative grid grid-cols-5 auto-rows-min gap-2 w-screen h-screen container">
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <View className="col-span-5 row-start-1 row-span-5 w-screen h-screen">
        <Common />
        {activeTab != "home" ? (
          <>
            <EffectComposer>
              <HueSaturation saturation={-1} />
              <DotScreen />
            </EffectComposer>
            <Keys position={[6, 0, 0]} />
          </>
        ) : (
          <Keys position={[0.2, 0, 0]} />
        )}
        <PerspectiveCamera makeDefault position={[0, 0, 16]} />
      </View>
      <ScrollingText className="w-full overflow-hidden" />

      {activeTab != "home" && (
        <>
          <div className="absolute col-span-3 col-start-2 row-start-2 border-white border-2 h-[600px] w-[300px] tab rounded-md">
            <div className="relative flex flex-row justify-end bg-white w-full p-2  top-0">
              <div className="text-md mx-4">⚊</div>
              <div className="text-md mr-4">❒</div>
              <div className="text-md mr-2">✕</div>
            </div>
            {activeTab === "keys" && (
              <View className="absolute bottom-0 w-[295px] h-[556px]">
                <Common color={"#d8d8d8"} />
                <pointLight position={[0, 10, 0]} intensity={10} />
                <BoardKey nodes={nodes} materials={materials} />
                <PerspectiveCamera
                  makeDefault
                  position={[-2.7, 7.3, 9]}
                  lookAt={[BoardKey]}
                />
              </View>
            )}

            {activeTab === "go" && (
              <View className="absolute bottom-0 w-[295px] h-[556px]">
                <PerspectiveCamera makeDefault position={[3, -1, 12]} />
                <Common color={"#d8d8d8"} />
                <Keys2 position={[-0.7, -7.5, 0]} />
              </View>
            )}
            {activeTab === "others" && (
              <View className="absolute bottom-0 w-[295px] h-[556px]">
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <Common color={"#d8d8d8"} />
                <EightBallKey nodes={nodes} materials={materials} />
              </View>
            )}
            {activeTab === "contact" && (
              <View className="absolute bottom-0 w-[295px] h-[556px]">
                <PerspectiveCamera makeDefault position={[0, -1, 10]} />
                <Common color={"#d8d8d8"} />
                <Keys2 position={[-16, -8.3, 0]} />
              </View>
            )}
          </div>
        </>
      )}

      <Canvas
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflow: "hidden",
          background: "transparent",
        }}
        gl={{ alpha: true }}
        eventSource={document.getElementById("root")}
      >
        <View.Port />
        <Preload all />
      </Canvas>
    </div>
  );
}

function Common({ color }) {
  return (
    <>
      {color && <color attach="background" args={[color]} />}
      <ambientLight intensity={1} />
      <directionalLight intensity={1} />
      <Environment
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/blue_photo_studio_1k.hdr"
        resolution={512}
      >
        <group rotation={[0, 0, 1]}>
          <Lightformer
            form="circle"
            intensity={10}
            position={[0, 10, -10]}
            scale={20}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
          <Lightformer
            intensity={0.1}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
            position={[-5, 1, -1]}
            rotation-y={Math.PI / 2}
            scale={[50, 10, 1]}
          />
          <Lightformer
            intensity={0.1}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
            position={[10, 1, 0]}
            rotation-y={-Math.PI / 2}
            scale={[50, 10, 1]}
          />
          <Lightformer
            color="white"
            intensity={0.2}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
            position={[0, 1, 0]}
            scale={[10, 100, 1]}
          />
        </group>
      </Environment>
    </>
  );
}

export default App;

import "../App.css";
import Keys from "./Keys.jsx";
import Keys2 from "./iKeys.jsx";
import { Canvas } from "@react-three/fiber";
import {
  View,
  PerspectiveCamera,
  Environment,
  Preload,
  Lightformer,
} from "@react-three/drei";
import useKeysModel from "./Keychains/KeyLoader.jsx";
import { EightBallKey } from "./Keychains/EightBallKey.jsx";
import { BoardKey } from "./Keychains/BoardKey.jsx";
import {
  EffectComposer,
  HueSaturation,
  DotScreen,
  Noise,
} from "@react-three/postprocessing";
import gsap from "gsap";
import Draggable from "gsap/src/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";

function MyCanvas({ activeTab }) {
  const { nodes, materials } = useKeysModel();
  gsap.registerPlugin(Draggable, InertiaPlugin);

  Draggable.create(".tab", {
    bounds: ".container1",
    inertia: true,
  });

  return (
    <>
      <View className="col-span-5 row-start-1 row-span-5 w-screen h-screen">
        <Common />
        {activeTab != "home" ? (
          <>
            <EffectComposer>
              <HueSaturation saturation={-1} />
              <DotScreen />
              <Noise opacity={0.2} />
            </EffectComposer>
            <Keys position={[6, -7.5, 0]} />
          </>
        ) : (
          <>
            <Keys position={[0, -7.5, 0]} />
          </>
        )}
        <PerspectiveCamera makeDefault position={[0, 0, 16]} />
      </View>

      {activeTab != "home" && (
        <>
          <div className="absolute col-span-3 col-start-2 row-start-2 border-tertuary border-6 h-[600px] w-[300px] tab rounded-md font-display text-white overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex flex-row bg-tertuary w-full p-2 justify-between z-10">
              <div className="relative text-2xl font-bold bottom-1">⁘</div>
              <span className=" text-xl">{activeTab}.exe</span>
              <div className="text-2xl font-bold bottom-1 relative">⁘</div>
            </div>

            {/* Content area automatically fills remaining height */}
            <div className="relative flex-1">
              {activeTab === "keys" && (
                <View className="absolute inset-0">
                  <Common color={"#f0e2d3"} />
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
                <View className="absolute inset-0">
                  <PerspectiveCamera makeDefault position={[3, -1, 12]} />
                  <Common color={"#1985A1"} />
                  <Keys2 position={[-0.7, -7.5, 0]} />
                </View>
              )}
              {activeTab === "others" && (
                <View className="absolute inset-0">
                  <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                  <Common color={"#d8d8d8"} />
                  <EightBallKey nodes={nodes} materials={materials} />
                </View>
              )}
              {activeTab === "contact" && (
                <View className="absolute inset-0">
                  <PerspectiveCamera makeDefault position={[0, -1, 10]} />
                  <Common color={"#d8d8d8"} />
                  <Keys2 position={[-16, -8.3, 0]} />
                </View>
              )}
            </div>
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
        className="container1 w-screen h-screen"
      >
        <View.Port />
        <Preload all />
      </Canvas>
    </>
  );
}

function Common({ color }) {
  return (
    <>
      {color && <color attach="background" args={[color]} />}
      <ambientLight intensity={0.2} />
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
            color="gray"
            intensity={0.4}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
            position={[0, 1, 0]}
            scale={[10, 100, 1]}
          />
        </group>
      </Environment>
    </>
  );
}

export default MyCanvas;

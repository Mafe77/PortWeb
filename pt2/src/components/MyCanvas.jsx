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

  return (
    <>
      <View className="col-span-5 row-start-1 row-span-5 w-screen h-screen z-30">
        <Common />
        <Keys position={[0, -7.5, 0]} />

        <PerspectiveCamera makeDefault position={[0, 0, 16]} />
      </View>

      <div className="flex flex-row justify-between absolute -bottom-250 w-screen">
        {/* Content area automatically fills remaining height */}
        <div className="h-[800px] w-[400px] rounded-md z-20 relative">
          <View className="absolute inset-0">
            <Common />
            <pointLight position={[0, 10, 0]} intensity={10} />
            <BoardKey nodes={nodes} materials={materials} />
            <PerspectiveCamera
              makeDefault
              position={[-2.7, 6.7, 10.5]}
              lookAt={[BoardKey]}
            />
          </View>
        </div>

        <div className=" h-[800px] w-[400px] rounded-md relative">
          <View className="absolute inset-0">
            <PerspectiveCamera makeDefault position={[3, -1.2, 12.5]} />
            <Common />
            <Keys2 position={[-0.7, -7.5, 0]} />
          </View>
        </div>
        <div className=" h-[800px] w-[400px] rounded-md relative">
          <View className="absolute inset-0">
            <PerspectiveCamera makeDefault position={[0, 0, 12]} />
            <Common />
            <EightBallKey nodes={nodes} materials={materials} />
          </View>
        </div>
        <div className=" h-[800px] w-[400px] rounded-md relative">
          <View className="absolute inset-0">
            <PerspectiveCamera makeDefault position={[0, -1, 10]} />
            <Common />
            <Keys2 position={[-16, -8.3, 0]} />
          </View>
        </div>
      </div>

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

function board() {
  return (
    <>
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

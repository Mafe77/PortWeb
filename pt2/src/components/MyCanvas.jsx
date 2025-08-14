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
import gsap from "gsap";
import Horizontal from "./Horizontal.jsx";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { useRef, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function MyCanvas({ activeTab }) {
  const containerRef = useRef();

  const { nodes, materials } = useKeysModel();

  useLayoutEffect(() => {
    const sections = gsap.utils.toArray(".slide");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=1000",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div>
      {/* 3D View */}
      <View className=" w-screen h-screen z-30 ">
        <Common />
        <Keys position={[0, -7.7, 1]} />
        <PerspectiveCamera makeDefault position={[0, 0, 16]} />
      </View>

      {/* Horizontal Scroll Section */}
      <div
        ref={containerRef}
        className="main h-screen overflow-hidden z-0 relative w-screen "
      >
        <Horizontal />
        <div className="horizontal-sliders flex h-screen w-[200%] relative">
          {/* Slide 1 */}
          <div className="slide flex-shrink-0 h-[80%] w-[60%] relative border-2 border-purple-600">
            <div className="relative border-2 text-6xl float-end">Keyboard</div>
            <View className="absolute inset-0 w-[30%] border-2">
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

          {/* Slide 2 */}
          <div className="slide flex-shrink-0 h-[80%] w-[60%] relative border-2 border-blue-600">
            <div className="relative border-2 text-6xl float-end">
              Shape of Go
            </div>
            <View className="absolute inset-0 border-2 w-[30%]">
              <PerspectiveCamera makeDefault position={[3, -1.2, 12.5]} />
              <Common />
              <Keys2 position={[-0.7, -7.5, 0]} />
            </View>
          </div>

          {/* Slide 3 */}
          <div className="slide flex-shrink-0 h-[80%] w-[60%] relative border-2 border-red-600">
            <div className="relative border-2 text-6xl float-end">Others</div>
            <View className="absolute inset-0 border-2 w-[30%]">
              <PerspectiveCamera makeDefault position={[0, 0, 12]} />
              <Common />
              <EightBallKey nodes={nodes} materials={materials} />
            </View>
          </div>

          {/* Slide 4 */}
          <div className="slide flex-shrink-0 h-[80%] w-[60%] relative border-2 border-green-600">
            <div className="relative border-2 text-6xl float-end">Info</div>
            <View className="absolute inset-0 border-2 w-[30%]">
              <PerspectiveCamera makeDefault position={[0, -1, 10]} />
              <Common />
              <Keys2 position={[-16, -8.3, 0]} />
            </View>
          </div>
        </div>
      </div>

      {/* Fixed Canvas */}
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflow: "hidden",
          background: "transparent",
          pointerEvents: "none", // prevents blocking scroll
        }}
        gl={{ alpha: true }}
        eventSource={document.getElementById("root")}
        className="container1 w-screen h-screen"
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

// export default MyCanvas;

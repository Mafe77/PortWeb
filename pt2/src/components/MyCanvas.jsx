import "../App.css";
import Keys from "./Keys.jsx";
import { Canvas, extend, useFrame } from "@react-three/fiber";
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
import ScrollTrigger from "gsap/src/ScrollTrigger";
import ScrollSmoother from "gsap/src/ScrollSmoother";
import { useRef, useEffect } from "react";
import { GoKey } from "./Keychains/GoKey.jsx";
import keyImage from "../assets/placeholder1.png";
import DottedSlide from "./DottedSlide.jsx";

export default function MyCanvas() {
  const { nodes, materials } = useKeysModel();

  const containerRef = useRef(null);
  const maskRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const mask = maskRef.current;
    if (!container || !mask) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      mask.style.setProperty("--x", `${x}%`);
      mask.style.setProperty("--y", `${y}%`);
    };

    const handleMouseLeave = () => {
      mask.style.setProperty("--x", `50%`);
      mask.style.setProperty("--y", `50%`);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const slidesData = {
    Key: {
      name: "KEYBOARD",
      model: <BoardKey nodes={nodes} materials={materials} />,
      camera: <PerspectiveCamera makeDefault position={[-2.7, 6.7, 8.7]} />,
      image: keyImage,
    },
    GoKey: {
      name: "SHAPE OF GO",
      model: <GoKey nodes={nodes} materials={materials} />,
      camera: <PerspectiveCamera makeDefault position={[3.2, 6, 14]} />,
      image: keyImage,
    },
    EightBall: {
      name: "OTHERS",
      model: <EightBallKey nodes={nodes} materials={materials} />,
      camera: <PerspectiveCamera makeDefault position={[0, 0, 12]} />,
      image: keyImage,
    },
  };

  return (
    <div className="mx-width relative z-50">
      <div className="relative text-secondary">
        <h1 className="font-display text-[11rem] absolute -top-12 right-1 tracking-tight">
          FRONTENDEVELOPER
        </h1>
        <View className="h-screen z-[-1] mx-width ">
          <Common />
          <Keys position={[0.23, -7.7, 1]} />
          <PerspectiveCamera makeDefault position={[0, 0, 16]} />
        </View>
      </div>
      <div className="h-screen flex flex-col relative font-display justify-center items-center">
        {Object.entries(slidesData).map(([key, slide], index) => (
          <DottedSlide
            key={key}
            className={`border-secondary border-1 h-500 w-[90%] bg-primary rounded-sm ${
              index > 0 ? "mt-10" : ""
            }`}
          >
            {/* Header */}
            <div className="w-full border-b-1 h-10 flex justify-between px-10 text-lg font-display bg-[#222] z-50 text-secondary">
              <h2 className="relative top-1 font-medium">{slide.name}</h2>
              <button className="border-1 px-2 my-1 rounded-lg hover:bg-primary hover:text-secondary">
                Explore
              </button>
            </div>

            {/* Content */}
            <div className="relative h-full flex justify-n">
              <div className="relative w-[22%]">
                <View className="absolute inset-0">
                  <Common />
                  {slide.model}
                  {slide.camera}
                </View>
              </div>
              <img
                src={slide.image}
                className="relative h-[92%] w-[56%] border-x-4 border-secondary"
              />
              <div className="text-secondary flex flex-col text-3xl w-[22%] text-center p-4">
                <span className="border-2 rounded-xl mt-5">
                  React three fiber
                </span>
                <span className="border-2 rounded-xl mt-5">Three Js</span>
                <span className="border-2 rounded-xl mt-5">CSS</span>
                <span className="border-2 rounded-xl mt-5">HTML</span>
                <span className="border-2 rounded-xl mt-5">GSAP</span>
              </div>
            </div>
          </DottedSlide>
        ))}
      </div>

      {/* Slide 4
          <div className="slide flex-shrink-0 h-[80%] relative border-2 border-green-600">
            <div className="slide-title relative border-2 text-6xl float-end">
              Info
            </div>
            <View className="absolute inset-0 border-2 ">
              <PerspectiveCamera makeDefault position={[0, -1, 10]} />
              <Common />
              <Keys2 position={[-16, -8.3, 0]} />
            </View>
          </div> */}
      {/* Fixed Canvas */}
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflow: "hidden",
        }}
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

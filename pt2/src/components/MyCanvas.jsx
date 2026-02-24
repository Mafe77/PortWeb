import "../App.css";
import Keys from "./Keys.jsx";
import KeysTry from "./KeysTry.jsx";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  Lightformer,
  Html,
  useProgress,
} from "@react-three/drei";
import useKeysModel from "./Keychains/KeyLoader.jsx";
import { EightBallKey } from "./Keychains/EightBallKey.jsx";
import { BoardKey } from "./Keychains/BoardKey.jsx";
import { useRef, useEffect, Suspense, useState } from "react";
import { GoKey } from "./Keychains/GoKey.jsx";
import KEV1 from "../assets/KEV1.png";
import AISD1 from "../assets/AISD1.png";
import AISD2 from "../assets/AISD2.png";
import ATAMA1 from "../assets/Atama1.png";
import ATAMA2 from "../assets/Atama2.png";
import AISD3 from "../assets/AISD3.png";
import SPG1 from "../assets/SPG1-1.png";
import SPG2 from "../assets/SPG2-1.png";
import SPG3 from "../assets/SPG3-1.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Slides from "./Slides.jsx";
import Header from "./Header.jsx";
import { Perf } from "r3f-perf";

gsap.registerPlugin(ScrollTrigger);

function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
}

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
      name: "PROJECT -- [ATAMA]",
      model: <BoardKey nodes={nodes} materials={materials} />,
      camera: <PerspectiveCamera makeDefault position={[-2.7, 7, 8]} />,
      image: [ATAMA1, ATAMA2],
      text: { 0: "MERN", 1: "Tailwind", 3: "Figma" },
      gitHub: "https://github.com/paulvinueza30/group-20-large-project",
    },
    GoKey: {
      name: "PROJECT -- [SHAPES OF GO]",
      model: <GoKey nodes={nodes} materials={materials} />,
      camera: <PerspectiveCamera makeDefault position={[3.5, 6.5, 11]} />,
      image: [SPG2, SPG1, SPG3],
      text: { 0: "Pygame", 1: "AI", 2: "Python" },
      gitHub: "https://github.com/Mafe77/alphazero-go",
    },
    EightBall: {
      name: "PROJECT -- [AI FOR SAFE DRIVING]",
      model: <EightBallKey nodes={nodes} materials={materials} />,
      camera: <PerspectiveCamera makeDefault position={[0.2, 0, 10]} />,
      image: [AISD1, AISD2, AISD3],
      text: { 0: "PERN", 1: "Websockets", 2: "Figma" },
      gitHub: "https://github.com/colemaring/sd1",
    },
  };

  function Loader() {
    const { progress } = useProgress();
    return (
      <Html center>
        <div style={{ color: "#B3CBF6" }}>Loading {progress.toFixed(0)}%</div>
      </Html>
    );
  }

  return (
    <div className="mx-width relative z-50">
      <section
        className="relative text-secondary h-screen flex flex-wrap justify-center"
        id="home"
      >
        {/* <Header /> */}
        <Canvas
          style={{
            position: "relative",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            overflow: "hidden",
          }}
        >
          {/* <Perf position="bottom-left" /> */}
          <Suspense fallback={<Loader />}>
            <Common />
            {/* <Keys position={[0.23, -7.7, 0]} /> */}
            <KeysTry position={[0.23, -7.7, 0]} />
            <PerspectiveCamera makeDefault position={[0, 0, 15]} />
          </Suspense>
        </Canvas>
      </section>
      <section id="projects">
        <Slides slidesData={slidesData} />
      </section>
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

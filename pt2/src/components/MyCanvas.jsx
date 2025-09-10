import "../App.css";
import Keys from "./Keys.jsx";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Environment, Lightformer } from "@react-three/drei";
import useKeysModel from "./Keychains/KeyLoader.jsx";
import { EightBallKey } from "./Keychains/EightBallKey.jsx";
import { BoardKey } from "./Keychains/BoardKey.jsx";
import { useRef, useEffect } from "react";
import { GoKey } from "./Keychains/GoKey.jsx";
import keyImage from "../assets/placeholder2.png";
import Atama1 from "../assets/Atama1.png";
import SPG1 from "../assets/SPG1.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Slides from "./Slides.jsx";
import Header from "./Header.jsx";

gsap.registerPlugin(ScrollTrigger);

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
      image: Atama1,
      text: { 0: "MERN", 1: "Figma", 2: "Tailwind" },
    },
    GoKey: {
      name: "PROJECT -- [SHAPES OF GO]",
      model: <GoKey nodes={nodes} materials={materials} />,
      camera: <PerspectiveCamera makeDefault position={[3.5, 6.5, 11]} />,
      image: SPG1,
      text: { 0: "ThreeJS", 1: "HTML/CSS", 2: "GSAP" },
    },
    EightBall: {
      name: "-- [ARCHIVE]",
      model: <EightBallKey nodes={nodes} materials={materials} />,
      camera: <PerspectiveCamera makeDefault position={[0.2, 0, 10]} />,
      image: keyImage,
      text: { 0: "Atama", 1: "Shaders", 2: "AISD" },
    },
  };

  return (
    <div className="mx-width relative z-50">
      <section
        className="relative text-secondary h-screen flex flex-wrap"
        id="home"
      >
        <Header />
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
          <Common />
          <Keys position={[0.23, -7.7, 0]} />
          <PerspectiveCamera makeDefault position={[0, 0, 15]} />
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

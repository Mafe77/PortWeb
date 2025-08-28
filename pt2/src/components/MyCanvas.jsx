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
import { useRef, useEffect } from "react";
import { GoKey } from "./Keychains/GoKey.jsx";
import keyImage from "../assets/placeholder2.png";
import DottedSlide from "./DottedSlide.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Slides from "./Slides.jsx";

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

  const linesRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".css-typing",
        start: "top 80%", // when block hits 80% viewport height
        toggleActions: "play none none reset",
      },
    });

    // animate each line in sequence
    linesRef.current.forEach((line, i) => {
      tl.fromTo(
        line,
        { width: "0ch", opacity: 1 },
        {
          width: `${line.textContent.length}ch`, // type character by character
          duration: 2,
          ease: `steps(${line.textContent.length})`,
        },
        i * 2 // start time offset like your CSS delays
      );
    });

    // blinking cursor only on last line
    const lastLine = linesRef.current[linesRef.current.length - 1];
    if (lastLine) {
      tl.to(
        lastLine,
        {
          borderRightColor: "transparent",
          repeat: -1,
          yoyo: true,
          duration: 0.5,
          ease: "none",
        },
        ">-0.5" // start right after last typing finishes
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const slidesData = {
    Key: {
      name: "PROJECT-K",
      model: <BoardKey nodes={nodes} materials={materials} />,
      camera: <PerspectiveCamera makeDefault position={[-2.7, 7, 8]} />,
      image: keyImage,
    },
    GoKey: {
      name: "SHAPE OF GO",
      model: <GoKey nodes={nodes} materials={materials} />,
      camera: <PerspectiveCamera makeDefault position={[3.5, 6.5, 10]} />,
      image: keyImage,
    },
    EightBall: {
      name: "OTHERS",
      model: <EightBallKey nodes={nodes} materials={materials} />,
      camera: <PerspectiveCamera makeDefault position={[0.2, 0, 10]} />,
      image: keyImage,
    },
  };

  return (
    <div className="mx-width relative z-50">
      <div className="relative text-secondary">
        <h1
          className="glitch glow-title font-display absolute -top-12 right-1 tracking-tight"
          data-text="FRONTENDEVELOPER"
        >
          FRONTENDEVELOPER
        </h1>
        <View className="h-screen mx-width ">
          <Common />
          <Keys position={[0.23, -7.7, 1]} />
          <PerspectiveCamera makeDefault position={[0, 0, 16]} />
        </View>
      </div>
      <Slides slidesData={slidesData} />

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

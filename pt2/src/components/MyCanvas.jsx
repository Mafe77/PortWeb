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

  // const linesRef = useRef([]);
  // const cursorRef = useRef(null);

  // useEffect(() => {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: linesRef.current[0],
  //       start: "top 80%",
  //       toggleActions: "play none none reset",
  //     },
  //   });

  //   // type each line in sequence
  //   linesRef.current.forEach((mask, i) => {
  //     tl.fromTo(
  //       mask,
  //       { width: "0%" },
  //       {
  //         width: "100%",
  //         duration: 3,
  //         ease: "steps(40)",
  //       },
  //       i * 1.2
  //     );
  //   });

  //   // make the cursor blink once all text is revealed
  //   tl.to(
  //     cursorRef.current,
  //     {
  //       opacity: 0,
  //       repeat: -1,
  //       yoyo: true,
  //       duration: 0.5,
  //       ease: "none",
  //     },
  //     "+=0.2"
  //   );

  //   return () => {
  //     tl.scrollTrigger?.kill();
  //     tl.kill();
  //   };
  // }, []);

  const slidesData = {
    Key: {
      name: "PROJECT-K",
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
      <div className="h-screen flex flex-col relative font-display justify-center items-center">
        {Object.entries(slidesData).map(([key, slide], index) => (
          <DottedSlide
            key={key}
            className={`border-secondary border-1 h-500 w-[90%] bg-primary rounded-sm ${
              index > 0 ? "mt-10" : ""
            }`}
          >
            {/* Header */}
            <div className="w-full border-b-1 h-10 flex justify-between px-10 text-lg font-display bg-[#060606] z-50 text-secondary">
              <h2 className="relative top-1 font-medium glow-sub">
                {slide.name}
              </h2>
              <button className="border-1 px-2 my-1 rounded-lg hover:bg-secondary hover:text-primary">
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
              <div className="text-secondary flex flex-col text-3xl w-[22%]  glow-title pl-5 css-typing">
                {/* <span
                  className="mt-5 anim-typewriter line-1"
                  ref={textRef}
                  style={{
                    overflow: "hidden",
                    borderRight: "2px solid rgba(255,255,255,0.75)",
                    fontFamily: "monospace",
                    whiteSpace: "pre-line",
                  }}
                >
                  {` >React three fiber\n >GSAP \n>Three Js`}
                </span> */}
                {/* <div className="text-container space-y-4">
                  {[">R3F", ">GSAP", ">ThreeJs"].map((text, i, arr) => (
                    <div key={i} className="flex" style={{ maxWidth: "40ch" }}>
                      <span
                        ref={(el) => (linesRef.current[i] = el)}
                        className="mask inline-block overflow-hidden"
                        style={{ whiteSpace: "normal" }}
                      >
                        {text}
                      </span>

                      {i === arr.length - 1 && (
                        <span
                          ref={cursorRef}
                          className="cursor inline-block ml-1"
                          style={{ opacity: 1 }}
                        >
                          &#9644;
                        </span>
                      )}
                    </div>
                  ))}
                </div> */}
                <p className="tag  mt-5">&gt; Three Js</p>
                <p className="tag  mt-5">&gt; CSS/HTML</p>
                <p className="tag  mt-5">&gt; GSAP</p>
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

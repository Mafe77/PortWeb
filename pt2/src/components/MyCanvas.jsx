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
import ScrollSmoother from "gsap/src/ScrollSmoother";
import { useRef, useEffect } from "react";
import { GoKey } from "./Keychains/GoKey.jsx";
import keyImage from "../assets/placeholder1.png";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function MyCanvas({ activeTab }) {
  const { nodes, materials } = useKeysModel();

  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".accordions",
        pin: true,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        ease: "power1.inOut",
      },
    });

    tl.to(".accordion .text", {
      height: 0,
      paddingBottom: 0,
      opacity: 0,
      stagger: 0.5,
    });

    tl.to(
      ".accordion",
      {
        marginBottom: -15,
        stagger: 0.5,
      },
      "<"
    );

    // ScrollTrigger.refresh();

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div>
      {/* 3D View */}
      <View className="w-screen h-screen z-30">
        <Common />
        <Keys position={[0, -7.7, 1]} />
        <PerspectiveCamera makeDefault position={[0, 0, 16]} />
      </View>

      <div ref={contentRef} id="content" className=" z-0 relative w-screen">
        {/* <Horizontal /> */}
        <div className="accordions flex flex-col z-0">
          {/* Slide 1 */}
          <div className="accordion relative flex justify-around p-20">
            {/* Left Side */}
            <div className="relative h-[80%] w-[30%]">
              <View className="inset-0 absolute ">
                <Common />
                <BoardKey nodes={nodes} materials={materials} />
                <PerspectiveCamera
                  makeDefault
                  position={[-2.7, 6.7, 10.5]}
                  lookAt={[BoardKey]}
                />
              </View>
            </div>
            {/* Right Side */}
            <div className="slide-right relative w-[70%] h-[80%] flex flex-col pr-22">
              <h2 className="title text-8xl text-end">Keyboard</h2>
              <div className="text h-[80%] relative text-center w-full pt-10">
                <img
                  src={keyImage}
                  className="slide-img w-full h-full rounded-lg"
                ></img>
              </div>
              <div className="text-2xl relative text-end top-10">
                <span className="border rounded-3xl py-2 px-3 m-2 border-white">
                  React Three Fiber
                </span>
                <span className="border rounded-3xl py-2 px-3 m-2 border-white">
                  Gsap
                </span>
                <span className="border rounded-3xl py-2 px-3 m-2 border-white">
                  JavaScript
                </span>
                <span className="border rounded-3xl py-2 px-3 m-2 border-white">
                  CSS
                </span>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="accordion relative flex justify-around p-20">
            {/* Left Side */}
            <div className="slide-left relative w-[70%] h-[80%] flex flex-col pl-18">
              <h2 className="title text-8xl">Shape Of Go</h2>
              <div className="h-[80%] relative text-center w-full pt-10">
                <img src={keyImage} className="text w-full h-full"></img>
              </div>
              <div className="text-2xl relative top-10">
                <span className="border rounded-3xl py-2 px-3 m-2 border-white">
                  Three JS
                </span>
                <span className="border rounded-3xl py-2 px-3 m-2 border-white">
                  Gsap
                </span>
                <span className="border rounded-3xl py-2 px-3 m-2 border-white">
                  JavaScript
                </span>
                <span className="border rounded-3xl py-2 px-3 m-2 border-white">
                  CSS
                </span>
                <span className="border rounded-3xl py-2 px-3 m-2 border-white">
                  HTML
                </span>
              </div>
            </div>
            {/* Right Side */}
            <div className="slide-right relative h-[80%] w-[30%] right-20">
              <View className="absolute inset-0">
                <PerspectiveCamera makeDefault position={[3.2, 6, 14]} />
                <Common />
                <GoKey nodes={nodes} materials={materials} />
              </View>
            </div>
          </div>
          {/* Slide 3 */}
          <div className="accordion relative flex justify-around p-20">
            {/* Left Side */}
            <div className="relative h-[80%] w-[30%]">
              <View className="inset-0 absolute ">
                <PerspectiveCamera makeDefault position={[0, 0, 12]} />
                <Common />
                <EightBallKey nodes={nodes} materials={materials} />
              </View>
            </div>
            {/* Right Side */}
            <div className="slide-right relative w-[70%] h-[80%] flex flex-col pr-22">
              <h2 className="title text-8xl text-end">Others</h2>
              <div className="text h-full relative text-center w-full pt-10">
                <img
                  src={keyImage}
                  className="slide-img w-full h-full rounded-lg"
                ></img>
              </div>
              <div className="text-2xl relative text-end top-10">
                <span className="border rounded-3xl py-2 px-3 m-2 border-white">
                  React Three Fiber
                </span>
                <span className="border rounded-3xl py-2 px-3 m-2 border-white">
                  Gsap
                </span>
                <span className="border rounded-3xl py-2 px-3 m-2 border-white">
                  JavaScript
                </span>
                <span className="border rounded-3xl py-2 px-3 m-2 border-white">
                  CSS
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Horizontal Scroll Section */}

        {/* Slide 3 */}
        {/* <div className="slide flex-shrink-0 h-[600px] relative border-2 border-red-600">
            <div className="slide-title relative border-2 text-6xl float-end">
              Others
            </div>
            <View className="absolute inset-0 border-2 ">
              <PerspectiveCamera makeDefault position={[0, 0, 12]} />
              <Common />
              <EightBallKey nodes={nodes} materials={materials} />
            </View>
          </div> */}

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
          pointerEvents: "none",
        }}
        gl={{ alpha: true }}
        eventSource={document.getElementById("root")}
        className=""
        id="wrapper"
        ref={wrapperRef}
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

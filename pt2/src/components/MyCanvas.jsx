import "../App.css";
import Keys from "./Keys.jsx";
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
import ScrollTrigger from "gsap/src/ScrollTrigger";
import ScrollSmoother from "gsap/src/ScrollSmoother";
import { useRef, useEffect } from "react";
import { GoKey } from "./Keychains/GoKey.jsx";
import keyImage from "../assets/placeholder1.png";
import keyThumb from "../assets/keyThumb.png";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function MyCanvas() {
  const { nodes, materials } = useKeysModel();

  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          pin: true,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          ease: "power1.inOut",
          markers: true,
          // toggleActions: "play reverse play reverse",
        },
      });

      const accordions = gsap.utils.toArray(".accordion");

      accordions.forEach((accordion, i) => {
        tl.to(
          accordion.querySelector(".text"),
          {
            height: 0,
            opacity: 0,
            paddingBottom: 0,
          },
          i
        );

        tl.fromTo(
          accordion.querySelector(".hide"),
          {
            height: "100%",
          },
          {
            height: 0,
            opacity: 0,
            paddingBottom: 0,
          },
          i
        );

        tl.to(
          accordion.querySelector(".thumb"),
          {
            opacity: 1,
          },
          i
        );

        tl.to(
          accordion,
          {
            marginBottom: -15,
          },
          i
        );

        tl.to(contentRef.current, { height: "100vh" });
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);
  return (
    <div>
      {/* 3D View */}
      <View className="w-screen h-screen z-30">
        <Common />
        <Keys position={[0, -7.7, 1]} />
        <PerspectiveCamera makeDefault position={[0, 0, 16]} />
      </View>

      <div
        className="accordions flex flex-col z-0 w-screen h-screen relative"
        ref={contentRef}
      >
        <div className=" relative -right-154 top-20 border-t-3 w-191 border-black">
          <div className="text-9xl font-light relative -left-142 -top-20">
            PROJECTS
          </div>
        </div>
        {/* Slide 1 */}
        <div className="accordion relative flex justify-around pb-20 pt-10 ">
          {/* Left Side */}
          <div className="relative w-[30%]">
            <View className="hide inset-0 absolute">
              <Common />
              <BoardKey nodes={nodes} materials={materials} />
              <PerspectiveCamera
                makeDefault
                position={[-2.7, 6.7, 10.5]}
                lookAt={[BoardKey]}
              />
            </View>
            <img
              src={keyThumb}
              className="thumb pl-20 opacity-0 h-[200px]"
            ></img>
          </div>
          {/* Right Side */}
          <div className="relative w-[70%] h-[80%] flex flex-col pr-22">
            <h2 className="title text-8xl text-end">Keyboard</h2>
            <div className="text h-[80%] relative text-center w-full pt-10">
              <img src={keyImage} className="w-full h-full rounded-lg"></img>
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

        <div className="border-t-3 h-2  w-250 relative left-[15%]"></div>

        {/* Slide 2 */}
        <div className="accordion relative flex justify-around pb-20 pt-10  ">
          {/* Left Side */}
          <div className="slide-left relative w-[70%] h-[80%] flex flex-col pl-18">
            <h2 className="title text-8xl">Shape Of Go</h2>
            <div className="text h-[80%] relative text-center w-full pt-10">
              <img src={keyImage} className="w-full h-full"></img>
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
          <div className="relative h-[100%] w-[30%]">
            <View className="hide absolute inset-0">
              <PerspectiveCamera makeDefault position={[3.2, 6, 14]} />
              <Common />
              <GoKey nodes={nodes} materials={materials} />
            </View>
            <img
              src={keyThumb}
              className="thumb pl-20 opacity-0 h-[200px]"
            ></img>
          </div>
        </div>

        <div className="border-t-3 h-2  w-250 relative left-[15%]"></div>

        {/* Slide 3 */}
        <div className="accordion relative flex justify-around p-20 ">
          {/* Left Side */}
          <div className="relative h-[80%] w-[30%]">
            <View className="hide inset-0 absolute ">
              <PerspectiveCamera makeDefault position={[0, 0, 12]} />
              <Common />
              <EightBallKey nodes={nodes} materials={materials} />
            </View>
            <img
              src={keyThumb}
              className="thumb pl-20 opacity-0 h-[200px]"
            ></img>
          </div>
          {/* Right Side */}
          <div className="relative w-[70%] h-[80%] flex flex-col pr-22">
            <h2 className="title text-8xl text-end">Others</h2>
            <div className="text h-full relative text-center w-full pt-10">
              <img src={keyImage} className="w-full h-full rounded-lg"></img>
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
        <footer className="footer bg-gray-900 text-white py-10 text-center h-full">
          <p className="text-lg">❤️❤️❤️❤️❤️</p>
        </footer>
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
          background: "transparent",
          pointerEvents: "none",
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

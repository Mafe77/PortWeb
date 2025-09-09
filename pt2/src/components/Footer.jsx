import React from "react";
import "../App.css";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  View,
  PerspectiveCamera,
  Environment,
  Preload,
  Lightformer,
} from "@react-three/drei";
import { EffectComposer, ASCII } from "@react-three/postprocessing";
import useKeysModel from "./Keychains/KeyLoader.jsx";
import { HotelKey } from "./Keychains/HotelKey.jsx";

function Footer() {
  const { nodes, materials } = useKeysModel();

  return (
    <section id="contact">
      <div className="mx-width h-[600px] text-5xl text-secondary flex flex-col border-1 relative top-10">
        <div className="circle absolute -top-[0.10em] -right-[.12em]"></div>
        <div className="circle absolute -top-[0.10em] -left-[.10em]"></div>
        <div className="circle absolute -bottom-[0.07em] -right-[.12em]"></div>
        <div className="circle absolute -bottom-[0.07em] -left-[.10em]"></div>
        <div className="relative border-b-1 h-18 w-full font-display bg-[#060606]">
          <div className="circle absolute -bottom-[.10em] -right-[.12em]"></div>
          <div className="circle absolute -bottom-[.10em] -left-[.10em]"></div>
          <span className="text-2xl relative left-10 glow-sub">
            SUBJECT M-24
          </span>
        </div>
        <div className="flex flex-row h-full">
          <div className="border-r-2 h-full w-[30%] relative flex justify-center ">
            <div className="border-1 h-[90%] w-[90%] relative top-6">
              <Canvas
                className=""
                style={{
                  position: "relative",
                  bottom: 0,
                  right: 0,
                  overflow: "hidden",
                }}
              >
                <directionalLight intensity={5} position={(10, 10, 10)} />
                <HotelKey nodes={nodes} materials={materials} />
                <PerspectiveCamera makeDefault position={[0.2, -2.4, 8]} />,
                <EffectComposer>
                  <ASCII
                    font="arial"
                    characters=".:,'-^=*#/{}()."
                    fontSize={62}
                    cellSize={8}
                    color="#B3CBF6"
                    invert={false}
                  />
                </EffectComposer>
              </Canvas>
            </div>
          </div>
          <div className="w-[70%] h-full font-display text-2xl glow-sub font-medium">
            <div className="border-b-1 w-full flex justify-between px-10 pt-4 pb-4">
              <p>NAME</p>
              <p>Maria Talhaferro</p>
            </div>
            <div className="border-b-1 w-full flex justify-between px-10 pt-4 pb-4">
              <p>Function</p>
              <p>Frontend Developer</p>
            </div>
            <div className="border-b-1 w-full flex justify-between px-10 pt-4 pb-4">
              <p>Skills</p>
              <div className="flex flex-col text-end">
                <p className="pt-5">{""}</p>
                {/* <p>Programming</p> */}
                <p className="flex justify-between">
                  <span className="">★★★</span>
                  <p>Figma</p>
                </p>
                <p className="flex justify-between">
                  <span className="pr-20">★★★★</span>
                  <p>React</p>
                </p>
                <p className="flex justify-between">
                  <span className="">★★★</span>
                  <p>ThreeJS</p>
                </p>
                <p className="flex justify-between">
                  <span className="">★★★★★</span>
                  <p>Python</p>
                </p>
                <p className="flex justify-between">
                  <span className="">★★★★</span>
                  <p>JavaScript</p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;

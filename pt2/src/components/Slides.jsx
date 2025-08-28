"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  View,
  PerspectiveCamera,
  Environment,
  Preload,
  Lightformer,
} from "@react-three/drei";
import DottedSlide from "./DottedSlide";

gsap.registerPlugin(ScrollTrigger);

export default function Slides({ slidesData }) {
  return (
    <div className="h-screen flex flex-col relative font-display justify-center items-center">
      {Object.entries(slidesData).map(([key, slide], index) => (
        <Slide key={key} slide={slide} index={index} />
      ))}
    </div>
  );
}

function Slide({ slide, index }) {
  const linesRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.slide-${index} .css-typing`,
        start: "top 80%",
      },
    });

    linesRef.current.forEach((line, i) => {
      tl.fromTo(
        line,
        { width: "0ch", opacity: 1 },
        {
          width: `${line.textContent.length + 1}ch`,
          duration: 2,
          ease: `steps(${line.textContent.length})`,
        },
        i * 2
      );
    });

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
        ">-0.5"
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [index]);

  return (
    <DottedSlide
      className={`slide-${index} border-secondary border-1 h-[500px] w-[90%] bg-primary rounded-sm ${
        index > 0 ? "mt-10" : ""
      }`}
    >
      {/* Header */}
      <div className="w-full border-b-1 h-10 flex justify-between px-10 text-lg font-display bg-[#060606] z-50 text-secondary">
        <h2 className="relative top-1 font-medium glow-sub">{slide.name}</h2>
        <button className="border-1 px-2 my-1 rounded-lg hover:bg-secondary hover:text-primary">
          Explore
        </button>
      </div>

      {/* Content */}
      <div className="relative h-full flex justify-between items-center px-4 -top-3 ">
        <div className="relative w-[21%]">
          <Canvas
            className=""
            style={{
              position: "relative",
              top: "-20px",
              bottom: 0,
              left: 0,
              right: 0,
              height: "330px",
              overflow: "hidden",
            }}
          >
            <Common />
            {slide.model}
            {slide.camera}
          </Canvas>
        </div>

        <img
          src={slide.image}
          className="relative h-[92%] w-[58%] border-x-1 border-secondary"
        />

        <div className="text-secondary flex flex-col text-3xl w-[21%] glow-title pl-5 css-typing">
          {[">ThreeJS", ">CSS/HTML", ">GSAP"].map((text, i) => (
            <p
              key={i}
              ref={(el) => (linesRef.current[i] = el)}
              style={{
                borderRight: ".4em solid var(--color-secondary)",
                fontFamily: "Courier, monospace",
                fontSize: "30px",
                whiteSpace: "normal",
                overflow: "hidden",
                width: "0ch",
                opacity: 1,
              }}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </DottedSlide>
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

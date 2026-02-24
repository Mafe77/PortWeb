"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { EffectComposer, ASCII } from "@react-three/postprocessing";
import DottedSlide from "./DottedSlide";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger);

export default function Slides({ slidesData }) {
  return (
    <div className="flex flex-col relative font-display justify-center items-center">
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
        {
          width: "0ch",
          opacity: 1,
          // border: null,
        },
        {
          width: `${line.textContent.length + 1}ch`,
          duration: 2,
          ease: `steps(${line.textContent.length})`,
          // borderRight: ".4em solid var(--color-secondary)",
        },
        i * 2
      );

      tl.fromTo(
        line,
        {
          "border-right-color": "rgba(255,255,255,0)",
        },
        {
          "border-right-color": "rgba(255,255,255,0.75)",
          repeat: -1,
          ease: `steps(${line.textContent.length})`,
        },
        i * 2
      );

      if (i > 0) {
        tl.to(
          line,
          {
            border: null,
          },
          i * 4
        );
      } else {
        tl.to(
          line,
          {
            border: null,
          },
          2
        );
      }
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [index]);

  let [thumbImage, setThumbImage] = useState(0);

  return (
    <DottedSlide
      className={`slide-${index} border-secondary border-1 w-[90%] bg-primary rounded-sm h-[445px] ${
        index > 0 ? "mt-10" : ""
      }`}
    >
      {/* Header */}
      <div className="w-full border-b-1 h-10 flex justify-between px-10 text-lg font-display bg-[#060606] z-20 text-secondary">
        <h2 className="relative top-1 font-medium glow-sub">{slide.name}</h2>
        <a
          className="border-1 px-2 my-1 rounded-lg hover:bg-secondary hover:text-primary"
          href={slide.gitHub}
        >
          Explore
        </a>
      </div>

      {/* Content */}
      <div className="relative flex justify-between items-center px-4 -top-3 ">
        <div className="relative w-[21%]">
          <Canvas
            className=""
            style={{
              position: "relative",
              top: "-10px",
              bottom: 0,
              left: "-8px",
              height: "330px",
              right: 0,
              overflow: "hidden",
            }}
          >
            {/* <Common /> */}
            <directionalLight intensity={5} position={(10, 10, 10)} />
            {slide.model}
            {slide.camera}
            <EffectComposer>
              <ASCII
                font="arial"
                characters=".:,'-^=*#/{}()."
                fontSize={62}
                cellSize={7}
                color="#6698f2"
                invert={true}
              />
            </EffectComposer>
          </Canvas>
        </div>

        <div className="relative w-[57%] border-x-2 border-[#6698f2] z-50 top-3 h-[400px] overflow-hidden flex items-center justify-center">
          <IoIosArrowBack
            className="absolute left-2 text-5xl text-primary hover:text-tertuary cursor-pointer select-none top-1/2 -translate-y-1/2"
            onClick={() =>
              setThumbImage(
                (prev) => (prev - 1 + slide.image.length) % slide.image.length
              )
            }
          />

          <img
            src={slide.image[thumbImage]}
            alt="Slide"
            className="select-none w-full h-full object-contain"
            draggable={false}
          />

          <IoIosArrowForward
            className="absolute right-2 text-5xl text-primary hover:text-tertuary cursor-pointer select-none top-1/2 -translate-y-1/2"
            onClick={() =>
              setThumbImage((prev) => (prev + 1) % slide.image.length)
            }
          />
        </div>

        <div className="text-secondary flex flex-col text-3xl w-[21%] glow-title pl-5 css-typing">
          {Object.values(slide.text).map((text, i) => (
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
              {">" + text}
            </p>
          ))}
        </div>
      </div>
    </DottedSlide>
  );
}

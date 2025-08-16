import React from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import ScrollToPlugin from "gsap/src/ScrollToPlugin";

function Horizontal() {
  return (
    <div className="absolute bottom-250">
      <div className=" -right-150 top-20 border-t-3 w-191 border-black">
        <div className="text-9xl font-light relative -left-142 -top-20">
          PROJECTS
        </div>
      </div>
      <div className="absolute bottom-54 left-12 h-96 border-l-3 border-black z-0"></div>
      <div className="absolute bottom-18 left-12 h-16 border-l-3 border-black">
        <div className="flex flex-col text-2xl relative -top-19 -left-2">
          <span>MARIA</span> TALHAFERRO
        </div>
        <div className="relative -bottom-3 -left-1 flex flex-row">
          <div className="h-6 w-6 mr-2 rounded-sm bg-white"></div>
          <div className="h-6 w-6 mr-2 rounded-sm bg-primary"></div>
          <div className="h-6 w-6 mr-2 rounded-sm bg-secondary"></div>
          <div className="h-6 w-6 mr-2 rounded-sm bg-tertuary"></div>
          <div className="h-6 w-6 mr-2 rounded-sm bg-black"></div>
        </div>
      </div>
      <div className="absolute bottom-18 left-12 w-96 border-b-3 border-black "></div>
    </div>
  );
}

export default Horizontal;

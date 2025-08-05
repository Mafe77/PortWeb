import { useRef, useEffect } from "react";
import "../App.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export default function ScrollingText() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);

  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 1.5,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-500px",
    });

    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }

    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    // const baseSpeed = 0.01;
    // const screenFactor = window.innerWidth / 1920; // scale for typical screen width
    // xPercent += baseSpeed * screenFactor * direction;
    xPercent += 0.02 * direction;
  };

  // Generate long repeated text
  const repeated = Array(10).fill("Projects ★").join(" ");

  return (
    <div className="sliderContainer w-full overflow-hidden">
      <div className="slider flex whitespace-nowrap" ref={slider}>
        <p ref={firstText} className="textBlock">
          {repeated}
        </p>
        <p ref={secondText} className="textBlock">
          {repeated}
        </p>
      </div>
    </div>
  );
}

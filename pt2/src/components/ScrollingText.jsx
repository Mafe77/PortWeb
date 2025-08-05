import "../App.css";
import { useRef } from "react";
import { useEffect } from "react";
import gsap from "gsap";

export default function ScrollingText() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = -100;

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!secondText.current || !firstText.current) return;

      gsap.set(secondText.current, {
        left: secondText.current.getBoundingClientRect().width,
      });

      requestAnimationFrame(animate);
    });
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    }
    if (firstText.current) {
      gsap.set(firstText.current, { xPercent });
    }
    if (secondText.current) {
      gsap.set(secondText.current, { xPercent });
    }

    requestAnimationFrame(animate);
    xPercent += 0.04 * -1;
  };

  return (
    <main className="overflow-hidden">
      <div className="sliderContainer overflow-hidden">
        <div ref={slider} className="slider">
          <p ref={firstText}>MARIA ARTUR-</p>
          <p ref={secondText}>MARIA ARTUR-</p>
        </div>
      </div>
    </main>
  );
}

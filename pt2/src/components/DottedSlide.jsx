import { useRef, useEffect } from "react";

export default function DottedSlide({ children, className }) {
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

  return (
    <div ref={containerRef} className={`dotted-bg relative ${className}`}>
      <div
        ref={maskRef}
        className="dotted-above absolute inset-0 pointer-events-none z-10"
      />
      {children}
    </div>
  );
}

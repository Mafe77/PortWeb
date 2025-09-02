import "./App.css";
import MyCanvas from "./components/MyCanvas.jsx";
import NavBarV2 from "./components/NavBarV2.jsx";

function App() {
  return (
    <>
      <header className="header mx-width">
        <NavBarV2 />
      </header>
      <main>
        {/* Background */}
        <div className="underlay mx-width border-b-1 border-secondary">
          <div className="grid:2 g-wrapper">
            <div className="grid:2">
              <div></div>
              <div></div>
            </div>
            <div className="grid:2">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        {/* End of Background */}
        <MyCanvas />
      </main>

      <svg>
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            stitchTiles="stitch"
          />
          <feColorMatrix
            in="colorNoise"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
          <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
          <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
        </filter>
      </svg>
    </>
  );
}

export default App;

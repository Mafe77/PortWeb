import "./App.css";
// import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense } from "react";
import Placeholder from "./Placeholder.jsx";
import Keys from "./Keys.jsx";
import { useRef } from "react";
import { Canvas, addEffect } from "@react-three/fiber";
import NavBar from "./components/NavBar.jsx";
import ScrollingText from "./components/ScrollingText.jsx";
import Lenis from "@studio-freight/lenis";
import {
  View,
  Bounds,
  OrthographicCamera,
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ArcballControls,
  PivotControls,
  Html,
  Center,
  Preload,
} from "@react-three/drei";

const lenis = new Lenis({ syncTouch: true });
addEffect((time) => lenis.raf(time));

function App() {
  // const model = useLoader(GLTFLoader, "./Keychain1.glb");

  return (
    <>
      <div className="relative w-[100%] h-[100%]">
        <NavBar className="fixed top-0 left-0 w-full z-10 bg-white" />
        {/* Canvas fills entire screen and sits behind NavBar */}
        <View className="absolute top-0 left-0 w-[100%] h-[100%] views">
          <Center>
            <Common color="peachpuff" />
            <Keys position={[0, -8, 0]} />
          </Center>
        </View>
        <View
          className="border-2 absolute top-1/2 left-1/2 w-[100px] h-[100px]"
          track={false}
        >
          {/* <PerspectiveCamera makeDefault position={[0, 0, 10]} /> */}
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="orange" />
          </mesh>
        </View>
        <Canvas className="absolute w-screen h-screen">
          {/* <App /> */}
          <View.Port />
          <Preload all />
        </Canvas>
        <h1 className="text-4xl z-10 absolute bottom-10 left-[40%]">
          Scroll To Explore
        </h1>

        <div className="bg-[#f5f5f5]">
          {/* <ScrollingText /> */}
          <div className="h-[500px]"></div>
        </div>
      </div>
    </>
  );
}

function Common({ color }) {
  return (
    <>
      {color && <color attach="background" args={[color]} />}
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 30, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="blue" />
      <Environment preset="dawn" />
      <PerspectiveCamera makeDefault fov={40} position={[0, 0, 20]} />
    </>
  );
}

export default App;

import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/Keychain1.glb");

  const boardKeyRef = useRef();
  const goKeyRef = useRef();
  const eightBallRef = useRef();
  const hotelKeyRef = useRef();

  const [hoveredKey, setHoveredKey] = useState(null);
  const [showTitle, setShowTitle] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const [disableAnimations, setDisableAnimations] = useState(false);
  const [rendererInfo, setRendererInfo] = useState("");

  useEffect(() => {
    try {
      const gl = document.createElement("canvas").getContext("webgl");
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : "unknown";

      // Disable animations for known slow/CPU renderers
      if (/swiftshader|microsoft basic/i.test(renderer)) {
        setDisableAnimations(true);
      }
    } catch {
      setDisableAnimations(true); // if WebGL context fails, disable
    }
  }, []);

  useFrame((state) => {
    if (disableAnimations) return;

    if (
      !boardKeyRef.current ||
      !goKeyRef.current ||
      !eightBallRef.current ||
      !hotelKeyRef.current
    ) {
      return; // don’t run animations until everything is ready
    }

    const amount = Math.sin(state.clock.elapsedTime * 0.5); // oscillation for rotation

    // Rotations
    if (boardKeyRef.current) boardKeyRef.current.rotation.y = -0.6;
    if (boardKeyRef.current) boardKeyRef.current.rotation.z = amount * 0.2;
    if (goKeyRef.current && hoveredKey != "eightBall")
      goKeyRef.current.rotation.y = amount * 0.3;
    // need to change both for go key
    if (goKeyRef.current) goKeyRef.current.rotation.z = -2.7;
    if (eightBallRef.current) eightBallRef.current.rotation.z = amount * 0.07;
    if (hotelKeyRef.current) hotelKeyRef.current.rotation.z = amount * 0.3;

    // Hover movement effect
    const moveSpeed = 0.05; // how quickly keys move toward target position
    const offsets = {
      boardKey: 0.6,
      goKey: -2.3,
      eightBall: 0,
      hotelKey: 0,
    };

    if (hoveredKey === "goKey") {
      // offsets.goKey = -0.3; // move hovered left
      offsets.boardKey = -4; // neighbor right
      offsets.eightBall = 6; // neighbor right
      offsets.hotelKey = 0.5;
    } else if (hoveredKey === "boardKey") {
      // offsets.boardKey = 4;
      offsets.goKey = -9;
      offsets.eightBall = 6;
      offsets.hotelKey = 0.5;
    } else if (hoveredKey === "eightBall") {
      // offsets.eightBall = -0.3;
      offsets.goKey = 5;
      offsets.boardKey = -10;
      offsets.hotelKey = 0.5;
    } else if (hoveredKey === "hotelKey") {
      // offsets.hotelKey = -0.3;
      offsets.eightBall = -4;
      offsets.goKey = 5;
      offsets.boardKey = -8;
    }

    // Smoothly move each key toward target offset
    if (boardKeyRef.current) {
      boardKeyRef.current.rotation.y +=
        (offsets.boardKey -
          boardKeyRef.current.rotation.y +
          boardKeyRef.current.userData.baseX) *
        moveSpeed;
    }
    if (goKeyRef.current) {
      goKeyRef.current.rotation.z +=
        (offsets.goKey -
          goKeyRef.current.rotation.z +
          goKeyRef.current.userData.baseX) *
        moveSpeed;
    }
    if (eightBallRef.current) {
      eightBallRef.current.rotation.z +=
        (offsets.eightBall -
          eightBallRef.current.rotation.z +
          eightBallRef.current.userData.baseX) *
        moveSpeed;
    }
    if (hotelKeyRef.current) {
      hotelKeyRef.current.rotation.y +=
        (offsets.hotelKey -
          hotelKeyRef.current.rotation.y +
          hotelKeyRef.current.userData.baseX) *
        moveSpeed;
    }
  });

  // Store base positions when model mounts
  useEffect(() => {
    if (
      boardKeyRef.current &&
      goKeyRef.current &&
      eightBallRef.current &&
      hotelKeyRef.current
    ) {
      boardKeyRef.current.userData.baseX = boardKeyRef.current.rotation.y;
      goKeyRef.current.userData.baseX = goKeyRef.current.rotation.z;
      eightBallRef.current.userData.baseX = eightBallRef.current.rotation.z;
      hotelKeyRef.current.userData.baseX = hotelKeyRef.current.rotation.y;
    }
  }, [
    boardKeyRef.current,
    goKeyRef.current,
    eightBallRef.current,
    hotelKeyRef.current,
  ]);

  return (
    <>
      <group {...props} dispose={null}>
        <group name="Scene">
          {/* Go Key */}
          <group
            name="GoKey"
            position={[-0.575, 8.451, -0.061]}
            rotation={[-3.109, 0.389, -2.949]}
            scale={0.833}
            ref={goKeyRef}
            onPointerEnter={() => {
              setHoveredKey("goKey");
              setShowTitle(true);
            }}
            onPointerLeave={() => {
              setHoveredKey(null);
              setShowTitle(false);
            }}
            onPointerMove={(e) => {
              e.stopPropagation();
              setPos({ x: e.clientX - 730, y: e.clientY - 560 });
            }}
            onClick={() => {
              const section = document.getElementById("projects");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <mesh
              geometry={nodes.Sphere001.geometry}
              material={materials.GoBlack}
            />
            <mesh
              geometry={nodes.Sphere001_1.geometry}
              material={materials["マテリアル.001"]}
            />
            <mesh
              geometry={nodes.Sphere001_2.geometry}
              material={materials.GoWhite}
            />
          </group>

          {/* Board Key */}
          <group
            name="Kboard"
            position={[-1.117, 8.76, 0.136]}
            rotation={[1.241, -0.384, 0.327]}
            scale={[0.806, 0.46, 0.806]}
            ref={boardKeyRef}
            onPointerEnter={() => {
              setHoveredKey("boardKey");
              setShowTitle(true);
            }}
            onPointerLeave={() => {
              setHoveredKey(null);
              setShowTitle(false);
            }}
            onPointerMove={(e) => {
              e.stopPropagation();
              setPos({ x: e.clientX - 750, y: e.clientY - 560 });
            }}
            onClick={() => {
              const section = document.getElementById("projects");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {/* Mesh parts */}
            <mesh
              geometry={nodes.Cube005.geometry}
              material={materials.Material}
            />
            <mesh
              geometry={nodes.Cube005_1.geometry}
              material={materials["マテリアル.001"]}
            />
            <mesh
              geometry={nodes.Cube005_2.geometry}
              material={materials.Material}
            />
            <mesh
              geometry={nodes.Cube005_3.geometry}
              material={new THREE.MeshStandardMaterial({ color: "#6E88B3" })}
            />
          </group>

          {/* Eight Ball */}
          <group
            name="EightBall"
            position={[0.181, 8.454, 0.155]}
            rotation={[-0.052, 0.181, 0.151]}
            scale={1.379}
            ref={eightBallRef}
            onPointerEnter={() => {
              setHoveredKey("eightBall");
              setShowTitle(true);
            }}
            onPointerLeave={() => {
              setHoveredKey(null);
              setShowTitle(false);
            }}
            onPointerMove={(e) => {
              e.stopPropagation();
              setPos({ x: e.clientX - 750, y: e.clientY - 560 });
            }}
            onClick={() => {
              const section = document.getElementById("projects");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <mesh
              geometry={nodes.Roundcube001.geometry}
              material={materials["Black-8Ball"]}
            />
            <mesh
              geometry={nodes.Roundcube001_1.geometry}
              material={materials["8Ball"]}
            />
            <mesh
              geometry={nodes.Roundcube001_2.geometry}
              material={materials["マテリアル.001"]}
            />
          </group>

          {/* Hotel Key */}
          <group
            name="PTkey"
            position={[0.608, 8.944, 0.163]}
            rotation={[1.678, 0.428, -0.006]}
            scale={1.126}
            ref={hotelKeyRef}
            onPointerEnter={() => {
              setHoveredKey("hotelKey");
              setShowTitle(true);
            }}
            onPointerLeave={() => {
              setHoveredKey(null);
              setShowTitle(false);
            }}
            onPointerMove={(e) => {
              e.stopPropagation();
              setPos({ x: e.clientX - 750, y: e.clientY - 560 });
            }}
            onClick={() => {
              const section = document.getElementById("contact");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <mesh
              geometry={nodes.Plane001.geometry}
              material={materials.HotelWhite}
            />
            <mesh
              geometry={nodes.Plane001_1.geometry}
              material={materials["Black-Text"]}
            />
            <mesh
              geometry={nodes.Plane001_2.geometry}
              material={materials["マテリアル.001"]}
            />
          </group>

          {/* Clasp */}
          <mesh
            name="Clasp"
            geometry={nodes.Clasp.geometry}
            material={materials["マテリアル.001"]}
            position={[-0.264, 12.892, 0.149]}
            rotation={[0.003, -0.02, 3.141]}
            scale={5.247}
          />

          {/* Key Ring */}
          <mesh
            name="ring"
            geometry={nodes.ring.geometry}
            material={materials["マテリアル.001"]}
            position={[-0.213, 9.416, 0.189]}
            rotation={[-1.595, 0, -2.927]}
            scale={0.511}
          />
        </group>
      </group>

      {showTitle && (
        <Html>
          <div
            style={{
              position: "fixed",
              top: pos.y,
              left: pos.x,
              background: "#060606",
              color: "#B3CBF6",
              padding: "5px 20px",
              borderRadius: 4,
              pointerEvents: "none",
              whiteSpace: "nowrap",
              fontSize: "1.7em",
            }}
          >
            {hoveredKey}
          </div>
        </Html>
      )}
    </>
  );
}

useGLTF.preload("/Keychain1.glb");

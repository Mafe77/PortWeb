import { useGLTF, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useState } from "react";

export default function AnimatedModel(props) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF("/Keychain1.glb");

  const [hoveredKey, setHoveredKey] = useState(null);
  const [showTitle, setShowTitle] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const { camera, mouse, scene } = useThree();
  const raycaster = new THREE.Raycaster();

  const boardKey = [
    nodes.Cube005,
    nodes.Cube005_1,
    nodes.Cube005_2,
    nodes.Cube005_3,
  ];

  const EightBallKey = [
    nodes.Roundcube001,
    nodes.Roundcube001_1,
    nodes.Roundcube001_2,
  ];

  const GoKey = [nodes.Sphere001, nodes.Sphere001_1, nodes.Sphere001_2];

  const HotelKey = [nodes.Plane001, nodes.Plane001_1, nodes.Plane001_2];

  // Manually changing boardKey materials
  boardKey[0].material = new THREE.MeshBasicMaterial({
    color: "gray",
    transparent: true,
    opacity: 0.5,
  });
  boardKey[3].material = new THREE.MeshStandardMaterial({ color: "#6E88B3" });

  const allMeshes = [
    ...boardKey,
    ...GoKey,
    ...EightBallKey,
    ...HotelKey,
  ].filter(Boolean);

  const moveSpeed = 0.05; // How quickly keys move toward target rotation

  // Rotation helper functions
  function applyRotationY(meshes, rotation) {
    meshes.forEach((m) => m && (m.rotation.y = rotation));
  }
  function applyRotationZ(meshes, rotation) {
    meshes.forEach((m) => m && (m.rotation.z = rotation));
  }

  useFrame((state) => {
    if (!groupRef.current) return;

    // Clock
    const t = Math.sin(state.clock.elapsedTime * 0.5);

    // Raycasting
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(allMeshes, true);

    let newHover = null;
    if (intersects.length > 0) {
      const intersected = intersects[0].object;

      if (boardKey.includes(intersected)) newHover = "boardKey";
      else if (EightBallKey.includes(intersected)) newHover = "EightBallKey";
      else if (GoKey.includes(intersected)) newHover = "GoKey";
      else if (HotelKey.includes(intersected)) newHover = "HotelKey";
    }

    if (hoveredKey !== newHover) {
      setHoveredKey(newHover);
      setShowTitle(!!newHover);
    }

    // --- Rotation offsets depending on hover ---
    const offsets = {
      boardKey: 0,
      goKey: 0,
      eightBall: 0,
      hotelKey: 0,
    };

    if (hoveredKey === "GoKey") {
      offsets.boardKey = -0.3;
      offsets.eightBall = 0.3;
      offsets.hotelKey = 0.5;
    } else if (hoveredKey === "boardKey") {
      offsets.goKey = -0.3;
      offsets.eightBall = 0.5;
      offsets.hotelKey = 0.5;
    } else if (hoveredKey === "EightBallKey") {
      offsets.goKey = 0.3;
      offsets.boardKey = -0.3;
      offsets.hotelKey = 0.5;
    } else if (hoveredKey === "HotelKey") {
      offsets.eightBall = -0.5;
      offsets.goKey = 0.3;
      offsets.boardKey = -0.3;
    }

    // --- Smooth rotation toward target values ---
    const smoothRotateY = (meshes, target, base = 0) => {
      meshes.forEach((m) => {
        if (!m) return;
        m.rotation.y += (target - m.rotation.y + base) * moveSpeed;
      });
    };
    const smoothRotateZ = (meshes, target, base = 0) => {
      meshes.forEach((m) => {
        if (!m) return;
        m.rotation.z += (target - m.rotation.z + base) * moveSpeed;
      });
    };

    // Apply the smoothed rotations + gentle breathing animation
    smoothRotateY(boardKey, offsets.boardKey + 0.01 + t * -0.09);
    smoothRotateZ(GoKey, offsets.goKey + 0 + t * 0.07);
    smoothRotateZ(EightBallKey, offsets.eightBall + 0 + t * 0.07);
    smoothRotateY(HotelKey, offsets.hotelKey + 0 + t * 0.09);
  });

  return (
    <group ref={groupRef} {...props}>
      <primitive object={nodes.Scene} />
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
    </group>
  );
}

useGLTF.preload("/Keychain1.glb");

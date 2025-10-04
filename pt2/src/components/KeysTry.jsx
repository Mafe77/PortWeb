import { useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useState } from "react";

export default function AnimatedModel(props) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF("/Keychain1.glb");

  const [hoveredKey, setHoveredKey] = useState(null);
  const [showTitle, setShowTitle] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useFrame((state) => {
    if (!groupRef.current) return;

    const amount = Math.sin(state.clock.elapsedTime * 0.5);

    // Access nodes dynamically
    const boardKey0 = nodes.Cube005;
    boardKey0.material = new THREE.MeshBasicMaterial({
      color: "gray",
      transparent: true,
      opacity: 0.5,
    });
    const boardKey3 = nodes.Cube005_3;
    boardKey3.material = new THREE.MeshStandardMaterial({ color: "#6E88B3" });
    // const boardKey1 = nodes.Cube005_1;
    // const boardKey2 = nodes.Cube005_2;
    // const boardKey3 = nodes.Cube005_3;

    function applyRotationY(meshes, rotation) {
      meshes.forEach((m) => m && (m.rotation.y = rotation));
    }

    function applyRotationZ(meshes, rotation) {
      meshes.forEach((m) => m && (m.rotation.z = rotation));
    }

    // Board Key
    applyRotationY(
      [nodes.Cube005, nodes.Cube005_1, nodes.Cube005_2, nodes.Cube005_3],
      amount * -0.07
    );

    // EightBall Key
    applyRotationZ(
      [nodes.Roundcube001, nodes.Roundcube001_1, nodes.Roundcube001_2],
      0 + amount * -0.07
    );

    //Go Key
    applyRotationZ(
      [nodes.Sphere001, nodes.Sphere001_1, nodes.Sphere001_2],
      0 + amount * 0.07
    );

    //Hotel Key
    applyRotationY(
      [nodes.Plane001, nodes.Plane001_1, nodes.Plane001_2],
      0 + amount * -0.07
    );

    // Hover offsets
    // const offsets = {
    //   boardKey: hoveredKey === "boardKey" ? 0.5 : 0,
    //   goKey: hoveredKey === "goKey" ? -0.3 : 0,
    //   eightBall: hoveredKey === "eightBall" ? 0.2 : 0,
    //   hotelKey: hoveredKey === "hotelKey" ? -0.1 : 0,
    // };

    // if (boardKey) boardKey.position.x = offsets.boardKey;
    // if (goKey) goKey.position.x = offsets.goKey;
    // if (eightBall) eightBall.position.x = offsets.eightBall;
    // if (hotelKey) hotelKey.position.x = offsets.hotelKey;
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

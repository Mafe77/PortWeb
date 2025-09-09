import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function HotelKey({ nodes, materials, ...props }) {
  const innerRef = useRef();

  useFrame((state, delta) => {
    const rotationDelta = delta;
    innerRef.current.rotation.z += rotationDelta * 0.2;
  });

  return (
    <group
      name="HotelKey"
      rotation={[-1.595, 0, -2.927]}
      scale={0.511}
      ref={innerRef}
    >
      <mesh
        name="ring001"
        castShadow
        receiveShadow
        geometry={nodes.ring001.geometry}
        material={materials["マテリアル.001"]}
      />
      <mesh
        name="ring001_1"
        castShadow
        receiveShadow
        geometry={nodes.ring001_1.geometry}
        material={materials.HotelWhite}
      />
      <mesh
        name="ring001_2"
        castShadow
        receiveShadow
        geometry={nodes.ring001_2.geometry}
        material={materials["Black-Text"]}
      />
    </group>
  );
}

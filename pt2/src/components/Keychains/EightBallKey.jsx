import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function EightBallKey({ nodes, materials, ...props }) {
  const innerRef = useRef();

  useFrame((state, delta) => {
    innerRef.current.rotation.z += delta;
  });
  return (
    <group
      {...props}
      name="EightBall"
      position={[0, 3.5, 0]}
      rotation={[-1.653, -0.016, -2.925]}
      scale={0.511}
      ref={innerRef}
    >
      <mesh
        geometry={nodes.ring.geometry}
        material={materials["マテリアル.001"]}
      />
      <mesh
        geometry={nodes.ring_1.geometry}
        material={materials["Black-8Ball"]}
      />
      <mesh geometry={nodes.ring_2.geometry} material={materials["8Ball"]} />
    </group>
  );
}

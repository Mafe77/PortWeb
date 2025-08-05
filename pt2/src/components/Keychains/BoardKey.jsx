import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function BoardKey({ nodes, materials, ...props }) {
  const innerRef = useRef();
  const innerRef2 = useRef();
  //   useFrame((state, delta) => {
  //     const rotationDelta = delta;
  //     if (innerRef.current) innerRef.current.rotation.z += rotationDelta;
  //     if (innerRef2.current) innerRef2.current.rotation.z += rotationDelta;
  //   });

  return (
    <group>
      <group
        ref={innerRef}
        name="Key"
        position={[-2.38, 9.416, 0.189]}
        rotation={[-1.595, 0, -2.927]}
        scale={0.511}
      >
        <mesh
          name="ring003"
          castShadow
          receiveShadow
          geometry={nodes.ring003.geometry}
          material={materials["マテリアル.001"]}
        />
        <mesh
          name="ring003_1"
          castShadow
          receiveShadow
          geometry={nodes.ring003_1.geometry}
          material={materials.Material}
        />
        <mesh
          name="ring003_2"
          castShadow
          receiveShadow
          geometry={nodes.ring003_2.geometry}
          material={new THREE.MeshStandardMaterial({ color: "#6E88B3" })}
        />
      </group>
      <mesh
        ref={innerRef2}
        name="Keycover"
        castShadow
        receiveShadow
        geometry={nodes.Keycover.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: "gray",
            transparent: true,
            opacity: 0.5,
          })
        }
        position={[-2.316, 5.063, 0.172]}
        rotation={[1.62, 0.009, 0.633]}
        scale={[0.806, 0.46, 0.806]}
      />
    </group>
  );
}

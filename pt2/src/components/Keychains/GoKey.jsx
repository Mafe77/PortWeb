export function GoKey({ nodes, materials, ...props }) {
  return (
    <group
      name="GoKey"
      position={[3.09, 9.641, 0.966]}
      rotation={[-1.595, 0, -2.927]}
      scale={0.511}
    >
      <mesh
        name="ring002"
        castShadow
        receiveShadow
        geometry={nodes.ring002.geometry}
        material={materials["マテリアル.001"]}
      />
      <mesh
        name="ring002_1"
        castShadow
        receiveShadow
        geometry={nodes.ring002_1.geometry}
        material={materials.GoBlack}
      />
      <mesh
        name="ring002_2"
        castShadow
        receiveShadow
        geometry={nodes.ring002_2.geometry}
        material={materials.GoWhite}
      />
    </group>
  );
}

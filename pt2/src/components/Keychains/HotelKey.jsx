export function HotelKey({ nodes, materials, ...props }) {
  return (
    <group
      name="HotelKey"
      position={[16.018, 9.693, 0.728]}
      rotation={[-1.595, 0, -2.927]}
      scale={0.511}
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

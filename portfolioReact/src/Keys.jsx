import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export default function Model(props) {
  const model = useLoader(GLTFLoader, "./Keychain1.glb");
  const model2 = useLoader(GLTFLoader, "./Keychain2.glb");

  return (
    <>
      <primitive object={model.scene} {...props} />
      <primitive object={model2.scene} {...props} />
    </>
  );
}

// useGLTF.preload("./Keychain1.glb");

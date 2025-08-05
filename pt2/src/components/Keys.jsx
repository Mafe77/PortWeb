// import React, { useRef } from "react";
// import { useGLTF } from "@react-three/drei";
// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/Addons.js";

// export default function Model(props) {
//   const model = useLoader(GLTFLoader, "./Keychain1.glb");

//   return (
//     <>
//       <primitive castShadow recieveShadow object={model.scene} {...props} />
//     </>
//   );
// }

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";

export default function AnimatedKeychain(props) {
  const modelRef = useRef();
  const { scene } = useGLTF("./Keychain1.glb");

  useEffect(() => {
    const model = scene.clone();
    model.position.set(0, -7.5, 0);
    modelRef.current.add(model);

    const boardKey = model.getObjectByName("Kboard");
    const eightBall = model.getObjectByName("EightBall");
    const goKey = model.getObjectByName("GoKey");
    const hotelKey = model.getObjectByName("PTkey");

    if (!boardKey || !eightBall || !goKey || !hotelKey) {
      console.warn("Missing one or more keys in GLTF model.");
      return;
    }

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { duration: 2, ease: "back.Out" },
    });

    tl.to(boardKey.rotation, { z: -0.003 }, 0);
    tl.to(goKey.rotation, { y: 0.03 }, 0);
    tl.to(eightBall.rotation, { z: 0.1 }, 0);
    tl.to(hotelKey.rotation, { z: 0.3 }, 0);
  }, [scene]);

  return <group ref={modelRef} {...props} />;
}

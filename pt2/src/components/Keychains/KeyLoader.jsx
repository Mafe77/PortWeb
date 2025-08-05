// KeysLoader.jsx
import { useGLTF } from "@react-three/drei";

export default function useKeysModel() {
  return useGLTF("/Keychain2.glb");
}

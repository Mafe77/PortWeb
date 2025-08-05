import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, addEffect } from "@react-three/fiber";

import Lenis from "@studio-freight/lenis";
import {
  View,
  Bounds,
  OrthographicCamera,
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ArcballControls,
  PivotControls,
  Html,
  Center,
  Preload,
} from "@react-three/drei";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

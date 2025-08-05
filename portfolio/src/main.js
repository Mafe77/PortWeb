import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import gsap from "gsap";
import { neutralToneMapping } from "three/tsl";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { AmbientLight } from "three/webgpu";

/*
  Raycasting
*/
const raycaster = new THREE.Raycaster();
const raycasterObjects = [];
const pointer = new THREE.Vector2();

/**
 * Debug
 */
const gui = new GUI({
  width: 300,
  title: "Nice debug UI",
  closeFolders: false,
});
gui.close()
gui.hide()
window.addEventListener("keydown", (event) => {
  if (event.key == "h") gui.show(gui._hidden);
});

const debugObject = {};

/**
 * Canvas
 */
const canvas = document.querySelector("canvas.webgl");
if (!canvas) {
  throw new Error("Canvas with class 'webgl' not found in HTML.");
}

/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 10);
scene.add(camera);


/**
 * Lights
 */
const ambient = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambient);
const directionalLight = new THREE.DirectionalLight(0xffd0c6, 2);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

/**
 * Load Model
 */
const loader = new GLTFLoader();
let model = null;

// Groups
const boardGroup = new THREE.Group();
const goGroup = new THREE.Group();
const eightGroup = new THREE.Group();
const piecesGroup = new THREE.Group();

loader.load(
  "model/Keychain1.glb",
  function (gltf) {
    model = gltf.scene;

    console.log("Loaded model:", model);

    const boardKey = model.children.find((child) => child.name === "Kboard");
    const eightBall = model.children.find(
      (child) => child.name === "EightBall"
    );
    const goKey = model.children.find((child) => child.name === "GoKey");
    const hotelKey = model.children.find((child) => child.name === "PTkey");

    boardGroup.add(boardKey, eightBall, goKey, hotelKey);

    model.position.set(0, -7.5, 0);
    boardGroup.position.set(0, -7.5, 0);

    scene.add(model);
    scene.add(boardGroup);


    const tl = gsap.timeline({ repeat: -1, yoyo: true, ease: "circ.inOut" });

    tl.to(boardKey.rotation, { z: -0.003, duration: 2 }, 0);
    tl.to(goKey.rotation, { y: 0.03,duration: 2 }, 0);
    tl.to(eightBall.quaternion, { z: 0.1,duration: 2 }, 0);
    tl.to(hotelKey.quaternion, { z: 0.1,duration: 2 }, 0);

  },
  undefined,
  function (error) {
    console.error("An error happened while loading the model:", error);
  }
);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});
renderer.setClearAlpha(0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


/**
 * Resize Handling
 */
window.addEventListener("resize", () => {
  // Update camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


const tick = () => {

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createGround } from './modules/ground.js';
import { createPaths } from './modules/paths.js';
import { createParking } from './modules/parking.js';
import { createDriveway } from './modules/driveway.js';
import { createManor } from './modules/manor.js';
import { createOutbuilding } from './modules/outbuilding.js';
import { populateLandscape } from './modules/landscape.js';
import { placeCouple } from './modules/people.js';
import { createFountain } from './modules/fountain.js';
import { waterMat } from './modules/materials.js';

const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Scene & camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd4e4f4);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
// camera.position.set(10, 60, 250); // camera in front of couple
camera.position.set(0, 600, 0); // camera from the top

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 20, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 50;
controls.maxDistance = 800;
controls.maxPolarAngle = Math.PI * 0.45;

// Lights
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const sun = new THREE.DirectionalLight(0xffffff, 0.9);
sun.position.set(50, 100, 200);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.near = 50;
sun.shadow.camera.far = 800;
sun.shadow.camera.left = -250;
sun.shadow.camera.right = 250;
sun.shadow.camera.top = 250;
sun.shadow.camera.bottom = -250;
sun.shadow.bias = -0.001;
scene.add(sun);

const fill = new THREE.HemisphereLight(0xddeeff, 0x889988, 0.4);
scene.add(fill);

createGround(scene);
createPaths(scene);
createParking(scene);
createDriveway(scene);
createManor(scene);
createOutbuilding(scene);
populateLandscape(scene);
placeCouple(scene);
createFountain(scene);

// Animation loop (including small lake waves)
let clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // Update water shader time uniform
  if (waterMat.userData.shader) {
    waterMat.userData.shader.uniforms.uTime.value = t;
  }

  controls.update();
  renderer.render(scene, camera);
}
animate();

// Resize handling
window.addEventListener('resize', () => {
  const { innerWidth, innerHeight } = window;
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

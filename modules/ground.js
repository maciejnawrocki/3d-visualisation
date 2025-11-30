import * as THREE from 'three';
import { grassMat } from './materials.js';

export function createGround(scene) {
  // Main grass island plateau
  const groundGeo = new THREE.PlaneGeometry(600, 400);
  const ground = new THREE.Mesh(groundGeo, grassMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Light border to suggest shoreline transition
  const shoreGeo = new THREE.RingGeometry(210, 260, 64);
  const shoreMat = new THREE.MeshStandardMaterial({
    color: 0x8ca66c,
    side: THREE.DoubleSide,
    roughness: 0.9
  });
  const shore = new THREE.Mesh(shoreGeo, shoreMat);
  shore.rotation.x = -Math.PI / 2;
  shore.position.set(0, 0.05, -80);
  shore.receiveShadow = true;
  scene.add(shore);
}

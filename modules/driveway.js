import * as THREE from 'three';
import { pathMat, grassMat } from './materials.js';

export function createDriveway(scene) {
  const shape = new THREE.Shape();
  shape.moveTo(-150, 120);
  shape.quadraticCurveTo(-100, 80, -50, 60);
  shape.quadraticCurveTo(0, 50, 50, 60);
  shape.quadraticCurveTo(100, 80, 150, 120);
  shape.lineTo(150, 100);
  shape.quadraticCurveTo(100, 60, 50, 40);
  shape.quadraticCurveTo(0, 30, -50, 40);
  shape.quadraticCurveTo(-100, 60, -150, 100);
  shape.lineTo(-150, 120);

  const extrudeSettings = { depth: 0.4, bevelEnabled: false };
  const drivewayGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  const driveway = new THREE.Mesh(drivewayGeo, pathMat);
  driveway.rotation.x = -Math.PI / 2;
  driveway.position.y = 0.1;
  driveway.receiveShadow = true;
  scene.add(driveway);

  const centerIsland = new THREE.Shape();
  centerIsland.moveTo(-40, 50);
  centerIsland.quadraticCurveTo(0, 40, 40, 50);
  centerIsland.quadraticCurveTo(0, 60, -40, 50);
  const islandGeo = new THREE.ShapeGeometry(centerIsland);
  const island = new THREE.Mesh(islandGeo, grassMat);
  island.rotation.x = -Math.PI / 2;
  island.position.y = 0.2;
  island.receiveShadow = true;
  scene.add(island);
}

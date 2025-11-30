import * as THREE from 'three';
import { pathMat, grassMat } from './materials.js';

export function createDriveway(scene) {
  const shape = new THREE.Shape();
  // Wider, more sweeping curves for the driveway
  shape.moveTo(-180, 150);
  shape.quadraticCurveTo(-120, 90, -60, 70);
  shape.quadraticCurveTo(0, 60, 60, 70);
  shape.quadraticCurveTo(120, 90, 180, 150);
  shape.lineTo(180, 130);
  shape.quadraticCurveTo(120, 70, 60, 50);
  shape.quadraticCurveTo(0, 40, -60, 50);
  shape.quadraticCurveTo(-120, 70, -180, 130);
  shape.closePath();

  const extrudeSettings = { depth: 0.4, bevelEnabled: false };
  const drivewayGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  const driveway = new THREE.Mesh(drivewayGeo, pathMat);
  driveway.rotation.x = -Math.PI / 2;
  driveway.position.y = 0.1;
  driveway.receiveShadow = true;
  scene.add(driveway);

  // The satellite image shows a continuous loop, so the center island is removed.
}

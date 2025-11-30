import * as THREE from 'three';
import { pathMat } from './materials.js';

export function createParking(scene) {
  const parkingShape = new THREE.Shape();

  // A large rectangular area for parking
  const parkingX = 100;
  const parkingZ = 50;
  const parkingWidth = 100;
  const parkingHeight = 80;

  parkingShape.moveTo(parkingX, parkingZ);
  parkingShape.lineTo(parkingX + parkingWidth, parkingZ);
  parkingShape.lineTo(parkingX + parkingWidth, parkingZ + parkingHeight);
  parkingShape.lineTo(parkingX, parkingZ + parkingHeight);
  parkingShape.closePath();

  const extrudeSettings = { depth: 0.2, bevelEnabled: false };
  const parkingGeo = new THREE.ExtrudeGeometry(parkingShape, extrudeSettings);
  const parking = new THREE.Mesh(parkingGeo, pathMat);
  parking.rotation.x = -Math.PI / 2;
  parking.position.y = 0.1;
  parking.receiveShadow = true;
  scene.add(parking);

  // Simple parked cars as small boxes
  const carGeo = new THREE.BoxGeometry(7, 3, 4);
  const colors = [0x444bff, 0xf44336, 0x9e9e9e, 0x4caf50, 0x000000];
  for (let i = 0; i < 7; i++) {
    const mat = new THREE.MeshStandardMaterial({
      color: colors[i % colors.length],
      roughness: 0.5,
      metalness: 0.3,
    });
    const car = new THREE.Mesh(carGeo, mat);
    // Position cars within the new parking area
    const carX = parkingX + 10 + (i % 4) * 20;
    const carZ = parkingZ + 10 + Math.floor(i / 4) * 20;
    car.position.set(carX, 1.8, carZ);
    car.castShadow = true;
    car.receiveShadow = true;
    scene.add(car);
  }
}

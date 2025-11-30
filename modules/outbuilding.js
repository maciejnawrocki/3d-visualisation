import * as THREE from 'three';
import { façadeMat, darkRoofMat, solarMat, pathMat } from './materials.js';
import { createRoof } from './utils.js';

export function createOutbuilding(scene) {
  const group = new THREE.Group();
  group.position.set(-120, 0, 80);

  const bodyGeo = new THREE.BoxGeometry(60, 20, 28);
  const body = new THREE.Mesh(bodyGeo, façadeMat);
  body.position.y = 10;
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  const roof = createRoof(28 + 4, 60 + 4, 16, darkRoofMat);
  roof.rotation.y = Math.PI / 2;
  roof.position.y = 20;
  group.add(roof);

  // Solar panels on roof
  const panelGeo = new THREE.BoxGeometry(14, 0.4, 6);
  for (let i = -1; i <= 1; i++) {
    const panel = new THREE.Mesh(panelGeo, solarMat);
    panel.rotation.x = Math.PI / 10;
    panel.position.set(i * 18, 30.6, 10);
    panel.castShadow = true;
    group.add(panel);
  }

  // Ground solar arrays in front
  const frameGeo = new THREE.BoxGeometry(26, 1, 10);
  for (let i = 0; i < 3; i++) {
    const frame = new THREE.Mesh(frameGeo, solarMat);
    frame.position.set(-40 + i * 32, 2, 55);
    frame.rotation.x = -Math.PI / 7;
    frame.castShadow = true;
    group.add(frame);
  }

  // Parking area
  const parkGeo = new THREE.BoxGeometry(120, 0.4, 40);
  const park = new THREE.Mesh(parkGeo, pathMat);
  park.position.set(20, 0.4, 70);
  park.receiveShadow = true;
  group.add(park);

  // Simple parked cars as small boxes
  const carGeo = new THREE.BoxGeometry(7, 3, 4);
  const colors = [0x444bff, 0xf44336, 0x9e9e9e, 0x4caf50, 0x000000];
  for (let i = 0; i < 7; i++) {
    const mat = new THREE.MeshStandardMaterial({
      color: colors[i % colors.length],
      roughness: 0.5,
      metalness: 0.3
    });
    const car = new THREE.Mesh(carGeo, mat);
    car.position.set(-30 + i * 14, 1.8, 80 + (i % 2 === 0 ? -5 : 5));
    car.castShadow = true;
    car.receiveShadow = true;
    group.add(car);
  }

  scene.add(group);
}

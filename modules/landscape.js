import * as THREE from 'three';
import { hedgeMat } from './materials.js';

function createRealisticTree(scene, x, z, options = {}) {
  const {
    height = 20,
    crownRadius = 6,
    trunkRadius = 0.8,
    color = 0x446622,
  } = options;

  const group = new THREE.Group();
  group.position.set(x, 0, z);

  const trunkHeight = height * 0.4;
  const trunkGeo = new THREE.CylinderGeometry(
    trunkRadius * 0.7,
    trunkRadius,
    trunkHeight,
    12
  );
  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x624a2e,
    roughness: 0.9,
  });
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.y = trunkHeight / 2;
  trunk.castShadow = true;
  group.add(trunk);

  const crownHeight = height * 0.6;
  const numSpheres = 8;
  const crownMat = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.8,
  });

  for (let i = 0; i < numSpheres; i++) {
    const sphereRadius = crownRadius * (0.6 + Math.random() * 0.4);
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, 8, 6);
    const sphere = new THREE.Mesh(sphereGeo, crownMat);

    sphere.position.set(
      (Math.random() - 0.5) * crownRadius * 0.8,
      trunkHeight + (Math.random() - 0.2) * crownHeight * 0.8,
      (Math.random() - 0.5) * crownRadius * 0.8
    );
    sphere.castShadow = true;
    group.add(sphere);
  }

  scene.add(group);
  return group;
}

function createHedgeLine(scene, points, geometry) {
  const geo = geometry || new THREE.CylinderGeometry(1.3, 1.3, 3, 8);
  for (const p of points) {
    const h = new THREE.Mesh(geo, hedgeMat);
    h.position.set(p.x, 1.5, p.z);
    h.castShadow = true;
    h.receiveShadow = true;
    scene.add(h);
  }
}

function createLampPost(scene, x, z) {
  const poleGeo = new THREE.CylinderGeometry(0.2, 0.2, 5, 8);
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.6 });
  const pole = new THREE.Mesh(poleGeo, poleMat);
  pole.position.set(x, 2.5, z);
  pole.castShadow = true;
  pole.receiveShadow = true;

  const headGeo = new THREE.SphereGeometry(0.6, 8, 8);
  const headMat = new THREE.MeshStandardMaterial({ color: 0xfff7d6, emissive: 0xfff3c4, emissiveIntensity: 0.7 });
  const head = new THREE.Mesh(headGeo, headMat);
  head.position.set(x, 5.4, z);
  head.castShadow = true;

  scene.add(pole, head);
}

export function populateLandscape(scene) {
    createRealisticTree(scene, -140, 0, { height: 35, crownRadius: 12, color: 0x3a592a });
    createRealisticTree(scene, 160, -20, { height: 32, crownRadius: 11, color: 0x41662f });
    createRealisticTree(scene, 150, -80, { height: 38, crownRadius: 12, color: 0x334d22 });
    createRealisticTree(scene, -80, -90, { height: 42, crownRadius: 13, color: 0x334d22 });
    createRealisticTree(scene, -120, -30, { height: 36, crownRadius: 11, color: 0x334d22 });

  const hedgeGeo = new THREE.BoxGeometry(2.5, 3.5, 2.5);
  const points = [
      // Right side hedges from camera view
      { x: 30, z: 40 }, { x: 34, z: 40 }, { x: 38, z: 40 },
      { x: 42, z: 40 }, { x: 46, z: 40 }, { x: 50, z: 40 },
      // Left side hedges from camera view
      { x: -30, z: 40 }, { x: -34, z: 40 }, { x: -38, z: 40 },
      { x: -42, z: 40 }, { x: -46, z: 40 }, { x: -50, z: 40 },
  ];
  createHedgeLine(scene, points, hedgeGeo);

  function createTopiary(x, z) {
      const baseGeo = new THREE.ConeGeometry(2, 4, 8);
      const base = new THREE.Mesh(baseGeo, hedgeMat);
      base.position.set(x, 2, z);
      base.castShadow = true;
      scene.add(base);
  }
  createTopiary(70, 70);
  createTopiary(-60, 80);
  createTopiary(110, 50);
}

import * as THREE from 'three';

export function createRoof(width, depth, height, material) {
  const geo = new THREE.ConeGeometry(
    Math.max(width, depth) * 0.6,
    height,
    4,
    1
  );
  const mesh = new THREE.Mesh(geo, material);
  mesh.rotation.y = Math.PI / 4;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

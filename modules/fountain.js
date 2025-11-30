import * as THREE from 'three';

export function createFountain(scene) {
  const fountain = new THREE.Group();
  const fountainMat = new THREE.MeshStandardMaterial({ color: 0xe5e5e5, roughness: 0.6 });

  // Base
  const baseGeo = new THREE.CylinderGeometry(14, 14, 1, 32);
  const base = new THREE.Mesh(baseGeo, fountainMat);
  base.position.y = 0.5;
  base.castShadow = true;
  base.receiveShadow = true;
  fountain.add(base);

  // Lower bowl stem
  const stem1Geo = new THREE.CylinderGeometry(2, 2, 4, 16);
  const stem1 = new THREE.Mesh(stem1Geo, fountainMat);
  stem1.position.y = 2.5;
  stem1.castShadow = true;
  stem1.receiveShadow = true;
  fountain.add(stem1);

  // Lower bowl
  const bowl1Geo = new THREE.CylinderGeometry(5, 4, 1, 32);
  const bowl1 = new THREE.Mesh(bowl1Geo, fountainMat);
  bowl1.position.y = 5;
  bowl1.castShadow = true;
  bowl1.receiveShadow = true;
  fountain.add(bowl1);

  // Upper bowl stem
  const stem2Geo = new THREE.CylinderGeometry(1, 1, 3, 16);
  const stem2 = new THREE.Mesh(stem2Geo, fountainMat);
  stem2.position.y = 7;
  stem2.castShadow = true;
  stem2.receiveShadow = true;
  fountain.add(stem2);

  // Upper bowl
  const bowl2Geo = new THREE.CylinderGeometry(3, 2.5, 1, 32);
  const bowl2 = new THREE.Mesh(bowl2Geo, fountainMat);
  bowl2.position.y = 9;
  bowl2.castShadow = true;
  bowl2.receiveShadow = true;
  fountain.add(bowl2);

  fountain.position.set(0, 0, 0);

  scene.add(fountain);
}

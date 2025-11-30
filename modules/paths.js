import * as THREE from 'three';
import { pathMat } from './materials.js';

export function createPaths(scene) {
  const extrudeSettings = { depth: 0.2, bevelEnabled: false };

  // Path from manor entrance to the fountain
  const mainPathShape = new THREE.Shape();
  mainPathShape.moveTo(-10, 40); // Corresponds to world z = -40
  mainPathShape.lineTo(-10, 15);  // Corresponds to world z = -15 (just before fountain)
  mainPathShape.lineTo(10, 15);
  mainPathShape.lineTo(10, 40);
  mainPathShape.closePath();

  const mainPathGeo = new THREE.ExtrudeGeometry(mainPathShape, extrudeSettings);
  const mainPath = new THREE.Mesh(mainPathGeo, pathMat);
  mainPath.rotation.x = -Math.PI / 2;
  mainPath.position.y = 0.1;
  mainPath.receiveShadow = true;
  scene.add(mainPath);

  // Path leading towards the outbuilding
  const outbuildingPathShape = new THREE.Shape();
  // Connects from the driveway (around z=50) to the outbuilding (at z=80)
  outbuildingPathShape.moveTo(-100, 50);
  outbuildingPathShape.lineTo(-120, 50);
  outbuildingPathShape.lineTo(-120, 80);
  outbuildingPathShape.lineTo(-100, 80);
  outbuildingPathShape.closePath();

  const outbuildingPathGeo = new THREE.ExtrudeGeometry(
    outbuildingPathShape,
    extrudeSettings
  );
  const outbuildingPath = new THREE.Mesh(outbuildingPathGeo, pathMat);
  outbuildingPath.rotation.x = -Math.PI / 2;
  outbuildingPath.position.y = 0.1;
  outbuildingPath.receiveShadow = true;
  scene.add(outbuildingPath);
}

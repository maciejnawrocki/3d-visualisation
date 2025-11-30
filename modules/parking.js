import * as THREE from 'three';
import { pathMat } from './materials.js';

export function createParking(scene) {
  const parkingShape = new THREE.Shape();

  // 1. Parking dimensions (unchanged)
  const parkingX = 20;
  const parkingZ = -200;
  const parkingWidth = 90;
  const parkingHeight = 80;

  parkingShape.moveTo(parkingX, parkingZ);
  parkingShape.lineTo(parkingX + parkingWidth, parkingZ);
  parkingShape.lineTo(parkingX + parkingWidth, parkingZ + parkingHeight);
  parkingShape.lineTo(parkingX, parkingZ + parkingHeight);
  parkingShape.closePath();

  // 2. Path: Longer and Shifted Left
  const pathShape = new THREE.Shape();

  // Start Point (Top Left):
  // - Shifted Left: from x=0 to x=-10 (centers the 20-width path on x=0)
  // - Made Longer: from y=-25 to y=-10 (closer to fountain center)
  pathShape.moveTo(-10, -10);

  // Curve to Parking Entrance (Bottom Left at x=30):
  pathShape.bezierCurveTo(
    -10, -80, // Control point 1: straight down from new start
    30, -80,  // Control point 2: guides into parking
    30, -120  // End point: top edge of parking
  );

  // Bottom Edge (Width 20):
  pathShape.lineTo(50, -120);

  // Return Curve (Right Side):
  pathShape.bezierCurveTo(
    50, -80,  // Control point 2
    10, -80,  // Control point 1: shifted left to align with new top right
    10, -10   // End Point (Top Right): x=10, y=-10
  );
  pathShape.closePath();

  const extrudeSettings = { depth: 0.2, bevelEnabled: false };

  // Parking Mesh
  const parkingGeo = new THREE.ExtrudeGeometry(parkingShape, extrudeSettings);
  const parking = new THREE.Mesh(parkingGeo, pathMat);
  parking.rotation.x = -Math.PI / 2;
  parking.position.y = 0.2;
  parking.receiveShadow = true;
  scene.add(parking);

  // Path Mesh
  const pathGeo = new THREE.ExtrudeGeometry(pathShape, extrudeSettings);
  const connectionPath = new THREE.Mesh(pathGeo, pathMat);
  connectionPath.rotation.x = -Math.PI / 2;
  connectionPath.position.y = 0.2;
  connectionPath.receiveShadow = true;
  scene.add(connectionPath);

  // Cars
  const carGeo = new THREE.BoxGeometry(7, 3, 4);
  const colors = [0x444bff, 0xf44336, 0x9e9e9e, 0x4caf50, 0x000000];
  for (let i = 0; i < 7; i++) {
    const mat = new THREE.MeshStandardMaterial({
      color: colors[i % colors.length],
      roughness: 0.5,
      metalness: 0.3,
    });
    const car = new THREE.Mesh(carGeo, mat);

    const carX = parkingX + 10 + (i % 4) * 20;
    const carZ = parkingZ + 10 + Math.floor(i / 4) * 20;

    car.position.set(carX, 1.8, -carZ);
    car.castShadow = true;
    car.receiveShadow = true;
    scene.add(car);
  }
}

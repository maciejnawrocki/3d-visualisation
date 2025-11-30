import * as THREE from 'three';
import { façadeMat, accentStoneMat, roofMat, windowMat, gravelMat } from './materials.js';
import { createRoof } from './utils.js';

function addWindowsToFacade(group, width, height, rows, cols, zOffset) {
  const w = width / (cols + 1);
  const hSpacing = w;
  const vSpacing = height / (rows + 2);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const winGeo = new THREE.PlaneGeometry(w * 0.5, vSpacing * 0.7);
      const win = new THREE.Mesh(winGeo, windowMat);
      win.position.set(
        -width / 2 + (c + 1) * hSpacing,
        4 + (r + 1) * vSpacing,
        zOffset
      );
      win.castShadow = false;
      win.receiveShadow = false;
      group.add(win);

      // Simple white frame
      const frameGeo = new THREE.PlaneGeometry(w * 0.53, vSpacing * 0.75);
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0xe9ecef,
        roughness: 0.7
      });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.position.copy(win.position);
      frame.position.z += (zOffset > 0 ? 0.01 : -0.01);
      group.add(frame);
    }
  }
}

export function createManor(scene) {
  const manor = new THREE.Group();
  manor.position.set(0, 0, -60);

  // Central block (two stories)
  const centerWidth = 80;
  const centerDepth = 40;
  const centerHeight = 22;

  const centerGeo = new THREE.BoxGeometry(centerWidth, centerHeight, centerDepth);
  const center = new THREE.Mesh(centerGeo, façadeMat);
  center.position.y = centerHeight / 2;
  center.castShadow = true;
  center.receiveShadow = true;
  manor.add(center);

  // Stone base belt
  const baseGeo = new THREE.BoxGeometry(centerWidth, 3, centerDepth + 0.4);
  const base = new THREE.Mesh(baseGeo, accentStoneMat);
  base.position.y = 1.3;
  base.castShadow = true;
  base.receiveShadow = true;
  manor.add(base);

  // Central front risalit (the porch + balcony volume)
  const risWidth = 32;
  const risDepth = 10;
  const risHeight = 20;
  const risGeo = new THREE.BoxGeometry(risWidth, risHeight, risDepth);
  const ris = new THREE.Mesh(risGeo, façadeMat);
  ris.position.set(0, risHeight / 2 + 1, centerDepth / 2 + risDepth / 2 - 1);
  ris.castShadow = true;
  ris.receiveShadow = true;
  manor.add(ris);

  // Triangular front gable above risalit
  const gableShape = new THREE.Shape();
  gableShape.moveTo(-risWidth / 2, 0);
  gableShape.lineTo(risWidth / 2, 0);
  gableShape.lineTo(0, 14);
  gableShape.lineTo(-risWidth / 2, 0);
  const gableGeo = new THREE.ExtrudeGeometry(gableShape, {
    depth: 2,
    bevelEnabled: false
  });
  const gable = new THREE.Mesh(gableGeo, façadeMat);
  gable.rotation.y = Math.PI;
  gable.position.set(0, 19, centerDepth / 2 + risDepth - 1);
  gable.castShadow = true;
  gable.receiveShadow = true;
  manor.add(gable);

  // Central main roof
  const roof = createRoof(centerDepth + 3, centerWidth + 3, 15, roofMat);
  roof.rotation.y = Math.PI / 2;
  roof.position.set(0, centerHeight, 0);
  manor.add(roof);

  // Risalit small roof
  const smallRoof = createRoof(risWidth + 3, risDepth + 20, 16, roofMat);
  smallRoof.rotation.y = Math.PI ;
  smallRoof.position.set(0, 20, centerDepth / 2 - 4);
  manor.add(smallRoof);

  // Front colonnade (porch)
  const porchDepth = 8;
  const porchHeight = 9;
  const porchRoofGeo = new THREE.BoxGeometry(risWidth, 1.5, porchDepth);
  const porchRoof = new THREE.Mesh(porchRoofGeo, façadeMat);
  porchRoof.position.set(0, porchHeight + 1.5, centerDepth / 2 + risDepth / 2 + porchDepth / 2);
  porchRoof.castShadow = true;
  manor.add(porchRoof);

  const porchFloorGeo = new THREE.BoxGeometry(risWidth, 0.5, porchDepth);
  const porchFloor = new THREE.Mesh(porchFloorGeo, gravelMat);
  porchFloor.position.set(0, 0.25, centerDepth / 2 + risDepth / 2 + porchDepth / 2);
  porchFloor.receiveShadow = true;
  manor.add(porchFloor);

  const colGeo = new THREE.CylinderGeometry(1.2, 1.2, porchHeight, 16);
  const colMat = new THREE.MeshStandardMaterial({ color: 0xfdfbf5, roughness: 0.5 });
  const colPositions = [-risWidth / 2 + 6, risWidth / 2 - 6];
  colPositions.forEach(x => {
      const col = new THREE.Mesh(colGeo, colMat);
      col.position.set(x, porchHeight / 2 + 0.5, centerDepth / 2 + risDepth / 2 + porchDepth / 2);
      col.castShadow = true;
      manor.add(col);
  });

  const balconyRailGeo = new THREE.BoxGeometry(risWidth - 2, 1.5, 0.5);
  const balconyRail = new THREE.Mesh(balconyRailGeo, façadeMat);
  balconyRail.position.set(0, porchHeight + 2.5, centerDepth / 2 + risDepth / 2 + porchDepth);
  balconyRail.castShadow = true;
  manor.add(balconyRail);

  // Main entrance doorway
  const doorGeo = new THREE.BoxGeometry(8, 6, 0.5);
  const doorMat = new THREE.MeshStandardMaterial({ color: 0xded7cf, roughness: 0.7 });
  const door = new THREE.Mesh(doorGeo, doorMat);
  door.position.set(0, 4, centerDepth / 2 + risDepth + 0.26);
  door.castShadow = true;
  manor.add(door);

  // Entrance side windows (ground level)
  const sideWinGeo = new THREE.PlaneGeometry(4, 3);
  for (let i = -1; i <= 1; i += 2) {
    const sw = new THREE.Mesh(sideWinGeo, windowMat);
    sw.position.set(i * 9, 4.3, centerDepth / 2 + risDepth + 0.27);
    manor.add(sw);
  }

  // Windows on central block
  addWindowsToFacade(manor, centerWidth - 10, centerHeight - 6, 2, 4, centerDepth / 2 + 0.21);
  addWindowsToFacade(manor, centerWidth - 10, centerHeight - 6, 2, 4, -centerDepth / 2 - 0.21);

  // Left and right wings
  function createWing(sign) {
    const wing = new THREE.Group();

    const wingWidth = 40;
    const wingDepth = 26;
    const wingHeight = 20;

    const wingGeo = new THREE.BoxGeometry(wingWidth, wingHeight, wingDepth);
    const wingMesh = new THREE.Mesh(wingGeo, façadeMat);
    wingMesh.position.y = wingHeight / 2;
    wingMesh.castShadow = true;
    wingMesh.receiveShadow = true;
    wing.add(wingMesh);

    const wingBaseGeo = new THREE.BoxGeometry(wingWidth, 2.4, wingDepth + 0.3);
    const wingBase = new THREE.Mesh(wingBaseGeo, accentStoneMat);
    wingBase.position.y = 1.2;
    wingBase.castShadow = true;
    wingBase.receiveShadow = true;
    wing.add(wingBase);

    const wingRoof = createRoof(wingDepth + 3, wingWidth + 3, 12, roofMat);
    wingRoof.rotation.y = Math.PI / 2;
    wingRoof.position.set(0, wingHeight, 0);
    wing.add(wingRoof);

    // Wing windows (front & back)
    addWindowsToFacade(
      wing,
      wingWidth - 10,
      wingHeight - 4,
      1,
      5,
      wingDepth / 2 + 0.21
    );
    addWindowsToFacade(
      wing,
      wingWidth - 10,
      wingHeight - 4,
      1,
      5,
      -wingDepth / 2 - 0.21
    );

    // Slight inner bend toward courtyard
    wing.rotation.y = sign * (Math.PI / 2)*3;
    wing.position.set(sign * (centerWidth / 2 + wingWidth / 2 - 10), 0, 40);

    return wing;
  }

  const leftWing = createWing(-1);
  const rightWing = createWing(1);
  manor.add(leftWing, rightWing);

  // Small terraces at ends (approximated)
  function createEndTerrace(sign) {
    const tGeo = new THREE.BoxGeometry(24, 1, 12);
    const t = new THREE.Mesh(tGeo, gravelMat);
    t.position.set(sign * (centerWidth / 2 + 70), 1, 14);
    t.castShadow = true;
    t.receiveShadow = true;
    manor.add(t);

    const railGeo2 = new THREE.BoxGeometry(22, 1, 1);
    const rail2 = new THREE.Mesh(railGeo2, façadeMat);
    rail2.position.set(sign * (centerWidth / 2 + 70), 3, 19);
    rail2.castShadow = true;
    manor.add(rail2);
  }
  createEndTerrace(-1);
  createEndTerrace(1);

  scene.add(manor);
}

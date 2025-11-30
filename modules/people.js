import * as THREE from 'three';

function createPerson(options) {
  const group = new THREE.Group();
  const {
    height = 10,
    bodyColor = 0x000000,
    accentColor = 0xffffff,
    hairColor = 0x000000,
    isBride = false
  } = options;

  const scale = height / 10;

  // Torso
  const torsoGeo = new THREE.CylinderGeometry(
    isBride ? 1.6 * scale : 1.4 * scale,
    isBride ? 2.2 * scale : 1.6 * scale,
    4.5 * scale,
    16
  );
  const torsoMat = new THREE.MeshStandardMaterial({
    color: bodyColor,
    roughness: 0.6,
    metalness: 0.1
  });
  const torso = new THREE.Mesh(torsoGeo, torsoMat);
  torso.position.y = 4.5 * scale;
  torso.castShadow = true;
  torso.receiveShadow = true;
  group.add(torso);

  // Legs (only visible for groom)
  if (!isBride) {
    const legGeo = new THREE.CylinderGeometry(0.5 * scale, 0.5 * scale, 4 * scale, 10);
    const legMat = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.7 });
    const leftLeg = new THREE.Mesh(legGeo, legMat);
    const rightLeg = new THREE.Mesh(legGeo, legMat);
    leftLeg.position.set(-0.7 * scale, 2 * scale, 0);
    rightLeg.position.set(0.7 * scale, 2 * scale, 0);
    leftLeg.castShadow = rightLeg.castShadow = true;
    leftLeg.receiveShadow = rightLeg.receiveShadow = true;
    group.add(leftLeg, rightLeg);
  } else {
    // Wedding dress: long cone
    const dressGeo = new THREE.CylinderGeometry(0.7 * scale, 2.6 * scale, 5 * scale, 24);
    const dressMat = new THREE.MeshStandardMaterial({
      color: 0xfdfdfd,
      roughness: 0.7,
      metalness: 0.05
    });
    const dress = new THREE.Mesh(dressGeo, dressMat);
    dress.position.y = 3.1 * scale;
    dress.castShadow = true;
    dress.receiveShadow = true;
    group.add(dress);
  }

  // Neck
  const neckGeo = new THREE.CylinderGeometry(0.5 * scale, 0.5 * scale, 0.8 * scale, 10);
  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xffdab5,
    roughness: 0.6
  });
  const neck = new THREE.Mesh(neckGeo, skinMat);
  neck.position.y = 7 * scale;
  neck.castShadow = true;
  group.add(neck);

  // Head
  const headGeo = new THREE.SphereGeometry(1.3 * scale, 16, 16);
  const head = new THREE.Mesh(headGeo, skinMat);
  head.position.y = 8.7 * scale;
  head.castShadow = true;
  head.receiveShadow = true;
  group.add(head);

  // Hair
  const hairGeo = new THREE.SphereGeometry(1.35 * scale, 16, 16, 0, Math.PI * 2, 0, Math.PI);
  const hairMat = new THREE.MeshStandardMaterial({
    color: hairColor,
    roughness: 0.6
  });
  const hair = new THREE.Mesh(hairGeo, hairMat);
  hair.position.y = 9 * scale;
  hair.castShadow = true;
  group.add(hair);

  // Arms
  const armGeo = new THREE.CylinderGeometry(0.35 * scale, 0.35 * scale, 3.6 * scale, 10);
  const sleeveMat = new THREE.MeshStandardMaterial({
    color: bodyColor,
    roughness: 0.6
  });
  const leftArm = new THREE.Mesh(armGeo, sleeveMat);
  const rightArm = new THREE.Mesh(armGeo, sleeveMat);
  if (isBride) {
    leftArm.position.set(-0.2 * scale, 5.4 * scale, 1.4 * scale);
    rightArm.position.set(0.6 * scale, 5.4 * scale, 1.2 * scale);
    leftArm.rotation.x = -Math.PI / 4;
    rightArm.rotation.x = -Math.PI / 4;
  } else {
    leftArm.position.set(-1.2 * scale, 5.6 * scale, 0.4 * scale);
    rightArm.position.set(1.2 * scale, 5.6 * scale, 0.4 * scale);
    leftArm.rotation.x = Math.PI / 12;
    rightArm.rotation.x = -Math.PI / 12;
  }
  leftArm.castShadow = rightArm.castShadow = true;
  leftArm.receiveShadow = rightArm.receiveShadow = true;
  group.add(leftArm, rightArm);

  // Hands
  const handGeo = new THREE.SphereGeometry(0.45 * scale, 10, 10);
  const lHand = new THREE.Mesh(handGeo, skinMat);
  const rHand = new THREE.Mesh(handGeo, skinMat);
  const armLength = 3.6 * scale;
  const handOffset = new THREE.Vector3(0, -armLength / 2, 0);

  lHand.position
    .copy(leftArm.position)
    .add(handOffset.clone().applyEuler(leftArm.rotation));
  rHand.position
    .copy(rightArm.position)
    .add(handOffset.clone().applyEuler(rightArm.rotation));
  lHand.castShadow = rHand.castShadow = true;
  group.add(lHand, rHand);

  // Details
  if (!isBride) {
    // Bow tie
    const bowGeo = new THREE.BoxGeometry(0.4 * scale, 0.2 * scale, 0.8 * scale);
    const bowMat = new THREE.MeshStandardMaterial({ color: accentColor, roughness: 0.5 });
    const bow = new THREE.Mesh(bowGeo, bowMat);
    bow.position.set(0, 7.8 * scale, 1.3 * scale);
    bow.castShadow = true;
    group.add(bow);

    // Shirt stripe
    const stripeGeo = new THREE.BoxGeometry(0.4 * scale, 2.5 * scale, 0.1 * scale);
    const stripeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 });
    const stripe = new THREE.Mesh(stripeGeo, stripeMat);
    stripe.position.set(0, 6.5 * scale, 1.35 * scale);
    group.add(stripe);
  } else {
    // Veil as transparent plane
    const veilGeo = new THREE.PlaneGeometry(4.5 * scale, 6 * scale);
    const veilMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    const veil = new THREE.Mesh(veilGeo, veilMat);
    veil.position.set(0, 8.5 * scale, -1.1 * scale);
    veil.rotation.x = -0.3;
    veil.castShadow = false;
    group.add(veil);

    // Bouquet
    const bouquetGeo = new THREE.SphereGeometry(0.9 * scale, 10, 10);
    const bouquetMat = new THREE.MeshStandardMaterial({
      color: 0xff6f91,
      roughness: 0.7
    });
    const bouquet = new THREE.Mesh(bouquetGeo, bouquetMat);
    bouquet.position.set(0.5 * scale, 4.6 * scale, 1.6 * scale);
    bouquet.castShadow = true;
    group.add(bouquet);
  }

  return group;
}

export function placeCouple(scene) {
  const groom = createPerson({
    height: 11.5,
    bodyColor: 0x111111,
    accentColor: 0xb4001a,
    hairColor: 0x2d1b14,
    isBride: false
  });
  const bride = createPerson({
    height: 9.5,
    bodyColor: 0xffffff,
    accentColor: 0xffffff,
    hairColor: 0xf6d585,
    isBride: true
  });

  // Position them on the axis of the entrance, slightly in front of the fountain
  groom.position.set(-5, 0, 28);
  bride.position.set(5, 0, 26);

  groom.rotation.y = Math.PI * 0.05
  bride.rotation.y = -Math.PI * 0.05;

  scene.add(groom, bride);
}

import * as THREE from 'three';

export function createRoof(width, depth, height, material) {
  const geometry = new THREE.BufferGeometry();

  const vertices = new Float32Array([
    -width / 2, 0, -depth / 2, // v0: back bottom left
     width / 2, 0, -depth / 2, // v1: back bottom right
     width / 2, 0,  depth / 2, // v2: front bottom right
    -width / 2, 0,  depth / 2, // v3: front bottom left
     0, height, -depth / 2,    // v4: back top center
     0, height,  depth / 2,    // v5: front top center
  ]);

  const indices = [
    // front gable
    3, 2, 5,
    // back gable
    0, 4, 1,
    // left slope
    0, 3, 5,
    0, 5, 4,
    // right slope
    1, 5, 2,
    1, 4, 5
  ];

  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.computeVertexNormals();

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

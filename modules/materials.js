import * as THREE from 'three';

export const grassMat = new THREE.MeshStandardMaterial({
  color: 0x78946a,
  roughness: 0.85,
  metalness: 0.05
});

export const pathMat = new THREE.MeshStandardMaterial({
  color: 0xced4da,
  roughness: 0.9
});

export const gravelMat = new THREE.MeshStandardMaterial({
  color: 0xb0b4b8,
  roughness: 0.95
});

export const waterMat = new THREE.MeshPhysicalMaterial({
  color: 0x5aa1b8,
  transparent: true,
  opacity: 0.9,
  roughness: 0.15,
  metalness: 0.45,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1
});

waterMat.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = { value: 0 };

  shader.vertexShader = `
    uniform float uTime;
    varying vec3 vWorldPosition;
    ${shader.vertexShader}
  `;

  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    `
      #include <begin_vertex>

      float wave = sin((position.x + uTime * 10.0) * 0.02) * 0.4 +
                   cos((position.y - uTime * 6.0) * 0.018) * 0.3;
      transformed.z += wave;

      // Recalculate normals for correct lighting
      vec3 next_px = position;
      next_px.x += 0.1;
      float wave_px = sin((next_px.x + uTime * 10.0) * 0.02) * 0.4 +
                      cos((next_px.y - uTime * 6.0) * 0.018) * 0.3;
      next_px.z += wave_px;

      vec3 next_py = position;
      next_py.y += 0.1;
      float wave_py = sin((next_py.x + uTime * 10.0) * 0.02) * 0.4 +
                      cos((next_py.y - uTime * 6.0) * 0.018) * 0.3;
      next_py.z += wave_py;

      vec3 to_px = normalize(next_px - position);
      vec3 to_py = normalize(next_py - position);
      objectNormal = normalize(cross(to_py, to_px));

      vWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;
    `
  );

  waterMat.userData.shader = shader;
};

export const façadeMat = new THREE.MeshStandardMaterial({
  color: 0xf8f4e9,
  roughness: 0.9
});

export const accentStoneMat = new THREE.MeshStandardMaterial({
  color: 0xd1c8bd,
  roughness: 0.95
});

export const roofMat = new THREE.MeshStandardMaterial({
  color: 0xcf6a47,
  roughness: 0.8
});

export const darkRoofMat = new THREE.MeshStandardMaterial({
  color: 0x9d3a17,
  roughness: 0.55
});

export const windowMat = new THREE.MeshStandardMaterial({
  color: 0x6c757d,
  transparent: true,
  opacity: 0.7,
  roughness: 0.1,
  metalness: 0.2
});

export const solarMat = new THREE.MeshStandardMaterial({
  color: 0x1b2435,
  roughness: 0.15,
  metalness: 0.85
});

export const treeTrunkMat = new THREE.MeshStandardMaterial({
  color: 0x5a3b26,
  roughness: 0.9
});

export const treeLeafMat = new THREE.MeshStandardMaterial({
  color: 0x2e6b2f,
  roughness: 0.7
});

export const hedgeMat = new THREE.MeshStandardMaterial({
  color: 0x31572b,
  roughness: 0.85
});

import * as THREE from 'three';

export function isValidOrZero(
  condision: boolean,
  vector: THREE.Vector3
): THREE.Vector3 {
  return condision ? vector : new THREE.Vector3(0, 0, 0);
}

export function isValidOrOne(
  condision: boolean,
  vector: THREE.Vector3
): THREE.Vector3 {
  return condision ? vector : new THREE.Vector3(1, 1, 1);
}

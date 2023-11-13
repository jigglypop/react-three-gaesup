// import { vec3 } from '@react-three/rapier';
// import { atom } from 'jotai';
// import * as THREE from 'three';
// import {
//   cameraInteractAtomType,
//   cameraRayAtomType,
//   currentCameraAtomType
// } from './type';
//
// export const cameraRayAtom = atom<cameraRayAtomType>({
//   origin: vec3(),
//   hit: new THREE.Raycaster(),
//   rayCast: new THREE.Raycaster(vec3(), vec3(), 0, -7),
//   lerpingPoint: vec3(),
//   dir: vec3(),
//   position: vec3(),
//   length: -1
// });
//
// export const cameraInteractAtom = atom<cameraInteractAtomType>({
//   intersects: [],
//   intersectObjects: [],
//   intersectObjectMap: {}
// });
//
// export const currentCameraAtom = atom<currentCameraAtomType>({
//   initDistance: -5,
//   maxDistance: -7,
//   minDistance: -0.7,
//   initDirection: 0,
//   collisionOff: 0.7,
//   cameraDistance: -1,
//   followCamera: new THREE.Object3D(),
//   pivot: new THREE.Object3D(),
//   camFollow: 11
// });
//
// cameraRayAtom.debugLabel = 'camera_ray';
// currentCameraAtom.debugLabel = 'current_camera';
// cameraInteractAtom.debugPrivate = true;

import { vec3 } from '@react-three/rapier';
import { atom } from 'jotai';
import * as THREE from 'three';

export type moveProps = {
  impulse: THREE.Vector3;
  direction: THREE.Vector3;
  accelation: THREE.Vector3;
  velocity: THREE.Vector3;
  dragForce: THREE.Vector3;
  // VinDi: THREE.Vector3;
  delta: THREE.Vector3;
  mass: THREE.Vector3;
  turnSpeed: number;
  jumpSpeed: number;
  rejectSpeed: number;
  gravity: number;
  walkSpeed: number;
  dT: number;
};

export const moveAtom = atom<moveProps>({
  impulse: vec3(),
  direction: vec3(),
  accelation: vec3(),
  velocity: vec3(),
  dragForce: vec3(),
  delta: vec3({ x: 0, y: 0.5, z: 0 }),
  mass: vec3(),
  turnSpeed: 10,
  jumpSpeed: 5,
  rejectSpeed: 4,
  gravity: 5,
  walkSpeed: 3,
  dT: 10
});

moveAtom.debugLabel = 'move';

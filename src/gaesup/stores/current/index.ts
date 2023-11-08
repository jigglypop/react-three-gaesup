import { euler, quat, vec3 } from '@react-three/rapier';
import { atom } from 'jotai';
import * as THREE from 'three';

export type currentProps = {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  reverseVelocity: THREE.Vector3;
  quat: THREE.Quaternion;
  euler: THREE.Euler;
};

export const currentAtom = atom<currentProps>({
  position: vec3(),
  velocity: vec3(),
  reverseVelocity: vec3(),
  quat: quat(),
  euler: euler()
});

currentAtom.debugLabel = 'current';

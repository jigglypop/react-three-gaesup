import { vec3 } from '@react-three/rapier';
import { atom } from 'jotai';
import { rayType } from './type';

export const rayAtom = atom<rayType>({
  springDir: vec3(),
  mass: vec3(),
  rayOrigin: vec3(),
  dir: vec3({ x: 0, y: -1, z: 0 }),
  originOffset: vec3({ x: 0, y: -1, z: 0 }),
  rayHit: null,
  rayParent: null,
  rayCast: null,
  hitForgiveness: 0.1,
  length: -1
});
rayAtom.debugLabel = 'ray';

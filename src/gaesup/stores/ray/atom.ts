import { vec3 } from '@react-three/rapier';
import { atom } from 'jotai';
import { colliderAtom } from '../collider';
import { rayType } from './type';

export const rayAtom = atom<rayType>({
  springDir: vec3(),
  rayOrigin: vec3(),
  dir: vec3({ x: 0, y: -1, z: 0 }),
  originOffset: vec3({ x: 0, y: -colliderAtom.init.halfHeight, z: 0 }),
  rayHit: null,
  rayParent: null,
  rayCast: null,
  hitForgiveness: 0.1,
  length: colliderAtom.init.radius + 2
});
rayAtom.debugLabel = 'ray';

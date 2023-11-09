import { vec3 } from '@react-three/rapier';
import { atom } from 'jotai';
import { colliderAtom } from '../collider';
import { slopeRayType } from './type';

export const slopeRayAtom = atom<slopeRayType>({
  current: vec3(),
  currentAngle: 0,
  rayOrigin: vec3(),
  rayHit: null,
  rayCast: null,
  dir: vec3({ x: 0, y: -1, z: 0 }),
  angle: 0,
  maxAngle: 1,
  originOffset: vec3({ x: 0, y: 0, z: colliderAtom.init.radius - 0.03 }),
  length: colliderAtom.init.radius + 3
});
slopeRayAtom.debugLabel = 'slopeRay';

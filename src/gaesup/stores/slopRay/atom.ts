import { vec3 } from '@react-three/rapier';
import { atom } from 'jotai';
import { slopeRayType } from './type';

export const slopeRayAtom = atom<slopeRayType>({
  current: vec3(),
  currentAngle: 0,
  rayOrigin: vec3(),
  rayHit: null,
  rayCast: null,
  dir: vec3({ x: 0, y: -1, z: 0 }),
  angle: 0,
  length: -1,
  maxAngle: 1,
  upExtraForce: 0.1,
  downExtraForce: 0.2,
  originOffset: vec3({ x: 0, y: -1, z: 0 })
});
slopeRayAtom.debugLabel = 'slopeRay';

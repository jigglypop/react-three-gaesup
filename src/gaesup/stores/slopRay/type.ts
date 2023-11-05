import { Ray, RayColliderToi } from '@dimforge/rapier3d-compat';
import * as THREE from 'three';

export type slopeRayPresetType = {
  current: THREE.Vector3;
  currentAngle: number;
  rayOrigin: THREE.Vector3;
  rayHit: RayColliderToi | null;
  rayCast: Ray | null;
  dir: THREE.Vector3;
  originOffset: THREE.Vector3;
};

export type slopeRayPropType = {
  angle: number;
  length: number;
  maxAngle: number;
  upExtraForce: number;
  downExtraForce: number;
};

export type slopeRayType = slopeRayPresetType & slopeRayPropType;

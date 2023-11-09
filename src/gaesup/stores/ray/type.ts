import { Ray, RayColliderToi } from '@dimforge/rapier3d-compat';
import { RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';

export type rayPropsType = {
  springDir: THREE.Vector3;
  rayOrigin: THREE.Vector3;
  rayHit: RayColliderToi | null;
  rayParent?: RapierRigidBody | null | undefined;
  rayCast: Ray | null;
  originOffset: THREE.Vector3;
  dir: THREE.Vector3;
};

export type groundRayType = {
  rayOrigin: THREE.Vector3;
  rayHit: RayColliderToi | null;
  rayParent?: RapierRigidBody | null | undefined;
  rayCast: Ray | null;
  offset: THREE.Vector3;
  dir: THREE.Vector3;
  length: number;
};

export type rayPresetType = {
  hitForgiveness: number;
  length: number;
};

export type rayType = rayPresetType & rayPropsType;

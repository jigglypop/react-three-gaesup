import { Ray, RayColliderToi } from '@dimforge/rapier3d-compat';
import { RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';

export type rayType = {
  origin: THREE.Vector3;
  hit: RayColliderToi | null;
  parent?: RapierRigidBody | null | undefined;
  rayCast: Ray | null;
  offset: THREE.Vector3;
  dir: THREE.Vector3;
  springDir: THREE.Vector3;
  length: number;
};

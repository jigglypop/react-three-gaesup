import { RayColliderToi } from '@dimforge/rapier3d-compat';
import { RapierRigidBody, RigidBodyProps } from '@react-three/rapier';
import { ReactNode, RefObject } from 'react';
import { Vector3 } from 'three';
import { rayDefault } from './props';
import { cameraRayPropsType } from './stores/camera';

export type AnimationTag = {
  idle: string;
  walk: string;
  run: string;
  jump: string;
  jumpIdle: string;
  jumpLand: string;
  fall: string;
};

export type AnimationSet = {
  idle: string;
  walk: string;
  run: string;
  jump: string;
  jumpIdle: string;
  jumpLand: string;
  fall: string;
  [key: string]: string;
};

export type capsuleType = {
  halfHeight: number;
  radius: number;
};

export type calcType = {
  maxV: number;
  turnV: number;
  turnS: number;
  jumpV: number;
  dragDamp: number;
  ATimeD: number;
  rejectV: number;
  runR: number;
  runJumpR: number;
  slopJumpR: number;
  jumpToG: number;
  airDrag: number;
  camFollow: number;
};

export type stabilizeType = {
  strength: number;
  damping: {
    rotational: number;
    vertical: number;
  };
};

export type cameraPropsType = {
  initDistance: number;
  maxDistance: number;
  minDistance: number;
  initDirection: number;
  collisionOff: number;
};

export type rayType = {
  originOffset: { x: number; y: number; z: number };
  hitForgiveness: number;
  length: number;
  dir: { x: number; y: number; z: number };
};

export type slopeRayType = {
  maxAngle: number;
  upExtraForce: number;
  downExtraForce: number;
  rayOriginOffset: number;
  rayLength: number;
  rayDir: { x: number; y: number; z: number };
};

export type calcBuoyancyType = {
  rigidBodyRef: RefObject<RapierRigidBody>;
  rayHit: RayColliderToi | null;
  rayParent: RapierRigidBody | null | undefined;
  canJump: boolean;
  buoyancy: buoyancyDefaultType;
  springDirVec: THREE.Vector3;
  mass: THREE.Vector3;
  standingForcePoint: THREE.Vector3;
};

export type optionType = {
  debug?: boolean;
  controllerType?: 'none' | 'gameboy' | 'joystick';
};

export interface ControllerProps extends RigidBodyProps {
  children?: ReactNode;
  url: string;
  debug?: boolean;
  capsule?: capsuleType;
  characterInitDir?: number;
  camera?: cameraPropsType;
  cameraRay?: cameraRayPropsType;
  calc?: calcType;
  ray?: typeof rayDefault;
  buoyancy?: buoyancyDefaultType;
  slopeRay?: slopeRayType;
  stabilize?: stabilizeType;
  props?: RigidBodyProps;
  options?: optionType;
}

export type State = {
  curAnimation: string;
  animationSet: AnimationSet;
  initializeAnimationSet: (animationSet: AnimationSet) => void;
  reset: () => void;
} & {
  [key in keyof AnimationSet]: () => void;
};

export type AnimationProps = {
  url: string;
  animationSet: AnimationSet;
  children: ReactNode;
};

export type useFollowCamType = {
  cam: cameraPropsType;
};

export type useActionsEffectType = {
  url: string;
  cur: curType;
  outerGroupRef?: RefObject<THREE.Group>;
};

export type calcAccelarationType = {
  outerGroupRef: RefObject<THREE.Group> | undefined;
  cur: curType;
  rejectV: THREE.Vector3;
  accDeltaTime: number;
  calc: calcType;
  run: boolean;
  isOnMoving: boolean;
  move: moveType;
};

export type moveType = {
  impulse: Vector3;
  Di: Vector3;
  A: Vector3;
  V: Vector3;
  dragForce: Vector3;
  VinDi: Vector3;
};

export type curType = {
  V: Vector3;
  P: Vector3;
};

export type raysType = {
  origin: THREE.Vector3;
  hit: RayColliderToi | null;
};

export type buoyancyDefaultType = {
  distance: number;
  K: number;
  damp: number;
};

export type slopeType = {
  angle: number;
  current: {
    normal: THREE.Vector | undefined;
    angle: number;
  };
  rayOrigin: THREE.Vector3;
  rayHit: RayColliderToi | null;
  rayOriginOffest: 0;
};

export type checkTurnType = {
  move: moveType;
  model: any;
  outerGroupRef: RefObject<THREE.Group> | null;
  rigidBodyRef: RefObject<RapierRigidBody> | null;
  slopeRay: any;
  angle: number;
  calc: calcType;
  run: boolean;
  canJump: boolean;
  moveImpulsePointY: number;
  cur: curType;
};

export type checkOnTheSlopeType = {
  outerGroupRef: RefObject<THREE.Group>;
  rayOrigin: THREE.Vector3;
  rayHit: RayColliderToi | null;
  buoyancy: buoyancyDefaultType;
  slopeRay: any;
  slopeRayCast: any;
  slope: slopeType;
  canJump: boolean;
  castRay: () => RayColliderToi | null;
};

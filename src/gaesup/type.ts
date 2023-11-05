import { RayColliderToi } from '@dimforge/rapier3d-compat';
import { RapierRigidBody, RigidBodyProps } from '@react-three/rapier';
import { ReactNode, RefObject } from 'react';
import { Vector3 } from 'three';
import { cameraPropsType, cameraRayPropsType } from './stores/camera/type';
import { dampingType } from './stores/damping';
import { optionType } from './stores/options/type';
import { ratioType } from './stores/ratio';
import { rayType } from './stores/ray/type';
import { slopeRayType } from './stores/slopRay/type';

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

export type calcType = {
  maxV: number;
  turnV: number;
  turnS: number;
  jumpV: number;
  // dragDamp: number;
  ATimeD: number;
  rejectV: number;
  jumpToG: number;
  airDrag: number;
  camFollow: number;
};

export type calcBuoyancyType = {
  rigidBodyRef: RefObject<RapierRigidBody>;
  rayHit: RayColliderToi | null;
  rayParent: RapierRigidBody | null | undefined;
  canJump: boolean;
  buoyancy: any;
  springDirVec: THREE.Vector3;
  mass: THREE.Vector3;
  standingForcePoint: THREE.Vector3;
};

export interface ControllerProps extends RigidBodyProps {
  children?: ReactNode;
  url: string;
  debug?: boolean;
  characterInitDir?: number;
  camera?: cameraPropsType;
  cameraRay?: cameraRayPropsType;
  calc?: calcType;
  ray?: rayType;
  buoyancy?: any;
  slopeRay?: slopeRayType;
  props?: RigidBodyProps;
  options?: optionType;
  damping?: dampingType;
  ratio?: ratioType;
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

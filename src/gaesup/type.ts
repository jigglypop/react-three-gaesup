import { GroupProps } from '@react-three/fiber';
import { RigidBodyProps } from '@react-three/rapier';
import { ReactNode } from 'react';
import { buoyancyType } from './stores/buoyancy/type';
import { cameraPropsType, cameraRayPropsType } from './stores/camera/type';
import { dampingType } from './stores/damping';
import { optionType } from './stores/options/type';
import { ratioType } from './stores/ratio';
import { rayType } from './stores/ray/type';
import { slopeRayType } from './stores/slopRay/type';

export type animationTagType = {
  idle: string;
  walk: string;
  run: string;
  jump: string;
  jumpIdle: string;
  jumpLand: string;
  fall: string;
};

export type actionsType = animationTagType & {
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

export interface ControllerProps extends RigidBodyProps {
  children?: ReactNode;
  url: string;
  debug?: boolean;
  camera?: cameraPropsType;
  cameraRay?: cameraRayPropsType;
  calc?: calcType;
  ray?: rayType;
  buoyancy?: buoyancyType;
  slopeRay?: slopeRayType;
  props?: RigidBodyProps;
  options?: optionType;
  damping?: dampingType;
  ratio?: ratioType;
  character?: GroupProps;
  animations: THREE.AnimationClip[];
}

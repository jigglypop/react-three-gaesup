import { GroupProps } from '@react-three/fiber';
import { RigidBodyProps } from '@react-three/rapier';
import { ReactNode } from 'react';
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

export interface ControllerProps extends RigidBodyProps {
  children?: ReactNode;
  url: string;
  debug?: boolean;
  camera?: cameraPropsType;
  cameraRay?: cameraRayPropsType;
  ray?: rayType;
  slopeRay?: slopeRayType;
  props?: RigidBodyProps;
  options?: optionType;
  damping?: dampingType;
  ratio?: ratioType;
  character?: GroupProps;
  animations: THREE.AnimationClip[];
}

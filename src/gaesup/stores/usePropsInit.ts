import { Collider } from '@dimforge/rapier3d-compat';
import { RapierRigidBody, vec3 } from '@react-three/rapier';
import { RefObject, useContext } from 'react';
import * as THREE from 'three';
import { ControllerProps } from '../type';
import useCameraInit from './camera';
import { ControllerContext } from './context';
import useCurrentInit from './current';
import { useDampingInit } from './damping';
import useOptionInit from './options';
import useRayInit from './ray';
import useSolpeRayInit from './slopRay';
import useStandInit from './stand';

export const ControllerDefault = {
  // stand: {
  //   P: vec3()
  // },
  objectAng: {
    VToLinV: vec3()
  },
  pivot: {
    P: vec3()
  },
  // move
  move: {
    impulse: vec3(),
    Di: vec3(),
    A: vec3(),
    V: vec3(),
    dragForce: vec3(),
    VinDi: vec3(),
    deltaY: 0.5
  },
  // jump
  jumps: {
    mass: vec3(),
    Vv3: vec3(),
    Di: vec3()
  },
  animationSet: {
    idle: 'idle',
    walk: 'walk',
    run: 'run',
    jump: 'jump',
    jumpIdle: 'jumpIdle',
    jumpLand: 'jumpLand',
    fall: 'fall'
  },
  buoyancy: {
    distance: -1,
    K: 1.2
  },
  calc: {
    maxV: 2.5,
    turnV: 0.2,
    turnS: 15,
    jumpV: 4,
    rejectV: 4,

    ATimeD: 10,
    jumpToG: 5,
    camFollow: 11
  }
};

export default function usePropsInit(
  props: Omit<ControllerProps, 'children' | 'url'> & {
    capsuleColliderRef: RefObject<Collider>;
    rigidBodyRef: RefObject<RapierRigidBody>;
    outerGroupRef: RefObject<THREE.Group>;
    slopeRayOriginRef: RefObject<THREE.Mesh>;
  }
) {
  const controllerContext = useContext(ControllerContext);

  controllerContext.buoyancy = props.buoyancy!;
  controllerContext.calc = props.calc!;

  // options init
  useOptionInit({ optionProp: props.options });
  // current init
  useCurrentInit();
  // follow camera init
  useCameraInit({
    cameraProps: props.camera!,
    cameraRayProps: props.cameraRay!
  });
  // damping
  useDampingInit({
    dampingProps: props.damping
  });

  useRayInit({
    rayProp: props.ray!,
    capsuleColliderRef: props.capsuleColliderRef
  });

  useSolpeRayInit({
    slopeRayProp: props.slopeRay!
  });
  // character state
  // stand
  useStandInit();
}

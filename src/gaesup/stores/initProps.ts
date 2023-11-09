import { Collider } from '@dimforge/rapier3d-compat';
import { RapierRigidBody } from '@react-three/rapier';
import { RefObject } from 'react';
import * as THREE from 'three';
import { ControllerProps } from '../type';
import useCameraInit from './camera';
import { useDampingInit } from './damping';
import useOptionInit from './options';
import useRayInit from './ray';
import useSolpeRayInit from './slopRay';

export default function initProps(
  props: Omit<ControllerProps, 'children' | 'url'> & {
    capsuleColliderRef: RefObject<Collider>;
    rigidBodyRef: RefObject<RapierRigidBody>;
    outerGroupRef: RefObject<THREE.Group>;
    slopeRayOriginRef: RefObject<THREE.Mesh>;
  }
) {
  // options init
  useOptionInit({ optionProp: props.options });
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
}

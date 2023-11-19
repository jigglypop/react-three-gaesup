'use client';

import { Collider } from '@dimforge/rapier3d-compat';
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody
} from '@react-three/rapier';
import { useAtomValue } from 'jotai';
import { useRef } from 'react';
import * as THREE from 'three';
import { colliderAtom } from './stores/collider';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import check from './check';
import initCallback from './initial/initCallback';
import initProps from './initial/initProps';
import initSetting from './initial/initSetting';
import calculation from './physics';
import { controllerInnerType, controllerType } from './type';
import VehicleGltf from './utils/VehicleGltf';

/**
 * ControllerWrapper
 */

export default function Controller(props: controllerType) {
  // const gltf = useLoader(GLTFLoader, props.url);
  // const { animations, scene } = gltf;
  // useColliderInit(scene, props);
  const animations = [];
  return (
    <ControllerInner {...{ ...props, animations }}>
      {/* {props.options?.mode === 'normal' && (
        <CharacterGltf {...{ ...props, animations }} />
      )}
      {props.options?.mode === 'airplane' && (
        <CharacterGltf {...{ ...props, animations }} />
      )} */}
      {props.options?.mode === 'vehicle' && (
        <VehicleGltf {...{ ...props, animations }} />
      )}
    </ControllerInner>
  );
}

export function ControllerInner(props: controllerInnerType) {
  const capsuleColliderRef = useRef<Collider>(null);
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const outerGroupRef = useRef<THREE.Group>(null);
  const slopeRayOriginRef = useRef<THREE.Mesh>(null);

  // init props
  const prop = initProps({
    ...props,
    capsuleColliderRef,
    rigidBodyRef,
    outerGroupRef,
    slopeRayOriginRef
  });
  initCallback(props, prop);
  initSetting(prop);

  check(prop);
  calculation(prop);

  const collider = useAtomValue(colliderAtom);
  const { cameraRay } = prop;
  return (
    <>
      <PerspectiveCamera makeDefault fov={40} />
      <OrbitControls enabled={false} regress={false} />
      <RigidBody
        colliders={false}
        canSleep={false}
        ref={rigidBodyRef}
        position={props.position || [0, 1, 0]}
        // friction={props.friction || -0.5}
        {...props}
      >
        {/* <mesh visible={prop.options.debug}>
          <arrowHelper
            args={[
              prop.groundRay.dir,
              prop.groundRay.origin,
              prop.groundRay.length
            ]}
          />
        </mesh> */}

        <CapsuleCollider
          ref={capsuleColliderRef}
          args={[collider.height, collider.radius]}
        />

        <group ref={outerGroupRef} userData={{ intangible: true }}>
          <mesh
            position={[
              prop.groundRay.offset.x,
              prop.groundRay.offset.y,
              prop.groundRay.offset.z + prop.slopeRay.offset.z
            ]}
            ref={slopeRayOriginRef}
            visible={false}
            userData={{ intangible: true }}
          >
            {/* <mesh>
              <arrowHelper
                args={[
                  prop.slopeRay.dir,
                  prop.slopeRay.origin,
                  prop.slopeRay.length,
                  '#ff0000'
                ]}
              />
            </mesh> */}
            <boxGeometry args={[0.15, 0.15, 0.15]} />
          </mesh>

          {props.children}
        </group>
      </RigidBody>
    </>
  );
}
// <group
//   receiveShadow
//   castShadow
//   {...props.character}
//   position={[-1, -collider.height, -1]}
// >
//   <Gltf src={'/wheel.glb'} />
// </group>
// <group
//   receiveShadow
//   castShadow
//   {...props.character}
//   position={[1.2, -collider.height, -1]}
// >
//   <Gltf src={'/wheel.glb'} />
// </group>
// <group
//   receiveShadow
//   castShadow
//   {...props.character}
//   position={[-1, -collider.height, 1]}
// >
//   <Gltf src={'/wheel.glb'} />
// </group>
// <group
//   receiveShadow
//   castShadow
//   {...props.character}
//   position={[1.2, -collider.height, 1]}
// >
//   <Gltf src={'/wheel.glb'} />
// </group>

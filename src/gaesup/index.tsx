import { Collider } from '@dimforge/rapier3d-compat';
import { useLoader } from '@react-three/fiber';
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody
} from '@react-three/rapier';
import { useAtomValue } from 'jotai';
import { useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import checkIsRotate from './check/checkIsRotate';
import checkMoving from './check/checkMoving';
import checkOnMovingObject from './check/checkOnMovingObject';
import checkOnTheGround from './check/checkOnTheGround';
import checkOnTheSlope from './check/checkOnTheSlope';
import calcAccelaration from './physics/accelaration';
import calcActions from './physics/actions';
import calcCamera from './physics/camera';
import calcDirection from './physics/direction';
import calcImpulse from './physics/impulse';
import calcJump from './physics/jump';
import stabilizing from './physics/stabilizing';
import calcTurn from './physics/turn';
import { colliderAtom, useColliderInit } from './stores/collider';
import initCallback from './stores/initCallback';
import initProps from './stores/initProps';
import initSetting from './stores/initSetting';
import { controllerInnerType, controllerType } from './type';
import CharacterGltf from './utils/CharacterGltf';

/**
 * ControllerWrapper
 */

export default function Controller(props: controllerType) {
  const gltf = useLoader(GLTFLoader, props.url);
  const { animations, scene } = gltf;
  useColliderInit(scene, props);
  return (
    <ControllerInner {...{ ...props, animations }}>
      <CharacterGltf {...{ ...props, animations }} />
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
  checkOnTheGround(prop);
  checkOnTheSlope(prop);
  checkOnMovingObject(prop);
  checkMoving(prop);
  checkIsRotate(prop);
  calcCamera(prop);
  calcTurn(prop);
  calcDirection(prop);
  calcAccelaration(prop);
  calcJump(prop);
  calcImpulse(prop);
  stabilizing(prop);
  calcActions(prop);

  const rigidBody2Ref = useRef<RapierRigidBody>(null);
  const capsuleCollider2Ref = useRef<Collider>(null);
  const outerGroup2Ref = useRef<THREE.Group>(null);
  const slopeRayOrigin2Ref = useRef<THREE.Mesh>(null);
  // const { stabilize } = useContext(ControllerContext);
  //
  //   const { model } = useContext(ControllerContext);
  //
  //   useFrame((_, delta) => {
  //     if (!rigidBody2Ref.current || !outerGroup2Ref.current) return null;
  //     if (!rigidBodyRef || !rigidBodyRef.current) return null;
  //
  //     outerGroup2Ref.current.position.lerp(
  //       cur.P.add(vec3({ x: 1, y: 0.1, z: 1 })),
  //       0
  //     );
  //     model.quat.setFromEuler(model.euler);
  //     outerGroup2Ref.current!.quaternion.rotateTowards(
  //       model.quat,
  //       delta * calc.turnS * 0.5
  //     );
  //   });

  const collider = useAtomValue(colliderAtom);
  return (
    <>
      <RigidBody
        colliders={false}
        canSleep={false}
        ref={rigidBodyRef}
        position={props.position || [0, 5, 0]}
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

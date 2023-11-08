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
import calcCamera from './physics/camera';
import calcDirection from './physics/direction';
import calcImpulse from './physics/impulse';
import calcJump from './physics/jump';
import stabilizing from './physics/stabilizing';
import calcTurn from './physics/turn';
import useActionsEffect from './stores/animation/useActionsEffect';
import { colliderAtom, useColliderInit } from './stores/collider';
import initProps from './stores/initProps';
import initSetting from './stores/initSetting';
import { rayAtom } from './stores/ray/atom';
import { slopeRayAtom } from './stores/slopRay/atom';
import { ControllerProps } from './type';
import CharacterGltf from './utils/CharacterGltf';

/**
 * ControllerWrapper
 * 컨트롤 정의
 */

export default function Controller(props: Omit<ControllerProps, 'animations'>) {
  const gltf = useLoader(GLTFLoader, props.url);
  const { animations, scene } = gltf;

  useColliderInit(scene, props);
  //console.log( size );
  return (
    <ControllerInner {...{ ...props, animations }}>
      <CharacterGltf {...props} />
    </ControllerInner>
  );
}

export function ControllerInner(props: ControllerProps) {
  const capsuleColliderRef = useRef<Collider>(null);
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const outerGroupRef = useRef<THREE.Group>(null);
  const slopeRayOriginRef = useRef<THREE.Mesh>(null);

  // init props
  initProps({
    ...props,
    capsuleColliderRef,
    rigidBodyRef,
    outerGroupRef,
    slopeRayOriginRef
  });

  initSetting();
  // /**
  //  * check turn
  //  * 캐릭터 방향 감지
  //  * @param rigidBodyRef
  //  */
  // checkTurn({
  //   rigidBodyRef
  // });

  checkOnTheGround({
    capsuleColliderRef
  });

  checkOnTheSlope({
    slopeRayOriginRef,
    capsuleColliderRef
  });

  checkOnMovingObject();
  checkMoving();
  checkIsRotate({
    outerGroupRef
  });

  calcCamera();
  calcTurn({
    outerGroupRef
  });
  calcDirection({
    rigidBodyRef
  });
  calcAccelaration({
    outerGroupRef
  });
  calcJump({
    rigidBodyRef
  });
  calcImpulse({
    rigidBodyRef
  });
  stabilizing({ rigidBodyRef });
  useActionsEffect({ outerGroupRef, animations: props.animations });

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
  const rays = useAtomValue(rayAtom);
  const slopeRays = useAtomValue(slopeRayAtom);
  const collider = useAtomValue(colliderAtom);

  //   useEffect(() => {
  //     const a = vec3({ x: 1, y: 0, z: 1 });
  //     const b = vec3({ x: 2, y: 0, z: 1 });
  //
  //     a.multiplyScalar(3);
  //     console.log(a);
  //   }, []);

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
        <CapsuleCollider
          ref={capsuleColliderRef}
          args={[collider.height, collider.radius]}
        />
        <group ref={outerGroupRef} userData={{ camExcludeCollision: true }}>
          <mesh
            position={[
              rays.originOffset.x,
              rays.originOffset.y,
              rays.originOffset.z + slopeRays.originOffset.z
            ]}
            ref={slopeRayOriginRef}
            visible={false}
            userData={{ camExcludeCollision: true }} // this won't be collide by camera ray
          >
            <boxGeometry args={[0.15, 0.15, 0.15]} />
          </mesh>

          {props.children}
        </group>
      </RigidBody>
    </>
  );
}

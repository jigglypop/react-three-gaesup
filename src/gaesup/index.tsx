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
import checkOnMove from './check/checkOnMove';
import checkOnTheGround from './check/checkOnTheGround';
import checkOnTheSlope from './check/checkOnTheSlope';
import checkTurn from './check/checkTurn';
import calcAccelaration from './physics/accelaration';
import calcBuoyancy from './physics/buoyancy';
import calcCamera from './physics/camera';
import calcDirection from './physics/direction';
import calcDragForce from './physics/dragForce';
import calcJump from './physics/jump';
import stabilizing from './physics/stabilizing';
import calcTurn from './physics/turn';
import useActionsEffect from './stores/animation/useActionsEffect';
import { colliderAtom, useColliderInit } from './stores/collider';
import useControlEffect from './stores/control/useControlEffect';
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

  useControlEffect();
  // init props
  initProps({
    ...props,
    capsuleColliderRef,
    rigidBodyRef,
    outerGroupRef,
    slopeRayOriginRef
  });

  initSetting();

  // initDebug();
  /**
   * Camera movement, Camera collision detect
   */
  calcCamera();
  /**
   * Character current position, Vocity, slope detection
   * 캐릭터 현재 위치, 속도, 방향 감지
   * @param outerGroupRef
   */
  calcTurn({
    outerGroupRef
  });

  /**
   * Calculate character direction
   * 캐릭터 방향 계산
   * @param rigidBodyRef
   * @param cam
   */
  calcDirection({
    rigidBodyRef
  });

  /**
   * check turn
   * 캐릭터 방향 감지
   * @param outerGroupRef
   * @param rigidBodyRef
   */
  checkTurn({
    outerGroupRef,
    rigidBodyRef
  });

  /**
   * Calculate character direction
   * 캐릭터 방향 계산
   * @param outerGroupRef
   */

  calcAccelaration({
    outerGroupRef
  });

  /**
   * Jump impulse
   * 점프 충격량 계산
   * @param rigidBodyRef
   * @param outerGroupRef
   */
  calcJump({
    rigidBodyRef
  });
  /**
   * Ray casting detect if on ground
   * 캐릭터가 땅 위에 있는지 감지합니다
   * @param capsuleColliderRef
   */
  checkOnTheGround({
    capsuleColliderRef
  });
  /**
   * Ray detect if on slope
   * 캐릭터가 경사면 위에 있는지 감지합니다
   * @param slopeRayOriginRef
   * @param capsuleColliderRef
   */

  checkOnTheSlope({
    slopeRayOriginRef,
    capsuleColliderRef
  });
  /**
   * Ray detect if on rigid body or dynamic platform, then apply the linear Vocity and angular Vocity to character
   * 캐릭터가 움직이는 플랫폼 위에 있는지 감지합니다
   */
  checkOnMove();
  /**
   * Apply buoyancy force
   * 부력을 계산합니다
   * @param rigidBodyRef
   */
  calcBuoyancy({
    rigidBodyRef
  });
  /**
   * Apply drag force
   * 항력을 계산합니다
   * @param rigidBodyRef
   */
  calcDragForce({
    rigidBodyRef
  });
  /**
   * Apply stabilize force to the character
   * 스테빌라이징
   * @param rigidBodyRef
   */
  stabilizing({ rigidBodyRef });
  /**
   * Actions for managing animations
   * 애니메이션을 관리하기 위한 액션들
   * @param outerGroupRef
   * @param animations
   */
  useActionsEffect({ outerGroupRef, animations: props.animations });

  // const ref = useRef<MeshLineGeometry>(null);
  // console.log(ref);

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
        friction={props.friction || -0.5}
        {...props}
      >
        <CapsuleCollider
          ref={capsuleColliderRef}
          args={[collider.halfHeight, collider.radius]}
          position={[
            rays.originOffset.x,
            rays.originOffset.y,
            rays.originOffset.z + slopeRays.originOffset.z
          ]}
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

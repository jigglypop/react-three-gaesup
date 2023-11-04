import { Gltf } from '@react-three/drei';
import ReactDOM from 'react-dom';
import { useFrame } from '@react-three/fiber';
import { RigidBody, RapierRigidBody, vec3 } from '@react-three/rapier';
import { useRef, useContext } from 'react';
import * as THREE from 'three';
import { Collider } from '@dimforge/rapier3d-compat';
import { ControllerProps, slopeType } from './type';
import { CapsuleCollider } from '@react-three/rapier';
import stabilizing from './physics/stabilizing';
import calcBuoyancy from './physics/buoyancy';
import calcDragForce from './physics/dragForce';
import {
  capsuleDefault,
  cameraDefault,
  calcDefault,
  rayDefault,
  slopeDefault,
  stabilizeDefault,
  buoyancyDefault
} from './props';
import useActionsEffect from './hooks/useActionsEffect';
import calcAccelaration from './physics/accelaration';
import checkTurn from './check/checkTurn';
import checkOnTheSlope from './check/checkOnTheSlope';
import checkOnMove from './check/checkOnMove';
import calcDirection from './physics/direction';
import calcJump from './physics/jump';
import { ControllerContext, controllerContextType } from './stores/context';
import useControlInit from './stores/useControlInit';
import usePropsInit, { ControllerDefault } from './stores/usePropsInit';
import checkOnTheGround from './check/checkOnTheGround';
import calcTurn from './physics/turn';
import calcCamera from './physics/camera';
import useStartInit from './stores/useStartInit';
import * as style from './styles.css';
import useFollowCamera from './hooks/useFollowCamera';
import useRayInit from './stores/ray';
import initDebug from './stores/initDebug';

/**
 * ControllerWrapper
 * 컨트롤 정의
 * 줄임말 설명
 * V : Vocity (속도)
 * A : accelation (가속도)
 * v3 : vector3 (벡터 3)
 * Di : direction (방향)
 * D : distance (거리)
 * d : delta (델타)
 * R : Ratio (비율)
 */

export default function Controller(props: ControllerProps) {
  const gltfRef = useRef<THREE.Object3D<THREE.Object3DEventMap>>(null);

  return (
    <>
      <ControllerContext.Provider value={ControllerDefault}>
        <ControllerInner {...props}>
          <Gltf
            ref={gltfRef}
            castShadow
            receiveShadow
            scale={0.3}
            position={[0, -0.55, 0]}
            src={props.url}
          />
        </ControllerInner>
      </ControllerContext.Provider>
    </>
  );
}

export function ControllerInner({
  children,
  url,
  capsule = { ...capsuleDefault },
  camera = { ...cameraDefault },
  calc = { ...calcDefault },
  ray = { ...rayDefault },
  slopeRay = { ...slopeDefault },
  buoyancy = {
    ...buoyancyDefault
  },
  stabilize = { ...stabilizeDefault },
  options,
  ...props
}: ControllerProps) {
  const capsuleColliderRef = useRef<Collider>(null);
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const outerGroupRef = useRef<THREE.Group>(null);
  const slopeRayOriginRef = useRef<THREE.Mesh>(null);
  const { pivot, cameraCollisionDetect } = useFollowCamera();
  const { rays, cur, move } = useContext(ControllerContext);

  useRayInit({
    rayProp: ray,
    capsuleColliderRef
  });

  /**
   * keyboard controls setup
   */
  // init control set
  useControlInit();
  // init props
  usePropsInit({
    // url,
    capsuleColliderRef,
    rigidBodyRef,
    outerGroupRef,
    slopeRayOriginRef,
    capsule,
    camera,
    calc,
    ray,
    slopeRay,
    buoyancy,
    stabilize,
    options,
    ...props
  });

  useStartInit();

  // initDebug();
  /**
   * Camera movement, Camera collision detect
   *  카메라 이동, 카메라 충돌 감지
   */

  calcCamera({
    pivot,
    cameraCollisionDetect
  });
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
    rigidBodyRef,
    pivot
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
    rigidBodyRef,
    outerGroupRef
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
   * @param url
   * @param outerGroupRef
   */
  useActionsEffect({ url, outerGroupRef });

  // const ref = useRef<MeshLineGeometry>(null);
  // console.log(ref);

  const rigidBody2Ref = useRef<RapierRigidBody>(null);
  const capsuleCollider2Ref = useRef<Collider>(null);
  const outerGroup2Ref = useRef<THREE.Group>(null);
  const slopeRayOrigin2Ref = useRef<THREE.Mesh>(null);
  // const { stabilize } = useContext(ControllerContext);

  const { model } = useContext(ControllerContext);

  useFrame((_, delta) => {
    if (!rigidBody2Ref.current || !outerGroup2Ref.current) return null;
    if (!rigidBodyRef || !rigidBodyRef.current) return null;

    outerGroup2Ref.current.position.lerp(
      cur.P.add(vec3({ x: 1, y: 0.1, z: 1 })),
      0
    );
    model.quat.setFromEuler(model.euler);
    outerGroup2Ref.current!.quaternion.rotateTowards(
      model.quat,
      delta * calc.turnS * 0.5
    );
  });

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
          args={[capsule.halfHeight, capsule.radius]}
          position={[
            rays.originOffset.x,
            rays.originOffset.y,
            rays.originOffset.z + slopeRay.rayOriginOffset
          ]}
        />
        <group ref={outerGroupRef} userData={{ camExcludeCollision: true }}>
          <mesh
            position={[
              rays.originOffset.x,
              rays.originOffset.y,
              rays.originOffset.z + slopeRay.rayOriginOffset
            ]}
            ref={slopeRayOriginRef}
            visible={false}
            userData={{ camExcludeCollision: true }} // this won't be collide by camera ray
          >
            <boxGeometry args={[0.15, 0.15, 0.15]} />
          </mesh>

          {children}
        </group>
      </RigidBody>

      <RigidBody
        colliders={false}
        canSleep={false}
        ref={rigidBody2Ref}
        position={cur.P}
        friction={-0.5}
        {...props}
      >
        <group
          userData={{ camExcludeCollision: true }}
          ref={outerGroup2Ref}
          // position={cur.P}
        >
          <Gltf
            castShadow
            receiveShadow
            scale={0.3}
            // position={[0, -0.55, 0]}
            src={'./ghost_w_tophat.glb'}
          />
        </group>
      </RigidBody>
    </>
  );
}

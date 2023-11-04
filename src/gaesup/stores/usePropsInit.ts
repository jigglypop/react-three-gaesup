import { useFrame } from '@react-three/fiber';
import { RefObject, useContext, useEffect, useMemo } from 'react';
import { ControllerContext } from './context';
import { ControllerProps } from '../type';
import {
  vec3,
  euler,
  quat,
  RapierRigidBody,
  CapsuleCollider,
  useRapier
} from '@react-three/rapier';
import { RayColliderToi, Collider, Ray } from '@dimforge/rapier3d-compat';
import * as THREE from 'three';
import useOptionInit from './options';

export const ControllerDefault = {
  stand: {
    P: vec3()
  },
  objectAng: {
    VToLinV: vec3()
  },
  pivot: {
    P: vec3()
  },
  model: {
    euler: euler(),
    quat: quat()
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
  // cur
  cur: { P: vec3(), V: vec3(), rejectV: vec3() },
  // slope
  slope: {
    angle: 0,
    currentV3: vec3(),
    currentAngle: 0,
    rayOrigin: vec3(),
    rayHit: null as RayColliderToi | null,
    rayCast: null as Ray | null,
    maxAngle: 1, // in rad
    upExtraForce: 0.1,
    downExtraForce: 0.2,
    rayOriginOffset: -1,
    rayLength: -1,
    rayDir: { x: 0, y: -1, z: 0 }
  },
  rays: {
    springDirVec: vec3(),
    mass: vec3(),
    rayOrigin: vec3(),
    rayHit: null as RayColliderToi | null,
    rayParent: null as RapierRigidBody | null | undefined,
    rayCast: null as Ray | null,
    originOffset: { x: 0, y: 0, z: 0 },
    hitForgiveness: 0.1,
    length: -1,
    dir: { x: 0, y: 0, z: 0 }
  },
  control: {
    f: false,
    b: false,
    l: false,
    r: false,
    jump: false,
    run: false,
    jumpIdle: false,
    jumpLand: false
    // isMoving: false,
    // isNotMoving: false
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
  // states: {
  //   canJump: false,
  //   isOnMoving: false
  // },
  capsule: {
    halfHeight: -1,
    radius: -1
  },
  buoyancy: {
    distance: -1,
    K: 1.2,
    damp: 0.08
  },
  calc: {
    maxV: 2.5,
    turnV: 0.2,
    turnS: 15,
    jumpV: 4,
    dragDamp: 0.15,
    ATimeD: 10,
    rejectV: 4,
    runR: 2,
    runJumpR: 1.2,
    slopJumpR: 0.25,
    jumpToG: 5,
    airDrag: 0.2,
    camFollow: 11
  },
  stabilize: {
    strength: 0.3,
    damping: {
      rotational: 0.03,
      vertical: 0.02
    }
  },
  camera: {
    initDistance: -5,
    maxDistance: -7,
    minDistance: -0.7,
    initDirection: 0,
    collisionOff: 0.7
  },
  cameraRay: {
    origin: vec3(),
    hit: null as RayColliderToi | null,
    rayCast: null as THREE.Raycaster | null,
    lerpingPoint: vec3(),
    length: -1,
    dir: vec3(),
    position: vec3()
  },
  options: {
    debug: false,
    controllerType: 'none'
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
  const { rapier, world } = useRapier();
  const { slope, rays, cameraRay } = useContext(ControllerContext);
  const controllerContext = useContext(ControllerContext);

  rays.rayCast = new rapier.Ray(rays.rayOrigin, props.ray!.dir);

  rays.rayHit = world.castRay(
    rays.rayCast,
    props.ray!.length,
    true,
    undefined,
    undefined,
    props.capsuleColliderRef.current as Collider,
    undefined,
    (collider) => !collider.isSensor()
  );
  rays.rayParent = rays.rayHit?.collider.parent();
  slope.rayCast = new rapier.Ray(slope.rayOrigin, props.slopeRay!.rayDir);
  rays.originOffset = props.ray!.originOffset;
  rays.hitForgiveness = props.ray!.hitForgiveness;
  rays.length = props.ray!.length;
  rays.dir = props.ray!.dir;

  cameraRay.rayCast = new THREE.Raycaster(
    cameraRay.origin,
    cameraRay.dir,
    0,
    -props.camera?.maxDistance!
  );

  slope.maxAngle = props.slopeRay!.maxAngle;
  slope.upExtraForce = props.slopeRay!.upExtraForce;
  slope.downExtraForce = props.slopeRay!.downExtraForce;
  slope.rayOriginOffset = props.slopeRay!.rayOriginOffset;
  slope.rayLength = props.slopeRay!.rayLength;
  slope.rayDir = props.slopeRay!.rayDir;

  controllerContext.buoyancy = props.buoyancy!;
  controllerContext.calc = props.calc!;
  controllerContext.capsule = props.capsule!;
  controllerContext.stabilize = props.stabilize!;

  controllerContext.camera = props.camera!;

  // options init
  useOptionInit({ optionProp: props.options });
}

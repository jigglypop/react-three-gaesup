import { useKeyboardControls } from '@react-three/drei';
import { useRapier, vec3 } from '@react-three/rapier';
import { useCallback, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { ControllerInitProps } from '..';
import {
  constantType,
  groundRayType,
  optionsType,
  propType,
  slopeRayType
} from '../type';
import useCameraInit from './camera';
import { colliderAtom } from './collider';
import initDebug from './initDebug';

export default function initProps(props: ControllerInitProps) {
  const { rapier, world } = useRapier();
  const [_, getKeys] = useKeyboardControls();
  const keyControl: {
    [key: string]: boolean;
  } = useCallback(() => {
    return getKeys();
  }, [getKeys])();

  const groundRay: groundRayType = useMemo(() => {
    return {
      origin: vec3(),
      dir: vec3({ x: 0, y: -1, z: 0 }),
      offset: vec3({ x: 0, y: -colliderAtom.init.halfHeight, z: 0 }),
      hit: null,
      parent: null,
      rayCast: null,
      length: colliderAtom.init.radius + 2
    };
  }, []);

  groundRay.rayCast = new rapier.Ray(groundRay.origin, groundRay.dir);
  groundRay.hit = world.castRay(
    groundRay.rayCast,
    groundRay.length,
    true,
    undefined,
    undefined,
    props.capsuleColliderRef.current!,
    undefined
  );
  groundRay.parent = groundRay.hit?.collider.parent();

  const slopeRay: slopeRayType = useMemo(() => {
    return {
      current: vec3(),
      origin: vec3(),
      hit: null,
      rayCast: null,
      dir: vec3({ x: 0, y: -1, z: 0 }),
      offset: vec3({ x: 0, y: 0, z: colliderAtom.init.radius - 0.03 }),
      length: colliderAtom.init.radius + 3,
      angle: 0
    };
  }, []);
  slopeRay.rayCast = new rapier.Ray(slopeRay.origin, slopeRay.dir);

  const jump = useMemo(() => {
    return {
      velocity: vec3(),
      direction: vec3()
    };
  }, []);

  let constant: constantType = useMemo(() => {
    return {
      jumpSpeed: 5,
      jumpAccelY: 5,
      turnSpeed: 10,
      rejectSpeed: 4,
      splintSpeed: 3,
      runRate: 2,
      dT: 10,
      reconsil: 0.3,
      rotational: 0.03,
      vertical: 0.02,
      airDamping: 0.2,
      springConstant: 1.2,
      cameraInitDistance: -5,
      cameraMaxDistance: -7,
      cameraMinDistance: -0.7,
      cameraInitDirection: 0,
      cameraCollisionOff: 0.7,
      cameraDistance: -1,
      cameraCamFollow: 11
    };
  }, []);

  const move = useMemo(() => {
    return {
      impulse: vec3(),
      direction: vec3(),
      accelation: vec3(),
      velocity: vec3(),
      dragForce: vec3(),
      mass: vec3(),
      dragDamping: vec3({
        x: 0.15,
        y: 0.08,
        z: 0.15
      })
    };
  }, []);

  // const current = useMemo(() => {
  //   return {
  //     position: vec3(),
  //     standPosition: vec3(),
  //     velocity: vec3(),
  //     reverseVelocity: vec3(),
  //     quat: quat(),
  //     euler: euler()
  //   };
  // }, []);

  let options: optionsType = useMemo(() => {
    return {
      debug: false,
      controllerType: 'none'
    };
  }, []);

  const cameraRay = useMemo(() => {
    return {
      origin: vec3(),
      hit: new THREE.Raycaster(),
      rayCast: new THREE.Raycaster(vec3(), vec3(), 0, -7),
      lerpingPoint: vec3(),
      dir: vec3(),
      position: vec3(),
      length: -1,
      followCamera: new THREE.Object3D(),
      pivot: new THREE.Object3D(),
      intersetesAndTransParented: [],
      intersects: [],
      intersectObjects: [],
      intersectObjectMap: {}
    };
  }, []);

  const _prop: propType = {
    options,
    slopeRay,
    groundRay,
    jump,
    move,
    // current,
    constant,
    cameraRay,
    capsuleColliderRef: props.capsuleColliderRef,
    rigidBodyRef: props.rigidBodyRef,
    outerGroupRef: props.outerGroupRef,
    slopeRayOriginRef: props.slopeRayOriginRef,
    animations: props.animations,
    keyControl
  };

  useEffect(() => {
    if (props.options) {
      options = {
        ...options,
        ...Object.assign(options, props.options)
      };
    }
    if (props.constant) {
      constant = {
        ...constant,
        ...Object.assign(constant, props.constant)
      };
    }
  }, []);

  const prop = initDebug(_prop);
  useCameraInit(prop);

  return prop;
}

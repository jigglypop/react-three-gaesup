import { Ray, RayColliderToi } from '@dimforge/rapier3d-compat';
import GaeSupProps from '@gaesup/stores/minimap/gaesupProps';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
  useRapier,
  vec3
} from '@react-three/rapier';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

export type rayType = {
  origin: THREE.Vector3;
  hit: RayColliderToi | null;
  parent?: RapierRigidBody | null | undefined;
  rayCast: Ray | null;
  offset: THREE.Vector3;
  dir: THREE.Vector3;
  springDir: THREE.Vector3;
  length: number;
};

export default function FloatingMoved() {
  // Preset
  const floatingPlateRef = useRef<any>();
  const { rapier, world } = useRapier();

  const ray: rayType = useMemo(() => {
    return {
      origin: vec3(),
      dir: vec3({ x: 0, y: -1, z: 0 }),
      offset: vec3(),
      springDir: vec3(),
      hit: null,
      parent: null,
      rayCast: null,
      length: 0.8
    };
  }, []);

  ray.rayCast = new rapier.Ray(ray.origin, ray.dir);
  ray.hit = world.castRay(
    ray.rayCast,
    ray.length,
    true,
    undefined,
    undefined,
    floatingPlateRef.current,
    floatingPlateRef.current
  );
  useEffect(() => {
    // Loack platform 1 rotation
    floatingPlateRef.current.lockRotations(true);
  }, []);

  useFrame(() => {
    // Ray cast for platform 1
    if (floatingPlateRef.current && ray.rayCast) {
      ray.origin = vec3(floatingPlateRef.current.translation());
      ray.hit = world.castRay(
        ray.rayCast,
        ray.length,
        false,
        undefined,
        undefined,
        floatingPlateRef.current,
        floatingPlateRef.current
      );
    }

    if (ray.hit) {
      if (ray.hit.collider.parent()) {
        const floatingForce =
          2.5 * (0.8 - ray.hit.toi) - floatingPlateRef.current.linvel().y * 0.2;
        floatingPlateRef.current.applyImpulse(
          ray.springDir.set(0, floatingForce, 0),
          true
        );
      }
    }
  });

  return (
    <GaeSupProps text='moved'>
      <RigidBody
        position={[5, 10, -5]}
        mass={1}
        colliders={false}
        ref={floatingPlateRef}
      >
        <Text
          scale={0.5}
          color='black'
          maxWidth={10}
          textAlign='center'
          position={[0, 2.5, 0]}
        >
          moved
        </Text>
        <CuboidCollider args={[2.5, 0.1, 2.5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[5, 0.2, 5]} />
          <meshStandardMaterial color={'lightsteelblue'} />
        </mesh>
      </RigidBody>
    </GaeSupProps>
  );
}

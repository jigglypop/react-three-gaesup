import type { RayColliderToi } from '@dimforge/rapier3d-compat';
import GaeSupProps from '@gaesup/stores/minimap/gaesupProps';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CuboidCollider, RigidBody, useRapier } from '@react-three/rapier';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

export default function FloatingPlatform() {
  // Preset
  const floatingPlateRef = useRef<any>();
  const { rapier, world } = useRapier();

  /**
   * Ray setup
   */
  // Platform 1
  const rayLength = 0.8;
  const rayDir = { x: 0, y: -1, z: 0 };
  const springDirVec = useMemo(() => new THREE.Vector3(), []);
  const origin = useMemo(() => new THREE.Vector3(), []);
  const rayCast = new rapier.Ray(origin, rayDir);
  let rayHit: RayColliderToi = null;
  const floatingDis = 0.8;
  const springK = 2.5;
  const dampingC = 0.15;

  useEffect(() => {
    // Loack platform 1 rotation
    floatingPlateRef.current.lockRotations(true);
  }, []);

  useFrame(() => {
    // Ray cast for platform 1
    if (floatingPlateRef.current) {
      origin.set(
        floatingPlateRef.current.translation().x,
        floatingPlateRef.current.translation().y,
        floatingPlateRef.current.translation().z
      );
      rayHit = world.castRay(
        rayCast,
        rayLength,
        false,
        null,
        null,
        floatingPlateRef.current,
        floatingPlateRef.current
      );
    }

    if (rayHit) {
      if (rayHit.collider.parent()) {
        const floatingForce =
          springK * (floatingDis - rayHit.toi) -
          floatingPlateRef.current.linvel().y * dampingC;
        floatingPlateRef.current.applyImpulse(
          springDirVec.set(0, floatingForce, 0),
          true
        );
      }
    }
  });

  return (
    <GaeSupProps text='floating'>
      <RigidBody
        position={[0, 10, -10]}
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
          Floating Platform push to move
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

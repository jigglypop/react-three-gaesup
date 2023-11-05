import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RefObject, useContext } from 'react';
import { ControllerContext } from '../stores/context';
import { RigidBody, vec3 } from '@react-three/rapier';
import { RapierRigidBody } from '@react-three/rapier';
import { statesAtom } from '@gaesup/stores/states';
import { useAtomValue } from 'jotai';

export default function calcBuoyancy({
  rigidBodyRef // standingForcePoint
}: {
  rigidBodyRef: RefObject<RapierRigidBody>;
}) {
  /**
   * Apply buoyancy force
   */
  const { jumps, stand, rays, buoyancy } = useContext(ControllerContext);
  // const { isCanJump } = useAtomValue(statesAtom);

  useFrame(() => {
    if (rays.rayHit !== null && rays.rayParent) {
      // if (isCanJump && rays.rayParent) {
      const buoyancyForce =
        buoyancy.K * (buoyancy.distance - rays.rayHit.toi) -
        rigidBodyRef.current!.linvel().y * buoyancy.damp;
      rigidBodyRef.current!.applyImpulse(
        vec3().set(0, buoyancyForce, 0),
        false
      );
      // Apply opposite force to standing object (gravity g in rapier is 0.11 ?_?)
      jumps.mass.set(0, buoyancyForce > 0 ? -buoyancyForce : 0, 0);
      rays.rayParent.applyImpulseAtPoint(jumps.mass, stand.P, true);
      // }
    }
  });
}

import { buoyancyAtom } from '@gaesup/stores/buoyancy';
import { dampingAtom } from '@gaesup/stores/damping';
import { rayAtom } from '@gaesup/stores/ray/atom';
import { standAtom } from '@gaesup/stores/stand';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, vec3 } from '@react-three/rapier';
import { useAtomValue } from 'jotai';
import { RefObject, useContext } from 'react';
import { ControllerContext } from '../stores/context';

export default function calcBuoyancy({
  rigidBodyRef // standingForcePoint
}: {
  rigidBodyRef: RefObject<RapierRigidBody>;
}) {
  /**
   * Apply buoyancy force
   */
  const { jumps } = useContext(ControllerContext);
  const ray = useAtomValue(rayAtom);
  const damping = useAtomValue(dampingAtom);
  const buoyancy = useAtomValue(buoyancyAtom);
  const stand = useAtomValue(standAtom);
  // const { isCanJump } = useAtomValue(statesAtom);

  useFrame(() => {
    if (ray.rayHit !== null && ray.rayParent) {
      // if (isCanJump && ray.rayParent) {
      const buoyancyForce =
        buoyancy.springConstant * (buoyancy.distance - ray.rayHit.toi) -
        rigidBodyRef.current!.linvel().y * damping.buoyancy;
      rigidBodyRef.current!.applyImpulse(
        vec3().set(0, buoyancyForce, 0),
        false
      );
      // Apply opposite force to standing object (gravity g in rapier is 0.11 ?_?)
      jumps.mass.set(0, buoyancyForce > 0 ? -buoyancyForce : 0, 0);
      ray.rayParent.applyImpulseAtPoint(jumps.mass, stand.position, true);
      // }
    }
  });
}

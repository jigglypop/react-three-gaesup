import { buoyancyAtom } from '@gaesup/stores/buoyancy';
import { dampingAtom } from '@gaesup/stores/damping';
import { jumpAtom } from '@gaesup/stores/jump';
import { rayAtom } from '@gaesup/stores/ray/atom';
import { standAtom } from '@gaesup/stores/stand';
import { statesAtom } from '@gaesup/stores/states';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, vec3 } from '@react-three/rapier';
import { useAtomValue } from 'jotai';
import { RefObject } from 'react';

export default function calcBuoyancy({
  rigidBodyRef // standingForcePoint
}: {
  rigidBodyRef: RefObject<RapierRigidBody>;
}) {
  /**
   * Apply buoyancy force
   */
  const ray = useAtomValue(rayAtom);
  const damping = useAtomValue(dampingAtom);
  const buoyancy = useAtomValue(buoyancyAtom);
  const stand = useAtomValue(standAtom);
  const jump = useAtomValue(jumpAtom);
  const { isOnTheGround } = useAtomValue(statesAtom);

  useFrame(() => {
    if (ray.rayHit !== null && ray.rayParent && isOnTheGround) {
      // if (isCanJump && ray.rayParent) {
      const buoyancyForce =
        buoyancy.springConstant * (buoyancy.distance - ray.rayHit.toi) -
        rigidBodyRef.current!.linvel().y * damping.buoyancy;
      rigidBodyRef.current!.applyImpulse(
        vec3({
          x: 0,
          y: buoyancyForce,
          z: 0
        }),
        false
      );
      // Apply opposite force to standing object (gravity g in rapier is 0.11 ?_?)
      jump.mass.set(0, buoyancyForce > 0 ? -buoyancyForce : 0, 0);
      ray.rayParent.applyImpulseAtPoint(jump.mass, stand.position, true);
      // }
    }
  });
}

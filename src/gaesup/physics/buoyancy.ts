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
   * 부력을 계산합니다. 캐릭터의 현재 속도에 비례하여 아래 방향의 힘을 적용합니다.
   */
  const { jumps, stand, rays, buoyancy } =
    useContext(ControllerContext);
  const { isCanJump } = useAtomValue(statesAtom);

  useFrame(() => {
    if (rays.rayHit !== null) {
      if (isCanJump  && rays.rayParent) {
        const buoyancyForce =
          buoyancy.K * (buoyancy.distance - rays.rayHit.toi) -
          rigidBodyRef.current!.linvel().y * buoyancy.damp;
        rigidBodyRef.current!.applyImpulse(
          vec3().set(0, buoyancyForce, 0),
          false
        );
        // Apply opposite force to standing object (gravity g in rapier is 0.11 ?_?)
        // 부력을 적용한 후, 캐릭터가 서있는 객체에 반대 방향의 힘을 적용합니다.
        jumps.mass.set(0, buoyancyForce > 0 ? -buoyancyForce : 0, 0);
        rays.rayParent.applyImpulseAtPoint(jumps.mass, stand.P, true);
      }
    }
  });
}

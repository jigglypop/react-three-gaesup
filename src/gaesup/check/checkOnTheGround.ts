import { Collider } from '@dimforge/rapier3d-compat';
import { currentAtom } from '@gaesup/stores/current';
import { useFrame } from '@react-three/fiber';
import { useRapier, vec3 } from '@react-three/rapier';
import { useAtomValue } from 'jotai';
import { RefObject, useContext } from 'react';
import { ControllerContext } from '../stores/context';

/**
 * Ray casting detect if on ground
 * 캐릭터가 땅 위에 있는지 감지합니다
 * @param capsuleColliderRef
 */
export default function checkOnTheGround({
  capsuleColliderRef
}: {
  capsuleColliderRef: RefObject<Collider>;
}) {
  const { rays } = useContext(ControllerContext);
  const current = useAtomValue(currentAtom);
  const { world } = useRapier();
  useFrame(() => {
    const { originOffset, hitForgiveness } = rays;
    rays.rayOrigin.addVectors(current.position, vec3(originOffset));
    if (!rays.rayHit || !rays.rayCast || !capsuleColliderRef.current)
      return null;
    rays.rayHit = world.castRay(
      rays.rayCast,
      rays.length,
      true,
      undefined,
      undefined,
      capsuleColliderRef.current
    );
    // if (rays.rayHit && rays.rayHit.toi < buoyancy.distance + hitForgiveness) {
    //   if (slope.rayHit && slope.currentAngle < 1) {
    //     setStates({
    //       ...states,
    //       isCanJump: true
    //     });
    //   }
    // } else {
    //   setStates({
    //     ...states,
    //     isCanJump: false
    //   });
    // }
  });
}

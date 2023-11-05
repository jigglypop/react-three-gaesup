import { Collider } from '@dimforge/rapier3d-compat';
import { currentAtom } from '@gaesup/stores/current';
import { rayAtom } from '@gaesup/stores/ray/atom';
import { useFrame } from '@react-three/fiber';
import { useRapier, vec3 } from '@react-three/rapier';
import { useAtomValue } from 'jotai';
import { RefObject } from 'react';

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
  const ray = useAtomValue(rayAtom);
  const current = useAtomValue(currentAtom);
  const { world } = useRapier();
  useFrame(() => {
    const { originOffset, hitForgiveness } = ray;
    ray.rayOrigin.addVectors(current.position, vec3(originOffset));
    if (!ray.rayHit || !ray.rayCast || !capsuleColliderRef.current) return null;

    ray.rayHit = world.castRay(
      ray.rayCast,
      ray.length,
      true,
      undefined,
      undefined,
      capsuleColliderRef.current
    );
    // if (ray.rayHit && ray.rayHit.toi < buoyancy.distance + hitForgiveness) {
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

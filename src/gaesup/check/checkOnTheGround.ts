import { Collider } from '@dimforge/rapier3d-compat';
import { RefObject, useContext } from 'react';
import { ControllerContext } from '../stores/context';
import { useRapier } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { statesAtom } from '@gaesup/stores/states';
import { useAtom } from 'jotai';

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
  const { slope, rays, buoyancy, cur } = useContext(ControllerContext);
  const [states, setStates] = useAtom(statesAtom);
  const { world } = useRapier();
  useFrame(() => {
    const { originOffset, hitForgiveness } = rays;
    rays.rayOrigin.addVectors(cur.P, originOffset as THREE.Vector3);
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
    if (rays.rayHit && rays.rayHit.toi < buoyancy.distance + hitForgiveness) {
      if (slope.rayHit && slope.currentAngle < 1) {
        setStates({
          ...states,
          isCanJump: true
        });
      }
    } else {
      setStates({
        ...states,
        isCanJump: false
      });
    }
  });
}

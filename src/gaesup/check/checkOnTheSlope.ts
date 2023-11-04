import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRapier, vec3 } from '@react-three/rapier';
import { RefObject, useContext } from 'react';
import { ControllerContext } from '../stores/context';
import { Collider } from '@dimforge/rapier3d-compat';
import { statesAtom } from '@gaesup/stores/states';
import { useAtomValue } from 'jotai';

export default function checkOnTheSlope({
  capsuleColliderRef,
  slopeRayOriginRef
}: {
  capsuleColliderRef: RefObject<Collider>;
  slopeRayOriginRef: RefObject<THREE.Mesh>;
}) {
  const { slope, rays, buoyancy } = useContext(ControllerContext);
  const { isCanJump } = useAtomValue(statesAtom);

  /**
   * Slope ray casting detect if on slope
   * 캐릭터가 경사면 위에 있는지 감지합니다
   */
  const { world } = useRapier();
  useFrame(() => {
    if (
      !slopeRayOriginRef.current ||
      !capsuleColliderRef.current ||
      !slope.rayCast
    )
      return null;
    slopeRayOriginRef.current.getWorldPosition(slope.rayOrigin);
    slope.rayOrigin.y = rays.rayOrigin.y;

    slope.rayHit = world.castRay(
      slope.rayCast,
      slope.rayLength,
      true,
      undefined,
      undefined,
      capsuleColliderRef.current
    );

    // Calculate slope angle
    if (slope.rayHit && rays.rayCast) {
      const castRayNormal = slope.rayHit.collider.castRayAndGetNormal(
        rays.rayCast,
        slope.rayLength,
        false
      );
      if (castRayNormal) slope.currentV3 = vec3(castRayNormal.normal);
    }
    if (
      slope.rayHit &&
      rays.rayHit &&
      slope.rayHit.toi < buoyancy.distance + 0.5
    ) {
      if (isCanJump) {
        // Round the slope angle to 2 decimal places
        slope.angle = Number(
          Math.atan(
            (rays.rayHit.toi - slope.rayHit.toi) / slope.rayOriginOffset
          ).toFixed(2)
        );
      }
    }
  });
}

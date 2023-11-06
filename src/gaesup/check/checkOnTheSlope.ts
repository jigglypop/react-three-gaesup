import { Collider } from '@dimforge/rapier3d-compat';
import { buoyancyAtom } from '@gaesup/stores/buoyancy';
import { rayAtom } from '@gaesup/stores/ray/atom';
import { slopeRayAtom } from '@gaesup/stores/slopRay/atom';
import { useFrame } from '@react-three/fiber';
import { useRapier, vec3 } from '@react-three/rapier';
import { useAtomValue } from 'jotai';
import { RefObject } from 'react';
import * as THREE from 'three';

export default function checkOnTheSlope({
  capsuleColliderRef,
  slopeRayOriginRef
}: {
  capsuleColliderRef: RefObject<Collider>;
  slopeRayOriginRef: RefObject<THREE.Mesh>;
}) {
  // const { buoyancy } = useContext(ControllerContext);
  const buoyancy = useAtomValue(buoyancyAtom);
  const slopeRay = useAtomValue(slopeRayAtom);
  const ray = useAtomValue(rayAtom);
  const { world } = useRapier();
  useFrame(() => {
    if (
      !slopeRayOriginRef.current ||
      !capsuleColliderRef.current ||
      !slopeRay.rayCast
    )
      return null;
    slopeRayOriginRef.current.getWorldPosition(slopeRay.rayOrigin);
    slopeRay.rayOrigin.y = ray.rayOrigin.y;

    slopeRay.rayHit = world.castRay(
      slopeRay.rayCast,
      slopeRay.length,
      true,
      undefined,
      undefined,
      capsuleColliderRef.current
    );

    // Calculate slope angle
    if (slopeRay.rayHit && ray.rayCast) {
      const castRayNormal = slopeRay.rayHit.collider.castRayAndGetNormal(
        ray.rayCast,
        slopeRay.length,
        false
      );
      if (castRayNormal) slopeRay.current = vec3(castRayNormal.normal);
    }
    if (
      slopeRay.rayHit &&
      ray.rayHit &&
      slopeRay.rayHit.toi < buoyancy.distance + 0.5
    ) {
      // if (isCanJump) {
      //   // Round the slope angle to 2 decimal places
      //   slopeRay.angle = Number(
      //     Math.atan(
      //       (ray.rayHit.toi - slopeRay.rayHit.toi) / slopeRay.rayOriginOffset
      //     ).toFixed(2)
      //   );
      // }
      slopeRay.angle = Number(
        Math.atan(
          (ray.rayHit.toi - slopeRay.rayHit.toi) / slopeRay.originOffset.z
        ).toFixed(2)
      );
    }
  });
}

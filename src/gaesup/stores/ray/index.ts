import { RefObject, useEffect } from 'react';

import { Collider } from '@dimforge/rapier3d-compat';
import { useRapier } from '@react-three/rapier';
import { useAtom } from 'jotai';
import { rayAtom } from './atom';
import { rayType } from './type';

export default function useRayInit({
  rayProp,
  capsuleColliderRef
}: {
  rayProp?: rayType;
  capsuleColliderRef: RefObject<Collider>;
}) {
  const { rapier, world } = useRapier();
  const [ray, setRay] = useAtom(rayAtom);
  ray.rayCast = new rapier.Ray(ray.rayOrigin, ray.dir);
  ray.rayHit = world.castRay(
    ray.rayCast,
    ray.length,
    true,
    undefined,
    undefined,
    capsuleColliderRef.current!,
    undefined
  );
  ray.rayParent = ray.rayHit?.collider.parent();

  useEffect(() => {
    if (rayProp) {
      setRay((ray) => ({
        ...ray,
        ...Object.assign(ray, rayProp)
      }));
    }
  }, []);
}

import { RefObject, useEffect } from 'react';

import { Collider } from '@dimforge/rapier3d-compat';
import { useRapier, vec3 } from '@react-three/rapier';
import { useAtom, useAtomValue } from 'jotai';
import { colliderAtom } from '../collider';
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
  const collider = useAtomValue(colliderAtom);
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
    setRay((ray) => ({
      ...ray,
      originOffset: vec3({ x: 0, y: -collider.halfHeight, z: 0 }),
      length: collider.radius + 2
    }));
  }, []);
}

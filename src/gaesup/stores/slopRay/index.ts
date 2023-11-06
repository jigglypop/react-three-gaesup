import { useEffect } from 'react';

import { useRapier, vec3 } from '@react-three/rapier';
import { useAtom, useAtomValue } from 'jotai';
import { colliderAtom } from '../collider';
import { slopeRayAtom } from './atom';
import { slopeRayType } from './type';

export default function useSolpeRayInit({
  slopeRayProp
}: {
  slopeRayProp?: slopeRayType;
}) {
  const { rapier } = useRapier();
  const [slopeRay, setSlopeRay] = useAtom(slopeRayAtom);
  const collider = useAtomValue(colliderAtom);
  slopeRay.rayCast = new rapier.Ray(slopeRay.rayOrigin, slopeRay.dir);
  useEffect(() => {
    if (slopeRayProp) {
      setSlopeRay((slopeRay) => ({
        ...slopeRay,
        ...Object.assign(slopeRay, slopeRayProp)
      }));
    }
    setSlopeRay((ray) => ({
      ...ray,
      originOffset: vec3({ x: 0, y: 0, z: collider.radius - 0.03 }),
      length: collider.radius + 3
    }));
  }, []);
}

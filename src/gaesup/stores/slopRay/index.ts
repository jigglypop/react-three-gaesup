import { useEffect } from 'react';

import { useRapier } from '@react-three/rapier';
import { useAtom } from 'jotai';
import { slopeRayAtom } from './atom';
import { slopeRayType } from './type';

export default function useSolpeRayInit({
  slopeRayProp
}: {
  slopeRayProp?: slopeRayType;
}) {
  const { rapier } = useRapier();
  const [slopeRay, setSlopeRay] = useAtom(slopeRayAtom);
  slopeRay.rayCast = new rapier.Ray(slopeRay.rayOrigin, slopeRay.dir);
  useEffect(() => {
    if (slopeRayProp) {
      setSlopeRay((slopeRay) => ({
        ...slopeRay,
        ...Object.assign(slopeRay, slopeRayProp)
      }));
    }
  }, []);
}

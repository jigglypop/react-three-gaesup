import { atom, useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { colliderAtom } from '../collider';
import { buoyancyType } from './type';

export const buoyancyAtom = atom<buoyancyType>({
  distance: -1,
  springConstant: 1.2
});

buoyancyAtom.debugLabel = 'buoyancy';

export default function useBuoyancyInit({
  buoyancyProp
}: {
  buoyancyProp?: buoyancyType;
}) {
  const [buoyancy, setBuoyancy] = useAtom(buoyancyAtom);
  const collider = useAtomValue(colliderAtom);
  useEffect(() => {
    if (buoyancyProp) {
      setBuoyancy((buoyancy) => ({
        ...buoyancy,
        ...Object.assign(buoyancy, buoyancyProp)
      }));
    }
    setBuoyancy((buoyancy) => ({
      ...buoyancy,
      distance: collider.radius + 0.3
    }));
  }, []);
  return { buoyancy, setBuoyancy };
}

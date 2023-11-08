import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { colliderAtom } from '../collider';

export type dampingType = {
  reconsil: number;
  rotational: number;
  vertical: number;
  air: number;
  dragXZ: number;
  dragY: number;
  distance: number;
  springConstant: number;
};

export const dampingAtom = atom<dampingType>({
  reconsil: 0.3,
  rotational: 0.03,
  vertical: 0.02,
  air: 0.2,
  dragXZ: 0.15,
  dragY: 0.08,
  distance: colliderAtom.init.radius + 0.3,
  springConstant: 1.2
});
dampingAtom.debugLabel = 'damping';

export function useDampingInit({
  dampingProps
}: {
  dampingProps?: dampingType;
}) {
  const [damping, setDamping] = useAtom(dampingAtom);
  useEffect(() => {
    if (dampingProps) {
      setDamping((damping) => ({
        ...damping,
        ...Object.assign(damping, dampingProps)
      }));
    }
  }, []);
  return { damping, setDamping };
}

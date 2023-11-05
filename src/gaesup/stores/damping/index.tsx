import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

export type dampingType = {
  reconsil: number;
  rotational: number;
  vertical: number;
  air: number;
  drag: number;
  buoyancy: number;
};

export const dampingAtom = atom<dampingType>({
  reconsil: 0.3,
  rotational: 0.03,
  vertical: 0.02,
  air: 0.2,
  drag: 0.15,
  buoyancy: 0.08
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

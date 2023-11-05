import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

export type ratioType = {
  // reconsil: number;
  // rotational: number;
  // vertical: number;
  // air: number;
  // drag: number;
  // buoyancy: number;
  run: number;
  runJump: number;
  slopJump: number;
};

export const ratioAtom = atom<ratioType>({
  run: 2,
  runJump: 1.2,
  slopJump: 0.25
});
ratioAtom.debugLabel = 'ratio';

export function useRatioInit({ ratioProps }: { ratioProps?: ratioType }) {
  const [ratio, setRatio] = useAtom(ratioAtom);
  useEffect(() => {
    if (ratioProps) {
      setRatio((ratio) => ({
        ...ratio,
        ...Object.assign(ratio, ratioProps)
      }));
    }
  }, []);
  return { ratio, setRatio };
}

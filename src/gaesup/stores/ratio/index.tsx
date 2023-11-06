import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

export type ratioType = {
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

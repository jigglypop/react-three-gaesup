import { atom, useAtom } from 'jotai';

export type turnProps = {
  accelSpeed: number;
  decelSpeed: number;
};

export const turnAtom = atom<turnProps>({
  accelSpeed: 15,
  decelSpeed: 0.2
});

turnAtom.debugLabel = 'turn';

export default function useTurnInit() {
  const [turn, setStand] = useAtom(turnAtom);
  return {
    turn,
    setStand
  };
}

import { atom, useAtom } from 'jotai';

export type statesType = {
  isMoving: boolean;
  isNotMoving: boolean;
  isOnTheGround: boolean;
  isOnMoving: boolean;
};

export const statesAtom = atom<statesType>({
  isMoving: false,
  isNotMoving: false,
  isOnTheGround: false,
  isOnMoving: false
});
statesAtom.debugLabel = 'states';

export default function useStates() {
  const [states, setStates] = useAtom(statesAtom);

  return {
    states,
    setStates
  };
}

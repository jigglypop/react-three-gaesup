import { atom, useAtom } from 'jotai';

export const statesAtom = atom({
  isMoving: false,
  isNotMoving: false,
  isCanJump: false,
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

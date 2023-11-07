import { useKeyboardControls } from '@react-three/drei';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { statesAtom } from '../states';

export default function useControlEffect() {
  const [_, getKeys] = useKeyboardControls();
  const [states, setStates] = useAtom(statesAtom);
  const keyControl = getKeys();

  useEffect(() => {
    const { forward, backward, leftward, rightward } = keyControl;
    setStates((states) => ({
      ...states,
      isMoving: forward || backward || leftward || rightward,
      isNotMoving: !forward && !backward && !leftward && !rightward
    }));
  }, [keyControl]);
}

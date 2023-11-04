import { useEffect } from 'react';
import { useKeyboardControls } from '@react-three/drei';
import { useAtom, useAtomValue } from 'jotai';
import { optionAtom } from '../options';
import { statesAtom } from '../states';

export default function useControlEffect() {
  const [_, getKeys] = useKeyboardControls();
  const options = useAtomValue(optionAtom);
  const [states, setStates] = useAtom(statesAtom);
  const keyControl = getKeys();

  useEffect(() => {
    const { forward, backward, leftward, rightward } = keyControl;
    setStates({
      ...states,
      isMoving: forward || backward || leftward || rightward,
      isNotMoving: !forward && !backward && !leftward && !rightward
    });
  }, [keyControl]);
}

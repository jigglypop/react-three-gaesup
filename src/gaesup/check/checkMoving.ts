import { statesAtom } from '@gaesup/stores/states';
import { useKeyboardControls } from '@react-three/drei';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

export default function checkMoving() {
  const [_, getKeys] = useKeyboardControls();
  const setStates = useSetAtom(statesAtom);
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

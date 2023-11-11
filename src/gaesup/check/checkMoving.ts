import { statesAtom } from '@gaesup/stores/states';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useAtomValue } from 'jotai';

export default function checkMoving() {
  const [_, getKeys] = useKeyboardControls();
  const states = useAtomValue(statesAtom);
  const keyControl = getKeys();

  useFrame(() => {
    const { forward, backward, leftward, rightward } = keyControl;
    states.isMoving = forward || backward || leftward || rightward;
    states.isNotMoving = !states.isMoving;
  });
}

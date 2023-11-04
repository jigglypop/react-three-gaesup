import { useFrame } from '@react-three/fiber';
import { useContext, useState } from 'react';
import { ControllerContext } from './context';
import { useKeyboardControls } from '@react-three/drei';
import { atom, useAtom, useAtomValue } from 'jotai';
import { optionAtom } from './options';
import { keyAtom } from './control';
import { statesAtom } from './states';

export default function useControlInit() {
  const [_, getKeys] = useKeyboardControls();
  const controller = useContext(ControllerContext);
  const key = useAtomValue(keyAtom);
  const options = useAtomValue(optionAtom);
  const [states, setStates] = useAtom(statesAtom);
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    leftward: false,
    rightward: false,
    jump: false,
    run: false
  });

  useFrame(() => {
    if (options.controllerType === 'none') {
      const noneKey = getKeys();
      setKeys({
        forward: noneKey.forward,
        backward: noneKey.backward,
        leftward: noneKey.leftward,
        rightward: noneKey.rightward,
        jump: noneKey.jump,
        run: noneKey.run
      });
    } else {
      const otherKey = key;
      setKeys({
        forward: otherKey.forward,
        backward: otherKey.backward,
        leftward: otherKey.leftward,
        rightward: otherKey.rightward,
        jump: otherKey.jump,
        run: otherKey.run
      });
    }

    const { forward, backward, leftward, rightward, jump, run } = keys;
    controller.control.f = forward;
    controller.control.b = backward;
    controller.control.l = leftward;
    controller.control.r = rightward;
    controller.control.jump = jump;
    controller.control.run = run;
    setStates({
      ...states,
      isMoving: forward || backward || leftward || rightward,
      isNotMoving: !forward && !backward && !leftward && !rightward
    })
    // controller.control.isMoving = forward || backward || leftward || rightward;
    // controller.control.isNotMoving =
    //   !forward && !backward && !leftward && !rightward;
  });
}

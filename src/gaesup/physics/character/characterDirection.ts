// import { currentCameraAtom } from '@gaesup/stores/camera/atom';
import useCalcControl from '@gaesup/stores/control';
import { currentAtom } from '@gaesup/stores/current';
import { joyStickOriginAtom } from '@gaesup/stores/joystick';
import { propType } from '@gaesup/type';
import { V3 } from '@gaesup/utils/vector';
import { useFrame } from '@react-three/fiber';
import { useAtomValue } from 'jotai';

export default function characterDirection(prop: propType) {
  const { rigidBodyRef, options, move } = prop;
  const current = useAtomValue(currentAtom);
  const joystick = useAtomValue(joyStickOriginAtom);
  const { leftward, rightward } = useCalcControl(prop);
  const { controllerType } = options;
  useFrame(() => {
    if (!rigidBodyRef || !rigidBodyRef.current) return null;
    if (
      controllerType === 'none' ||
      controllerType === 'gameboy' ||
      controllerType === 'keyboard'
    ) {
      current.euler.y +=
        ((Number(leftward) - Number(rightward)) * Math.PI) / 32;
    } else if (controllerType === 'joystick') {
      current.euler.y = -joystick.angle - Math.PI / 2;
      move.direction = V3(
        -Math.sin(current.euler.y),
        0,
        -Math.cos(current.euler.y)
      );
    }
    current.dir = V3(
      Math.sin(current.euler.y),
      0,
      Math.cos(current.euler.y)
    ).normalize();
  });
}

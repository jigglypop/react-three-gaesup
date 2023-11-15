// import { currentCameraAtom } from '@gaesup/stores/camera/atom';
import { currentAtom } from '@gaesup/stores/current';
import { joyStickOriginAtom } from '@gaesup/stores/joystick';
import { propType } from '@gaesup/type';
import { useFrame } from '@react-three/fiber';
import { useAtomValue } from 'jotai';

export default function calcDirection(prop: propType) {
  const { rigidBodyRef, keyControl, options, cameraRay } = prop;
  const current = useAtomValue(currentAtom);
  const joystick = useAtomValue(joyStickOriginAtom);
  const { forward, backward, leftward, rightward } = keyControl;
  const { controllerType } = options;
  useFrame(() => {
    if (!rigidBodyRef || !rigidBodyRef.current) return null;
    if (controllerType === 'none' || controllerType === 'gameboy') {
      if (forward) {
        current.euler.y =
          cameraRay.pivot.rotation.y +
          (leftward ? Math.PI / 4 : 0) -
          (rightward ? Math.PI / 4 : 0);
      } else if (backward) {
        current.euler.y =
          cameraRay.pivot.rotation.y +
          Math.PI -
          (leftward ? Math.PI / 4 : 0) +
          (rightward ? Math.PI / 4 : 0);
      } else if (leftward) {
        current.euler.y = cameraRay.pivot.rotation.y + Math.PI / 2;
      } else if (rightward) {
        current.euler.y = cameraRay.pivot.rotation.y - Math.PI / 2;
      }
    } else if (controllerType === 'joystick') {
      current.euler.y = -joystick.angle - Math.PI / 2;
    }
  });
}

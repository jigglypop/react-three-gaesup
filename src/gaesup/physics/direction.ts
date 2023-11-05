import { currentCameraAtom } from '@gaesup/stores/camera/atom';
import { currentAtom } from '@gaesup/stores/current';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, vec3 } from '@react-three/rapier';
import { useAtomValue } from 'jotai';
import { RefObject } from 'react';

export default function calcDirection({
  rigidBodyRef
}: {
  rigidBodyRef: RefObject<RapierRigidBody>;
}) {
  const [_, getKeys] = useKeyboardControls();
  const currentCamera = useAtomValue(currentCameraAtom);
  const current = useAtomValue(currentAtom);
  const { forward, backward, leftward, rightward } = getKeys();
  useFrame(() => {
    if (!rigidBodyRef || !rigidBodyRef.current) return null;
    current.position = vec3(rigidBodyRef.current.translation());
    current.velocity = vec3(rigidBodyRef.current.linvel());
    if (forward) {
      current.euler.y =
        currentCamera.pivot.rotation.y +
        (leftward ? Math.PI / 4 : 0) -
        (rightward ? Math.PI / 4 : 0);
    } else if (backward) {
      current.euler.y =
        currentCamera.pivot.rotation.y +
        Math.PI -
        (leftward ? Math.PI / 4 : 0) +
        (rightward ? Math.PI / 4 : 0);
    } else if (leftward) {
      current.euler.y = currentCamera.pivot.rotation.y + Math.PI / 2;
    } else if (rightward) {
      current.euler.y = currentCamera.pivot.rotation.y - Math.PI / 2;
    }
  });
}

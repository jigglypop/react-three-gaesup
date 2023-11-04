import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, vec3 } from '@react-three/rapier';
import { RefObject, useContext } from 'react';
import { ControllerContext } from '../stores/context';
import { Object3D, Object3DEventMap } from 'three';
import { useKeyboardControls } from '@react-three/drei';

export default function calcDirection({
  rigidBodyRef,
  pivot
}: {
  rigidBodyRef: RefObject<RapierRigidBody>;
  pivot: Object3D<Object3DEventMap>;
}) {
  const { model, cur } = useContext(ControllerContext);
  const [_, getKeys] = useKeyboardControls();
  const { forward, backward, leftward, rightward } = getKeys();

  // const { origin } = useAtomValue(JoyStickAtom);
  useFrame(() => {
    if (!rigidBodyRef || !rigidBodyRef.current) return null;
    cur.P = vec3(rigidBodyRef.current.translation());
    cur.V = vec3(rigidBodyRef.current.linvel());
    // model.euler.y = -origin.angle - Math.PI / 2;
    // console.log(model.euler.y);

    // 이동 방향을 가져옵니다
    const { euler } = model;
    if (forward) {
      euler.y =
        pivot.rotation.y +
        (leftward ? Math.PI / 4 : 0) -
        (rightward ? Math.PI / 4 : 0);
    } else if (backward) {
      euler.y =
        pivot.rotation.y +
        Math.PI -
        (leftward ? Math.PI / 4 : 0) +
        (rightward ? Math.PI / 4 : 0);
    } else if (leftward) {
      euler.y = pivot.rotation.y + Math.PI / 2;
    } else if (rightward) {
      euler.y = pivot.rotation.y - Math.PI / 2;
    }
  });
}

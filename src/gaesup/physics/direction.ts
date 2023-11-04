import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, vec3 } from '@react-three/rapier';
import { RefObject, useContext } from 'react';
import { ControllerContext } from '../stores/context';
import { Object3D, Object3DEventMap } from 'three';
import { JoyStickAtom } from '@gaesup/stores/joystick';
import { useAtomValue } from 'jotai';
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
  // const { origin } = useAtomValue(JoyStickAtom);
  useFrame(() => {
    if (!rigidBodyRef || !rigidBodyRef.current) return null;
    cur.P = vec3(rigidBodyRef.current.translation());
    cur.V = vec3(rigidBodyRef.current.linvel());
    // model.euler.y = -origin.angle - Math.PI / 2;
    // console.log(model.euler.y);

    const { f, b, l, r } = control;
    // 이동 방향을 가져옵니다
    const { euler } = model;
    if (f) {
      euler.y =
        pivot.rotation.y + (l ? Math.PI / 4 : 0) - (r ? Math.PI / 4 : 0);
    } else if (b) {
      euler.y =
        pivot.rotation.y +
        Math.PI -
        (l ? Math.PI / 4 : 0) +
        (r ? Math.PI / 4 : 0);
    } else if (l) {
      euler.y = pivot.rotation.y + Math.PI / 2;
    } else if (r) {
      euler.y = pivot.rotation.y - Math.PI / 2;
    }
  });
}

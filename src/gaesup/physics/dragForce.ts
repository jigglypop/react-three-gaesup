import { RapierRigidBody, vec3 } from '@react-three/rapier';
import { RefObject, useContext } from 'react';
import { useFrame } from '@react-three/fiber';
import { ControllerContext } from '../stores/context';
import { useAtomValue } from 'jotai';
import { statesAtom } from '@gaesup/stores/states';

export type calcDragForceType = {
  rigidBodyRef: RefObject<RapierRigidBody>;
};

export default function calcDragForce({ rigidBodyRef }: calcDragForceType) {
  /**
   * Apply drag force
   * 항력을 계산합니다
   */
  const { cur, move, calc } = useContext(ControllerContext);
  const { isMoving, isOnMoving } = useAtomValue(statesAtom);

  useFrame(() => {
    if (!rigidBodyRef || !rigidBodyRef.current) return null;

    if (!isMoving) {
      // not or on a moving object
      /**
       * 정지 상태, 이동 상태에서 항력 적용
       * 이동 상태의 물체에 있을 시 반대 항력 추가
       */
      const forwardF = (xz: 'x' | 'z', isOnMoving: boolean) =>
        move.V[xz] * calc.dragDamp * (isOnMoving ? 0 : 1);
      const reverseF = (xz: 'x' | 'z') => -cur.V[xz] * calc.dragDamp;
      rigidBodyRef.current.applyImpulse(
        vec3().set(
          forwardF('x', isOnMoving) + reverseF('x'),
          0,
          forwardF('x', isOnMoving) + reverseF('z')
        ),
        false
      );
    }
  });
}

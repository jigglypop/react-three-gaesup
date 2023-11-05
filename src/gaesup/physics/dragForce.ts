import { currentAtom } from '@gaesup/stores/current';
import { statesAtom } from '@gaesup/stores/states';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, vec3 } from '@react-three/rapier';
import { useAtomValue } from 'jotai';
import { RefObject, useContext } from 'react';
import { ControllerContext } from '../stores/context';

export type calcDragForceType = {
  rigidBodyRef: RefObject<RapierRigidBody>;
};

export default function calcDragForce({ rigidBodyRef }: calcDragForceType) {
  /**
   * Apply drag force
   * 항력을 계산합니다
   */
  const { move, calc } = useContext(ControllerContext);
  const { isMoving, isOnMoving } = useAtomValue(statesAtom);
  const current = useAtomValue(currentAtom);

  useFrame(() => {
    if (!rigidBodyRef || !rigidBodyRef.current) return null;

    if (!isMoving) {
      // not or on a moving object
      const forwardF = (xz: 'x' | 'z', isOnMoving: boolean) =>
        move.V[xz] * calc.dragDamp * (isOnMoving ? 0 : 1);
      const reverseF = (xz: 'x' | 'z') => -current.velocity[xz] * calc.dragDamp;
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

import { currentAtom } from '@gaesup/stores/current';
import { dampingAtom } from '@gaesup/stores/damping';
import { moveAtom } from '@gaesup/stores/move';
import { statesAtom } from '@gaesup/stores/states';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, vec3 } from '@react-three/rapier';
import { useAtomValue } from 'jotai';
import { RefObject } from 'react';

export type calcDragForceType = {
  rigidBodyRef: RefObject<RapierRigidBody>;
};

export default function calcDragForce({ rigidBodyRef }: calcDragForceType) {
  /**
   * Apply drag force
   * 항력을 계산합니다
   */
  const { isNotMoving, isOnMoving, isOnTheGround } = useAtomValue(statesAtom);
  const current = useAtomValue(currentAtom);
  const damping = useAtomValue(dampingAtom);
  const move = useAtomValue(moveAtom);

  useFrame(() => {
    if (!rigidBodyRef || !rigidBodyRef.current) return null;
    if (isNotMoving && isOnTheGround) {
      // not or on a moving object
      const forwardF = (xz: 'x' | 'z') =>
        isOnMoving ? move.velocity[xz] * damping.drag : 0;
      const reverseF = (xz: 'x' | 'z') => current.velocity[xz] * damping.drag;
      rigidBodyRef.current.applyImpulse(
        vec3().set(
          forwardF('x') - reverseF('x'),
          0,
          forwardF('z') - reverseF('z')
        ),
        false
      );
    }
  });
}

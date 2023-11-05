import { currentAtom } from '@gaesup/stores/current';
import { statesAtom } from '@gaesup/stores/states';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, vec3 } from '@react-three/rapier';
import { useAtomValue } from 'jotai';
import { RefObject, useContext } from 'react';
import { ControllerContext } from '../stores/context';

export default function checkTurn({
  outerGroupRef,
  rigidBodyRef
}: {
  rigidBodyRef: RefObject<RapierRigidBody>;
  outerGroupRef: RefObject<THREE.Group>;
}) {
  const { move, calc, slope } = useContext(ControllerContext);
  const { isMoving } = useAtomValue(statesAtom);
  const current = useAtomValue(currentAtom);
  const [_, getKeys] = useKeyboardControls();
  const { run, jump } = getKeys();
  useFrame(() => {
    if (isMoving) {
      if (
        // maxAngle = 1
        slope.currentAngle < 1 &&
        0.2 < Math.abs(slope.angle) &&
        Math.abs(slope.angle) < 1
      ) {
        move.Di.set(0, Math.sin(slope.angle), Math.cos(slope.angle));
      } else if (slope.currentAngle >= 1) {
        move.Di.set(
          0,
          Math.sin(slope.angle) > 0 ? 0 : Math.sin(slope.angle),
          Math.sin(slope.angle) > 0 ? 0.1 : 1
        );
      } else {
        move.Di.set(0, 0, 1);
      }
      const moveF = move.A.multiplyScalar(rigidBodyRef.current!.mass());
      const isRotated =
        Math.sin(outerGroupRef.current!.rotation.y).toFixed(3) ===
        Math.sin(current.euler.y).toFixed(3);

      const impulseY = () => {
        if (slope.angle === 0) {
          return 0;
        } else {
          const { runR, turnV } = calc;
          const runDelta = run ? runR : 1;
          const { upExtraForce, downExtraForce } = slope;
          const upDownDelta = move.Di.y > 0 ? upExtraForce : downExtraForce;
          return move.Di.y * turnV * runDelta * upDownDelta;
        }
      };
      const impulseXZRotated = (isRotated: boolean, xz: 'x' | 'z') => {
        const { turnV, airDrag } = calc;
        if (isRotated) {
          return moveF[xz];
        } else {
          return moveF[xz] * turnV;
        }
      };
      // 세팅
      move.impulse.set(
        impulseXZRotated(isRotated, 'x'),
        impulseY(),
        impulseXZRotated(isRotated, 'z')
      );

      // Move character at proper direction and impulse
      if (rigidBodyRef.current)
        rigidBodyRef.current.applyImpulseAtPoint(
          move.impulse,
          vec3()
            .copy(current.position)
            .setY(current.position.y + move.deltaY),
          false
        );
    }
  });
}

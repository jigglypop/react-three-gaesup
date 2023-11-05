import { currentAtom } from '@gaesup/stores/current';
import { dampingAtom } from '@gaesup/stores/damping';
import { ratioAtom } from '@gaesup/stores/ratio';
import { slopeRayAtom } from '@gaesup/stores/slopRay/atom';
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
  const { move, calc } = useContext(ControllerContext);
  const slopeRay = useAtomValue(slopeRayAtom);
  const { isMoving } = useAtomValue(statesAtom);
  const current = useAtomValue(currentAtom);
  const [_, getKeys] = useKeyboardControls();
  const { run, jump } = getKeys();
  const damping = useAtomValue(dampingAtom);
  const ratio = useAtomValue(ratioAtom);

  useFrame(() => {
    if (isMoving) {
      if (
        // maxAngle = 1
        slopeRay.currentAngle < 1 &&
        0.2 < Math.abs(slopeRay.angle) &&
        Math.abs(slopeRay.angle) < 1
      ) {
        move.Di.set(0, Math.sin(slopeRay.angle), Math.cos(slopeRay.angle));
      } else if (slopeRay.currentAngle >= 1) {
        move.Di.set(
          0,
          Math.sin(slopeRay.angle) > 0 ? 0 : Math.sin(slopeRay.angle),
          Math.sin(slopeRay.angle) > 0 ? 0.1 : 1
        );
      } else {
        move.Di.set(0, 0, 1);
      }
      const moveF = move.A.multiplyScalar(rigidBodyRef.current!.mass());
      const isRotated =
        Math.sin(outerGroupRef.current!.rotation.y).toFixed(3) ===
        Math.sin(current.euler.y).toFixed(3);

      const impulseY = () => {
        if (slopeRay.angle === 0) {
          return 0;
        } else {
          const { turnV } = calc;
          const runDelta = run ? ratio.run : 1;
          const { upExtraForce, downExtraForce } = slopeRay;
          const upDownDelta = move.Di.y > 0 ? upExtraForce : downExtraForce;
          return move.Di.y * turnV * runDelta * upDownDelta;
        }
      };
      const impulseXZRotated = (isRotated: boolean, xz: 'x' | 'z') => {
        const { turnV } = calc;
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

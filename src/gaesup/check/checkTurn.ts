import { currentAtom } from '@gaesup/stores/current';
import { moveAtom } from '@gaesup/stores/move';
import { ratioAtom } from '@gaesup/stores/ratio';
import { slopeRayAtom } from '@gaesup/stores/slopRay/atom';
import { statesAtom } from '@gaesup/stores/states';
import { turnAtom } from '@gaesup/stores/turn';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, vec3 } from '@react-three/rapier';
import { useAtomValue } from 'jotai';
import { RefObject } from 'react';

export default function checkTurn({
  outerGroupRef,
  rigidBodyRef
}: {
  rigidBodyRef: RefObject<RapierRigidBody>;
  outerGroupRef: RefObject<THREE.Group>;
}) {
  const slopeRay = useAtomValue(slopeRayAtom);
  const { isMoving } = useAtomValue(statesAtom);
  const current = useAtomValue(currentAtom);
  const [_, getKeys] = useKeyboardControls();
  const { run, jump } = getKeys();
  const ratio = useAtomValue(ratioAtom);
  const turn = useAtomValue(turnAtom);
  const move = useAtomValue(moveAtom);

  useFrame(() => {
    if (isMoving) {
      if (
        // maxAngle = 1
        slopeRay.currentAngle < 1 &&
        0.2 < Math.abs(slopeRay.angle) &&
        Math.abs(slopeRay.angle) < 1
      ) {
        move.direction.set(
          0,
          Math.sin(slopeRay.angle),
          Math.cos(slopeRay.angle)
        );
      } else if (slopeRay.currentAngle >= 1) {
        move.direction.set(
          0,
          Math.sin(slopeRay.angle) > 0 ? 0 : Math.sin(slopeRay.angle),
          Math.sin(slopeRay.angle) > 0 ? 0.1 : 1
        );
      } else {
        move.direction.set(0, 0, 1);
      }
      const moveF = move.accelation.multiplyScalar(
        rigidBodyRef.current!.mass()
      );
      const isRotated =
        Math.sin(outerGroupRef.current!.rotation.y).toFixed(3) ===
        Math.sin(current.euler.y).toFixed(3);

      const impulseY = () => {
        if (slopeRay.angle === 0) {
          return 0;
        } else {
          const runDelta = run ? ratio.run : 1;
          const { upExtraForce, downExtraForce } = slopeRay;
          const upDownDelta =
            move.direction.y > 0 ? upExtraForce : downExtraForce;
          return move.direction.y * turn.decelSpeed * runDelta * upDownDelta;
        }
      };
      const impulseXZRotated = (isRotated: boolean, xz: 'x' | 'z') => {
        if (isRotated) {
          return moveF[xz];
        } else {
          return moveF[xz] * turn.decelSpeed;
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
            .setY(current.position.y + move.delta.y),
          false
        );
    }
  });
}

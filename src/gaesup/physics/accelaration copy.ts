import { RefObject } from 'react';

import { currentAtom } from '@gaesup/stores/current';
import { jumpAtom } from '@gaesup/stores/jump';
import { moveAtom } from '@gaesup/stores/move';
import { ratioAtom } from '@gaesup/stores/ratio';
import { statesAtom } from '@gaesup/stores/states';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { vec3 } from '@react-three/rapier';
import { useAtomValue } from 'jotai';

export default function calcAccelaration({
  outerGroupRef
}: {
  outerGroupRef: RefObject<THREE.Group>;
}) {
  const { isMoving } = useAtomValue(statesAtom);
  const current = useAtomValue(currentAtom);
  const ratio = useAtomValue(ratioAtom);
  const [_, getKeys] = useKeyboardControls();
  const { run } = getKeys();
  const move = useAtomValue(moveAtom);
  const jump = useAtomValue(jumpAtom);

  useFrame(() => {
    //     if (!outerGroupRef || !outerGroupRef.current || !isMoving) return null;
    //     const { direction: di, velocity: mV, dT } = move;
    //     const { velocity: cV, reverseVelocity: rV } = current;
    //
    //     di.applyQuaternion(outerGroupRef.current.quaternion);
    //     // move.VinDi.copy(mV).projectOnVector(di).multiply(di);
    //     // projection of velocity on direction
    //     const pV = mV.clone().projectOnVector(di).multiply(di);
    //     const angle = mV.angleTo(di);
    //     const mR = move.walkSpeed * (run ? ratio.run : 1);
    //     const rR = isMoving ? 0 : move.rejectSpeed;
    //     const runVelocity = pV.addScalar(mR).multiply(di);
    //     const reverseVelocity = rV.multiplyScalar(isMoving ? 0 : move.rejectSpeed);
    //     const moveVelocity = mV.multiplyScalar(Math.sin(angle));
    //     const currentVelocity = cV;
    //
    //     const moveAXZ = (xz: 'x' | 'z') => {
    //       return (
    //         (di[xz] * mR +
    //           di[xz] * pV[xz] -
    //           (cV[xz] - mV[xz] * Math.sin(angle) + rV[xz] * rR)) /
    //         dT
    //       );
    //     };
    //
    //     move.accelation.set(moveAXZ('x'), 0, moveAXZ('z'));

    if (!outerGroupRef || !outerGroupRef.current || !isMoving) return null;
    const { direction, velocity: movingV, dT } = move;
    const { velocity: currentV, reverseVelocity: reverseV } = current;

    direction.applyQuaternion(outerGroupRef.current.quaternion);
    // move.VinDi.copy(mV).projectOnVector(di).multiply(di);
    // projection of velocity on direction
    const projectedV = movingV
      .clone()
      .projectOnVector(direction)
      .multiply(direction);
    const wantVelocity = vec3({ x: 1, y: 0, z: 0 }).multiplyScalar(
      currentV.dot(direction)
    );
    const angle = movingV.angleTo(direction);
    const runRatio = move.walkSpeed * (run ? ratio.run : 1);
    const reverseRatio = isMoving ? 0 : move.rejectSpeed;
    // 1. movingV
    const runV = projectedV.addScalar(runRatio).multiply(direction);
    // 2. -current
    // 3. +reverse
    const moveAngleV = movingV.multiplyScalar(Math.sin(angle));
    // 4. -reverse
    const rejectV = reverseV.multiplyScalar(reverseRatio);

    // const moveAXZ = (xz: 'x' | 'z') => {
    //   return (
    //     (di[xz] * moveRatio +
    //       di[xz] * pV[xz] -
    //       cV[xz] -
    //       mV[xz] * Math.sin(angle) +
    //       rV[xz] * reverseRatio) /
    //     dT
    //   );
    // };

    move.accelation
      .set(0, 0, 0)
      .add(runV)
      .sub(currentV)
      .add(moveAngleV)
      .sub(rejectV)
      .multiply(vec3().set(1, 0, 1));
  });
}

import { RefObject } from 'react';

import { currentAtom } from '@gaesup/stores/current';
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

  useFrame(() => {
    if (!outerGroupRef || !outerGroupRef.current || !isMoving) return null;
    const { direction, velocity: movingV, dT } = move;
    const { velocity: currentV, reverseVelocity: reverseV } = current;

    direction.applyQuaternion(outerGroupRef.current.quaternion);
    // projection of velocity on direction
    const projectedV = movingV
      .clone()
      .projectOnVector(direction)
      .multiply(direction);
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
    // 5 / dT
    const DT = vec3().set(1 / dT, 0, 1 / dT);
    move.accelation
      .copy(runV)
      .sub(currentV)
      .add(moveAngleV)
      .sub(rejectV)
      .multiply(DT);
  });
}

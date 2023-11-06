import { RefObject } from 'react';

import { currentAtom } from '@gaesup/stores/current';
import { jumpAtom } from '@gaesup/stores/jump';
import { moveAtom } from '@gaesup/stores/move';
import { ratioAtom } from '@gaesup/stores/ratio';
import { statesAtom } from '@gaesup/stores/states';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useAtomValue } from 'jotai';

export default function calcAccelaration({
  outerGroupRef
}: {
  outerGroupRef: RefObject<THREE.Group>;
}) {
  // const { move, calc } = useContext(ControllerContext);
  const { isMoving, isOnMoving } = useAtomValue(statesAtom);
  const current = useAtomValue(currentAtom);
  const ratio = useAtomValue(ratioAtom);
  const [_, getKeys] = useKeyboardControls();
  const { run } = getKeys();
  const move = useAtomValue(moveAtom);
  const jump = useAtomValue(jumpAtom);

  useFrame(() => {
    if (!outerGroupRef || !outerGroupRef.current || !isMoving) return null;
    move.direction.applyQuaternion(outerGroupRef.current.quaternion);
    move.VinDi.copy(move.velocity)
      .projectOnVector(move.direction)
      .multiply(move.direction);

    const angleBetween = move.velocity.angleTo(move.direction);
    const sinAngleBetween = Math.sin(angleBetween);
    const maxVelocity = jump.maxSpeed * (run ? ratio.run : 1);
    const rejectRatio = isOnMoving ? 0 : jump.rejectSpeed;

    const moveAXZ = (tag: 'x' | 'z') => {
      return (
        (move.direction[tag] * (maxVelocity + move.VinDi[tag]) -
          (current.velocity[tag] -
            move.velocity[tag] * sinAngleBetween +
            current.reverseVelocity[tag] * rejectRatio)) /
        move.accelTimeDirection
      );
    };

    move.accelation.set(moveAXZ('x'), 0, moveAXZ('z'));
  });
}

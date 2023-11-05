import { RefObject, useContext } from 'react';

import { currentAtom } from '@gaesup/stores/current';
import { ratioAtom } from '@gaesup/stores/ratio';
import { statesAtom } from '@gaesup/stores/states';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useAtomValue } from 'jotai';
import { ControllerContext } from '../stores/context';

export default function calcAccelaration({
  outerGroupRef
}: {
  outerGroupRef: RefObject<THREE.Group>;
}) {
  const { move, calc } = useContext(ControllerContext);
  const { isMoving, isOnMoving } = useAtomValue(statesAtom);
  const current = useAtomValue(currentAtom);
  const ratio = useAtomValue(ratioAtom);
  const [_, getKeys] = useKeyboardControls();
  const { run } = getKeys();

  useFrame(() => {
    if (!outerGroupRef || !outerGroupRef.current || !isMoving) return null;
    move.Di.applyQuaternion(outerGroupRef.current.quaternion);
    move.VinDi.copy(move.V).projectOnVector(move.Di).multiply(move.Di);

    const angleBetween = move.V.angleTo(move.Di);
    const sinAngleBetween = Math.sin(angleBetween);
    const maxVelocity = calc.maxV * (run ? ratio.run : 1);
    const rejectRatio = isOnMoving ? 0 : calc.rejectV;

    const moveAXZ = (tag: 'x' | 'z') => {
      return (
        (move.Di[tag] * (maxVelocity + move.VinDi[tag]) -
          (current.velocity[tag] -
            move.V[tag] * sinAngleBetween +
            current.reverseVelocity[tag] * rejectRatio)) /
        calc.ATimeD
      );
    };

    move.A.set(moveAXZ('x'), 0, moveAXZ('z'));
  });
}

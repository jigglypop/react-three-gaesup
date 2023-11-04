import { RefObject, useContext } from 'react';

import { useFrame } from '@react-three/fiber';
import { ControllerContext } from '../stores/context';
import states, { statesAtom } from '@gaesup/stores/states';
import { useAtomValue } from 'jotai';
import { useKeyboardControls } from '@react-three/drei';

export default function calcAccelaration({
  outerGroupRef
}: {
  outerGroupRef: RefObject<THREE.Group>;
}) {
  const { cur, move, calc } = useContext(ControllerContext);
  const { isMoving, isOnMoving } = useAtomValue(statesAtom);
  const [_, getKeys] = useKeyboardControls();
  const { run } = getKeys();

  useFrame(() => {
    if (!outerGroupRef || !outerGroupRef.current || !isMoving) return null;
    move.Di.applyQuaternion(outerGroupRef.current.quaternion);
    move.VinDi.copy(move.V).projectOnVector(move.Di).multiply(move.Di);

    const angleBetween = move.V.angleTo(move.Di);
    const sinAngleBetween = Math.sin(angleBetween);
    const maxVelocity = calc.maxV * (run ? calc.runR : 1);
    const rejectRatio = isOnMoving ? 0 : calc.rejectV;

    const moveAXZ = (tag: 'x' | 'z') => {
      return (
        (move.Di[tag] * (maxVelocity + move.VinDi[tag]) -
          (cur.V[tag] -
            move.V[tag] * sinAngleBetween +
            cur.rejectV[tag] * rejectRatio)) /
        calc.ATimeD
      );
    };

    move.A.set(moveAXZ('x'), 0, moveAXZ('z'));
  });
}

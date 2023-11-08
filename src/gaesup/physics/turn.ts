import { currentAtom } from '@gaesup/stores/current';
import { moveAtom } from '@gaesup/stores/move';
import { useFrame } from '@react-three/fiber';
import { useAtomValue } from 'jotai';
import { RefObject } from 'react';

export default function calcTurn({
  outerGroupRef
}: {
  outerGroupRef: RefObject<THREE.Group>;
}) {
  const current = useAtomValue(currentAtom);
  const move = useAtomValue(moveAtom);
  useFrame((_, delta) => {
    if (!outerGroupRef || !outerGroupRef.current) return null;
    current.quat.setFromEuler(current.euler);
    outerGroupRef.current.quaternion.rotateTowards(
      current.quat,
      delta * move.turnSpeed
    );
  });
}

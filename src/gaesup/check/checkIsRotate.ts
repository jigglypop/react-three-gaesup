import { currentAtom } from '@gaesup/stores/current';
import { statesAtom } from '@gaesup/stores/states';
import { useFrame } from '@react-three/fiber';
import { useAtomValue } from 'jotai';
import { RefObject } from 'react';

export default function checkIsRotate({
  outerGroupRef
}: {
  outerGroupRef: RefObject<THREE.Group>;
}) {
  const states = useAtomValue(statesAtom);
  const current = useAtomValue(currentAtom);
  useFrame(() => {
    if (states.isMoving && outerGroupRef && outerGroupRef.current) {
      states.isRotated =
        Math.sin(outerGroupRef.current.rotation.y).toFixed(3) ===
        Math.sin(current.euler.y).toFixed(3);
    }
  });
}

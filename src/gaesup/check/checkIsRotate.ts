import { statesAtom } from '@gaesup/stores/states';
import { propType } from '@gaesup/type';
import { useFrame } from '@react-three/fiber';
import { useAtomValue } from 'jotai';

export default function checkIsRotate(prop: propType) {
  const states = useAtomValue(statesAtom);
  const { outerGroupRef, current } = prop;
  useFrame(() => {
    if (states.isMoving && outerGroupRef && outerGroupRef.current) {
      states.isRotated =
        Math.sin(outerGroupRef.current.rotation.y).toFixed(3) ===
        Math.sin(current.euler.y).toFixed(3);
    }
  });
}

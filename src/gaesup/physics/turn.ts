import { currentAtom } from '@gaesup/stores/current';
import { useFrame } from '@react-three/fiber';
import { useAtomValue } from 'jotai';
import { RefObject, useContext } from 'react';
import { ControllerContext } from '../stores/context';

export default function calcTurn({
  outerGroupRef
}: {
  outerGroupRef: RefObject<THREE.Group>;
}) {
  const { calc } = useContext(ControllerContext);
  const current = useAtomValue(currentAtom);

  useFrame((_, delta) => {
    // Rotate character model
    // 캐릭터 모델 회전
    current.quat.setFromEuler(current.euler);
    outerGroupRef.current!.quaternion.rotateTowards(
      current.quat,
      delta * calc.turnS
    );
  });
}

import { currentAtom } from '@gaesup/stores/current';
import { turnAtom } from '@gaesup/stores/turn';
import { useFrame } from '@react-three/fiber';
import { useAtomValue } from 'jotai';
import { RefObject } from 'react';

export default function calcTurn({
  outerGroupRef
}: {
  outerGroupRef: RefObject<THREE.Group>;
}) {
  const current = useAtomValue(currentAtom);
  const turn = useAtomValue(turnAtom);
  useFrame((_, delta) => {
    // Rotate character model
    // 캐릭터 모델 회전
    current.quat.setFromEuler(current.euler);
    outerGroupRef.current!.quaternion.rotateTowards(
      current.quat,
      delta * turn.accelSpeed
    );
  });
}

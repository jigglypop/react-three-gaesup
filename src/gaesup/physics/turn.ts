import { useFrame } from '@react-three/fiber';
import { RefObject, useContext } from 'react';
import { ControllerContext } from '../stores/context';

export default function calcTurn({
  outerGroupRef
}: {
  outerGroupRef: RefObject<THREE.Group>;
}) {
  const { model, calc } = useContext(ControllerContext);

  useFrame((_, delta) => {
    // Rotate character model
    // 캐릭터 모델 회전
    model.quat.setFromEuler(model.euler);
    outerGroupRef.current!.quaternion.rotateTowards(
      model.quat,
      delta * calc.turnS
    );
  });
}

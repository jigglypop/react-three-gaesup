import { propType } from '@gaesup/type';
import { useFrame } from '@react-three/fiber';

export default function calcTurn(prop: propType) {
  const { outerGroupRef, constant, current } = prop;
  const { turnSpeed } = constant;
  useFrame((_, delta) => {
    if (!outerGroupRef || !outerGroupRef.current) return null;
    current.quat.setFromEuler(current.euler);
    outerGroupRef.current.quaternion.rotateTowards(
      current.quat,
      delta * turnSpeed
    );
  });
}

import GaeSupProps from '@gaesup/stores/minimap/gaesupProps';
import { RigidBody } from '@react-three/rapier';

export default function Floor() {
  return (
    <GaeSupProps text='floor'>
      <RigidBody type='fixed'>
        <mesh receiveShadow position={[0, -3.5, 0]}>
          <boxGeometry args={[300, 5, 300]} />
          <meshStandardMaterial color='lightblue' />
        </mesh>
      </RigidBody>
    </GaeSupProps>
  );
}

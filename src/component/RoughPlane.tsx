import GaeSupProps from '@gaesup/stores/minimap/gaesupProps';
import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function RoughPlane() {
  // Load models
  const roughPlane = useGLTF('./roughPlane.glb');

  useEffect(() => {
    // Receive Shadows
    roughPlane.scene.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.receiveShadow = true;
      }
    });
  }, []);

  return (
    <GaeSupProps text='RoughPlane'>
      <RigidBody type='fixed' colliders='trimesh' position={[10, -1.2, 10]}>
        <primitive object={roughPlane.scene} />
      </RigidBody>
    </GaeSupProps>
  );
}

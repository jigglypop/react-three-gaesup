import { propType } from '@gaesup/type';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

/**
 * Follow camera initial setups from props
 * Load camera pivot and character move preset
 */
export default function camera(prop: propType) {
  const { camera } = useThree();
  const { constant, cameraRay } = prop;
  useEffect(() => {
    const origin = new THREE.Object3D();
    origin.position.set(0, 0, constant.cameraInitDirection);
    cameraRay.followCamera = origin;
    camera.position.set(0, 0, 0);
  }, []);
}

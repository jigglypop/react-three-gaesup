import { propType } from '@gaesup/type';
import { useThree } from '@react-three/fiber';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import * as THREE from 'three';
import { currentAtom } from './current';

/**
 * Follow camera initial setups from props
 * Load camera pivot and character move preset
 * 카메라 초기 설정
 * 카메라 피벗과 캐릭터 이동 설정
 */
export default function initSetting(prop: propType) {
  const current = useAtomValue(currentAtom);
  const { camera } = useThree();
  const { constant, cameraRay } = prop;
  useEffect(() => {
    current.euler.y = Math.PI;
    // Initialize camera facing direction
    const origin = new THREE.Object3D();
    origin.position.set(0, 0, constant.cameraInitDirection);
    cameraRay.followCamera = origin;
    camera.position.set(0, 0, 0);
  }, []);
}

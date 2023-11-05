import { currentCameraAtom } from '@gaesup/stores/camera';
import useCameraDetect from '@gaesup/stores/camera/useCameraDetect';
import { currentAtom } from '@gaesup/stores/current';
import { useFrame } from '@react-three/fiber';
import { vec3 } from '@react-three/rapier';
import { useAtomValue } from 'jotai';
import { useContext } from 'react';
import { ControllerContext } from '../stores/context';

/**
 * Camera movement
 * 카메라 이동
 * @returns void
 *
 */
export default function calcCamera() {
  const { calc } = useContext(ControllerContext);
  const currentCamera = useAtomValue(currentCameraAtom);
  const { cameraCollisionDetect } = useCameraDetect();
  const current = useAtomValue(currentAtom);
  useFrame((state, delta) => {
    currentCamera.pivot.position.lerp(
      vec3({
        x: current.position.x,
        y: current.position.y,
        z: current.position.z
      }),
      1 - Math.exp(-calc.camFollow * delta)
    );
    state.camera.lookAt(currentCamera.pivot.position);

    /**
     * Camera collision detect
     * 카메라 충돌 감지
     * @param delta
     */
    cameraCollisionDetect(delta);
  });
}

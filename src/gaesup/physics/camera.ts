import { currentCameraAtom } from '@gaesup/stores/camera/atom';
import useCameraDetect from '@gaesup/stores/camera/useCameraDetect';
import { currentAtom } from '@gaesup/stores/current';
import { useFrame } from '@react-three/fiber';
import { useAtomValue } from 'jotai';

/**
 * Camera movement
 * 카메라 이동
 * @returns void
 *
 */
export default function calcCamera() {
  const currentCamera = useAtomValue(currentCameraAtom);
  const { cameraCollisionDetect } = useCameraDetect();
  const current = useAtomValue(currentAtom);
  useFrame((state, delta) => {
    currentCamera.pivot.position.lerp(
      current.position,
      1 - Math.exp(-currentCamera.camFollow * delta)
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

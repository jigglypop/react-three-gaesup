// import { currentCameraAtom } from '@gaesup/stores/camera/atom';
import useCameraDetect from '@gaesup/stores/camera/useCameraDetect';
import { propType } from '@gaesup/type';
import { useFrame } from '@react-three/fiber';

/**
 * Camera movement
 * 카메라 이동
 * @returns void
 *
 */
export default function calcCamera(prop: propType) {
  const { current, cameraRay, constant } = prop;
  // const currentCamera = useAtomValue(currentCameraAtom);
  const { cameraCollisionDetect } = useCameraDetect(prop);
  useFrame((state, delta) => {
    cameraRay.pivot.position.lerp(
      current.position,
      1 - Math.exp(-constant.cameraCamFollow * delta)
    );
    state.camera.lookAt(cameraRay.pivot.position);

    /**
     * Camera collision detect
     * 카메라 충돌 감지
     * @param delta
     */
    cameraCollisionDetect(delta);
  });
}

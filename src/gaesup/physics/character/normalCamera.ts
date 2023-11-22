import checkCameraCollision from '@gaesup/check/checkCameraCollision';
import { currentAtom } from '@gaesup/stores/current';
import { propType } from '@gaesup/type';
import { useFrame } from '@react-three/fiber';
import { useAtomValue } from 'jotai';

/**
 * Camera movement
 * 카메라 이동
 * @returns void
 *
 */
export default function normalCamera(prop: propType) {
  const { cameraRay, constant } = prop;
  const current = useAtomValue(currentAtom);
  const { checkCollision } = checkCameraCollision(prop);
  useFrame((state, delta) => {
    cameraRay.pivot.position.lerp(
      current.position,
      1 - Math.exp(-constant.cameraCamFollow * delta)
    );
    state.camera.lookAt(cameraRay.pivot.position);
    /**
     * Camera collision detect
     */
    checkCollision(delta);
  });
}

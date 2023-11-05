import { useThree } from '@react-three/fiber';
import { useAtomValue } from 'jotai';
import { cameraInteractAtom, cameraRayAtom, currentCameraAtom } from './atom';

export default function useCameraDetect() {
  const { camera } = useThree();
  const currentCamera = useAtomValue(currentCameraAtom);
  const cameraRay = useAtomValue(cameraRayAtom);
  const cameraInteract = useAtomValue(cameraInteractAtom);

  const cameraCollisionDetect = (delta: number) => {
    cameraRay.origin.copy(currentCamera.pivot.position);
    camera.getWorldPosition(cameraRay.position);
    cameraRay.dir.subVectors(cameraRay.position, currentCamera.pivot.position);
    cameraInteract.intersects = cameraRay.rayCast!.intersectObjects(
      Object.values(cameraInteract.intersectObjectMap)
    );
    if (
      cameraInteract.intersects.length &&
      cameraInteract.intersects[0].distance <= -currentCamera.initDistance
    ) {
      currentCamera.minDistance =
        -cameraInteract.intersects[0].distance * currentCamera.collisionOff <
        -0.7
          ? -cameraInteract.intersects[0].distance * currentCamera.collisionOff
          : -0.7;
    } else {
      currentCamera.minDistance = currentCamera.initDistance;
    }
    // Update camera next lerping position, and lerp the camera
    cameraRay.lerpingPoint.set(
      currentCamera.followCamera.position.x,
      currentCamera.minDistance *
        Math.sin(-currentCamera.followCamera.rotation.x),
      currentCamera.minDistance *
        Math.cos(-currentCamera.followCamera.rotation.x)
    );

    currentCamera.followCamera.position.lerp(cameraRay.lerpingPoint, delta * 4); // delta * 2 for rapier ray setup
  };

  return { cameraCollisionDetect };
}

import { cameraRayAtom, currentCameraAtom } from '@gaesup/stores/camera';
import useCameraTraverse from '@gaesup/stores/camera/useCameraTraverse';
import { useThree } from '@react-three/fiber';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function useFollowCamera() {
  const { scene, camera } = useThree();
  // const { cameraRay, camera: currentCamera } = useContext(ControllerContext);
  const [currentCamera, setCurrentCamera] = useAtom(currentCameraAtom);
  const [cameraRay, setCameraRay] = useAtom(cameraRayAtom);

  /** Camera collison detect setups */
  // let cameraDistance: any = null;
  // let intersects: any = null;
  // let intersectObjects: THREE.Object3D[] = [];
  // const intersectObjects: THREE.Object3D[] = [];
  cameraRay.rayCast = new THREE.Raycaster(
    cameraRay.origin,
    cameraRay.dir,
    0,
    -currentCamera.maxDistance
  );
  // Rapier ray setup (optional)
  //   const onDocumentMouseMove = (e: MouseEvent) => {
  //     if (document.pointerLockElement) {
  //       pivot.rotation.y -= e.movementX * 0.002;
  //       const vy = followCam.rotation.x + e.movementY * 0.002;
  //       cameraDistance = followCam.position.length();
  //       if (vy >= -0.5 && vy <= 1.5) {
  //         followCam.rotation.x = vy;
  //         followCam.position.y = -cameraDistance * Math.sin(-vy);
  //         followCam.position.z = -cameraDistance * Math.cos(-vy);
  //       }
  //     }
  //     return false;
  //   };
  //
  //   // Mouse scroll event
  //   const onDocumentMouseWheel = (e: Event) => {
  //     if (document.pointerLockElement) {
  //       const vz = currentCamera.initDistance - (e as WheelEvent).deltaY * 0.002;
  //       const vy = followCam.rotation.x + (e as WheelEvent).movementY * 0.002;
  //
  //       if (vz >= currentCamera.maxDistance && vz <= currentCamera.minDistance) {
  //         currentCamera.initDistance = vz;
  //         followCam.position.z = currentCamera.initDistance * Math.cos(-vy);
  //         followCam.position.y = currentCamera.initDistance * Math.sin(-vy);
  //       }
  //     }
  //     return false;
  //   };

  // Custom traverse function
  // Prepare intersect objects for camera collision
  //   function customTraverse(object: THREE.Object3D) {
  //     if (object.userData && object.userData.camExcludeCollision === true) return;
  //     if (
  //       (object as THREE.Mesh).isMesh &&
  //       (object as THREE.Mesh).geometry.type !== 'InstancedBufferGeometry'
  //     ) {
  //       intersectObjects.push(object);
  //     }
  //
  //     // Recursively traverse child objects
  //     object.children.forEach((child) => {
  //       customTraverse(child); // Continue the traversal for all child objects
  //     });
  //   }
  const { customTraverse, intersectObjects } = useCameraTraverse();

  const cameraCollisionDetect = (delta: number) => {
    cameraRay.origin.copy(currentCamera.pivot.position);
    camera.getWorldPosition(cameraRay.position);
    cameraRay.dir.subVectors(cameraRay.position, currentCamera.pivot.position);
    cameraRay.intersects =
      cameraRay.rayCast!.intersectObjects(intersectObjects);
    if (
      cameraRay.intersects.length &&
      cameraRay.intersects[0].distance <= -currentCamera.initDistance
    ) {
      currentCamera.minDistance =
        -cameraRay.intersects[0].distance * currentCamera.collisionOff < -0.7
          ? -cameraRay.intersects[0].distance * currentCamera.collisionOff
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

  // Set camera position to (0,0,0)
  useEffect(() => {
    console.log('카메라 포지션 초기화');
    camera.position.set(0, 0, 0);
  }, []);

  useEffect(() => {
    // Prepare for camera ray intersect objects
    scene.children.forEach((child) => customTraverse(child));
    // Prepare for currentCamera.followCamera and currentCamera.pivot point
    currentCamera.followCamera.add(camera);
    currentCamera.pivot.add(currentCamera.followCamera);
    // document.addEventListener('mousemove', onDocumentMouseMove);
    // document.addEventListener('mousewheel', onDocumentMouseWheel);
    // return () => {
    //   document.removeEventListener('mousemove', onDocumentMouseMove);
    //   document.removeEventListener('mousewheel', onDocumentMouseWheel);
    // };
  });

  return {
    cameraCollisionDetect
  };
}

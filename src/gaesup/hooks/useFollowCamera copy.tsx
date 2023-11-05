import { cameraRayAtom, currentCameraAtom } from '@gaesup/stores/camera';
import { useThree } from '@react-three/fiber';
import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

export default function useFollowCamera() {
  const { scene, camera } = useThree();
  // const { cameraRay, camera: currentCamera } = useContext(ControllerContext);
  const [currentCamera, setCurrentCamera] = useAtom(currentCameraAtom);
  const [cameraRay, setCameraRay] = useAtom(cameraRayAtom);
  const pivot = useMemo(() => new THREE.Object3D(), []);
  const followCam = useMemo(() => {
    const origin = new THREE.Object3D();
    origin.position.set(0, 0, currentCamera.initDistance);
    return origin;
  }, []);

  /** Camera collison detect setups */
  // let smallestDistance: any = null;
  // let cameraDistance: any = null;
  let intersects: any = null;
  let intersectObjects: THREE.Object3D[] = [];
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
  function customTraverse(object: THREE.Object3D) {
    if (object.userData && object.userData.camExcludeCollision === true) return;
    if (
      (object as THREE.Mesh).isMesh &&
      (object as THREE.Mesh).geometry.type !== 'InstancedBufferGeometry'
    ) {
      intersectObjects.push(object);
    }

    // Recursively traverse child objects
    object.children.forEach((child) => {
      customTraverse(child); // Continue the traversal for all child objects
    });
  }

  const cameraCollisionDetect = (delta: number) => {
    cameraRay.origin.copy(pivot.position);
    camera.getWorldPosition(cameraRay.position);
    cameraRay.dir.subVectors(cameraRay.position, pivot.position);
    intersects = cameraRay.rayCast!.intersectObjects(intersectObjects);
    if (
      intersects.length &&
      intersects[0].distance <= -currentCamera.initDistance
    ) {
      smallestDistance =
        -intersects[0].distance * currentCamera.collisionOff < -0.7
          ? -intersects[0].distance * currentCamera.collisionOff
          : -0.7;
    } else {
      smallestDistance = currentCamera.initDistance;
    }
    // Update camera next lerping position, and lerp the camera
    cameraRay.lerpingPoint.set(
      followCam.position.x,
      smallestDistance * Math.sin(-followCam.rotation.x),
      smallestDistance * Math.cos(-followCam.rotation.x)
    );

    followCam.position.lerp(cameraRay.lerpingPoint, delta * 4); // delta * 2 for rapier ray setup
  };

  // Set camera position to (0,0,0)
  useEffect(() => {
    console.log('카메라 포지션 초기화');
    camera.position.set(0, 0, 0);
  }, []);

  useEffect(() => {
    // Prepare for camera ray intersect objects
    scene.children.forEach((child) => customTraverse(child));
    // Prepare for followCam and pivot point
    followCam.add(camera);
    pivot.add(followCam);
    // document.addEventListener('mousemove', onDocumentMouseMove);
    // document.addEventListener('mousewheel', onDocumentMouseWheel);
    // return () => {
    //   document.removeEventListener('mousemove', onDocumentMouseMove);
    //   document.removeEventListener('mousewheel', onDocumentMouseWheel);
    // };
  });

  return { pivot, followCam, cameraCollisionDetect };
}

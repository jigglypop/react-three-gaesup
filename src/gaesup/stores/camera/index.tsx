import { useThree } from '@react-three/fiber';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import * as THREE from 'three';
import { cameraInteractAtom, cameraRayAtom, currentCameraAtom } from './atom';
import { cameraPropsType, cameraRayPropsType } from './type';

export default function useCameraInit({
  cameraProps,
  cameraRayProps
}: {
  cameraProps: cameraPropsType;
  cameraRayProps: cameraRayPropsType;
}) {
  const { scene, camera } = useThree();
  const [currentCamera, setCurrentCamera] = useAtom(currentCameraAtom);
  const [cameraRay, setCameraRay] = useAtom(cameraRayAtom);
  const cameraInteract = useAtomValue(cameraInteractAtom);
  cameraRay.rayCast = new THREE.Raycaster(
    cameraRay.origin,
    cameraRay.dir,
    0,
    -currentCamera.maxDistance
  );

  const intersectObjectMap: { [uuid: string]: THREE.Object3D } = {};
  const getMeshs = (object: THREE.Object3D) => {
    if (object.userData && object.userData.camExcludeCollision) return;
    if (
      object instanceof THREE.Mesh &&
      object.geometry.type !== 'InstancedBufferGeometry'
    ) {
      intersectObjectMap[object.uuid] = object;
    }
    object.children.forEach((child) => {
      getMeshs(child); // Continue the traversal for all child objects
    });
  };

  const initCurrentCamera = (cameraProps: cameraPropsType) => {
    const origin = new THREE.Object3D();
    origin.position.set(
      0,
      0,
      cameraProps?.initDistance || currentCamera.initDistance
    );
    if (cameraProps) {
      setCurrentCamera({
        ...currentCamera,
        ...Object.assign(currentCamera, cameraProps),
        followCamera: origin
      });
    }
  };

  const initCameraRay = (cameraRayProps: cameraRayPropsType) => {
    setCameraRay({
      ...cameraRay,
      length: cameraRayProps?.length || cameraRay.length
    });
  };

  useEffect(() => {
    scene.children.forEach((child) => getMeshs(child));
    cameraInteract.intersectObjectMap = intersectObjectMap;
    currentCamera.followCamera.add(camera);
    currentCamera.pivot.add(currentCamera.followCamera);
  });

  // init
  useEffect(() => {
    initCurrentCamera(cameraProps);
    initCameraRay(cameraRayProps);
    camera.position.set(0, 0, 0);
  }, []);
}

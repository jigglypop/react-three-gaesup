import { propType } from '@gaesup/type';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function useCameraInit(prop: propType) {
  const { scene, camera } = useThree();
  const { constant, cameraRay } = prop;
  const { cameraMaxDistance, cameraInitDirection } = constant;
  cameraRay.rayCast = new THREE.Raycaster(
    cameraRay.origin,
    cameraRay.dir,
    0,
    -cameraMaxDistance
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

  const initCurrentCamera = () => {
    const origin = new THREE.Object3D();
    origin.position.set(0, 0, cameraInitDirection);
    cameraRay.followCamera = origin;
  };

  useEffect(() => {
    scene.children.forEach((child) => getMeshs(child));
    cameraRay.intersectObjectMap = intersectObjectMap;
    cameraRay.followCamera.add(camera);
    cameraRay.pivot.add(cameraRay.followCamera);
  });

  // init
  useEffect(() => {
    initCurrentCamera();
    camera.position.set(0, 0, 0);
  }, []);
}

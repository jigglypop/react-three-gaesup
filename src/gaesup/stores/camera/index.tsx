import { useThree } from '@react-three/fiber';
import { vec3 } from '@react-three/rapier';
import { atom, useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import * as THREE from 'three';

export type currentCameraAtomType = {
  initDistance: number;
  maxDistance: number;
  minDistance: number;
  initDirection: number;
  collisionOff: number;
  cameraDistance: number;
  followCamera: THREE.Object3D<THREE.Object3DEventMap>;
  pivot: THREE.Object3D;
};

export type cameraCollisionAtomType = {
  minDistance: number;
  cameraDistance: number;
  intersects: any;
  followCamera: THREE.Object3D;
  pivot: THREE.Object3D;
};

export type cameraPropsType = {
  initDistance: number;
  maxDistance: number;
  minDistance: number;
  initDirection: number;
  collisionOff: number;
};
export type cameraRayPropsType = {
  length: number;
};

export type cameraRayAtomType = {
  origin: THREE.Vector3;
  hit: THREE.Raycaster;
  rayCast: THREE.Raycaster | null;
  lerpingPoint: THREE.Vector3;
  length: number;
  dir: THREE.Vector3;
  position: THREE.Vector3;
};

export type cameraInteractAtomType = {
  intersects: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[];
  intersectObjects: THREE.Object3D[];
  intersectObjectMap: { [uuid: string]: THREE.Object3D };
};

export const cameraRayAtom = atom<cameraRayAtomType>({
  origin: vec3(),
  hit: new THREE.Raycaster(),
  rayCast: new THREE.Raycaster(vec3(), vec3(), 0, -7),
  lerpingPoint: vec3(),
  dir: vec3(),
  position: vec3(),
  length: -1
});

export const cameraInteractAtom = atom<cameraInteractAtomType>({
  intersects: [],
  intersectObjects: [],
  intersectObjectMap: {}
});

export const currentCameraAtom = atom<currentCameraAtomType>({
  initDistance: -5,
  maxDistance: -7,
  minDistance: -0.7,
  initDirection: 0,
  collisionOff: 0.7,
  cameraDistance: -1,
  followCamera: new THREE.Object3D(),
  pivot: new THREE.Object3D()
});

cameraRayAtom.debugLabel = 'camera_ray';
currentCameraAtom.debugLabel = 'current_camera';

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
    origin.position.set(0, 0, cameraProps.initDistance);
    setCurrentCamera({
      ...currentCamera,
      followCamera: origin,
      initDistance: cameraProps.initDistance || currentCamera.initDistance,
      maxDistance: cameraProps.maxDistance || currentCamera.maxDistance,
      minDistance: cameraProps.minDistance || currentCamera.minDistance,
      initDirection: cameraProps.initDirection || currentCamera.initDirection,
      collisionOff: cameraProps.collisionOff || currentCamera.collisionOff
    });
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

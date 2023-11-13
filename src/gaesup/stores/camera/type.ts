export type currentCameraAtomType = {
  initDistance: number;
  maxDistance: number;
  minDistance: number;
  initDirection: number;
  collisionOff: number;
  cameraDistance: number;
  followCamera: THREE.Object3D<THREE.Object3DEventMap>;
  pivot: THREE.Object3D;
  camFollow: number;
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

export type cameraRayType = {
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

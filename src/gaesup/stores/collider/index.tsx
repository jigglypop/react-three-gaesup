import { controllerType } from '@gaesup/type';
import { vec3 } from '@react-three/rapier';
import { atom, useAtom } from 'jotai';
import * as THREE from 'three';
export type colliderAtomType = {
  halfHeight: number;
  height: number;
  radius: number;
  diameter: number;
  rotation: [number, number, number];
};

export const colliderAtom = atom<colliderAtomType>({
  height: 0.7,
  halfHeight: 0.35,
  radius: 0.3,
  diameter: 0.6,
  rotation: [0, 0, 0]
});
colliderAtom.debugLabel = 'collider';

export function useColliderInit(scene: THREE.Object3D, props: controllerType) {
  const [collider, setcollider] = useAtom(colliderAtom);
  const box = new THREE.Box3().setFromObject(scene);
  const scale = props.character?.scale;

  const size = box.getSize(new THREE.Vector3());
  if (Array.isArray(scale)) {
    size.multiply(vec3({ x: scale[0], y: scale[1], z: scale[2] }));
  } else if (typeof scale === 'number') {
    size.multiplyScalar(scale);
  } else {
    size.multiplyScalar(1);
  }

  if (size.x !== 0 && size.y !== 0 && size.z !== 0) {
    const height = size.y / 2;
    const halfHeight = height / 2;
    const diameter = Math.max(size.x, size.z);
    const radius = diameter / 2;
    const ratio = height / (height + radius);
    setcollider({
      height: height * ratio,
      halfHeight: halfHeight * ratio,
      diameter,
      radius,
      rotation: [0, 0, 0]
    });
  }
  return { collider, setcollider };
}

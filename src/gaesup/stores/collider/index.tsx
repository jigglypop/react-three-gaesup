import { ControllerProps } from '@gaesup/type';
import { vec3 } from '@react-three/rapier';
import { atom, useAtom } from 'jotai';
import * as THREE from 'three';
export type colliderAtomType = {
  halfHeight: number;
  height: number;
  radius: number;
  diameter: number;
};

export const colliderAtom = atom<colliderAtomType>({
  height: 0.7,
  halfHeight: 0.35,
  radius: 0.3,
  diameter: 0.6
});
colliderAtom.debugLabel = 'collider';

export function useColliderInit(
  scene: THREE.Object3D,
  props: Omit<ControllerProps, 'animations'>
) {
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
    const halfHeight = size.y / 4;
    const radius = size.x / 2;
    setcollider({
      halfHeight,
      radius,
      diameter: radius * 2,
      height: halfHeight * 2
    });
  }
  return { collider, setcollider };
}

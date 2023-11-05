import { vec3 } from '@react-three/rapier';
import { atom, useAtom } from 'jotai';
import * as THREE from 'three';

export type standProps = {
  position: THREE.Vector3;
};

export const standAtom = atom<standProps>({
  position: vec3()
});

standAtom.debugLabel = 'stand';

export default function useStandInit() {
  const [stand, setStand] = useAtom(standAtom);
  return {
    stand,
    setStand
  };
}

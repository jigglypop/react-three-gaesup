import { vec3 } from '@react-three/rapier';
import { atom, useAtom } from 'jotai';
import * as THREE from 'three';

export type jumpProps = {
  mass: THREE.Vector3;
  velocity: THREE.Vector3;
  direction: THREE.Vector3;
  speed: number;
  rejectSpeed: number;
  gravity: number;
  maxSpeed: number;
};

export const jumpAtom = atom<jumpProps>({
  mass: vec3(),
  velocity: vec3(),
  direction: vec3(),
  speed: 4,
  rejectSpeed: 4,
  gravity: 10,
  maxSpeed: 2.5
});

jumpAtom.debugLabel = 'jump';

export default function useJumpInit() {
  const [jump, setJump] = useAtom(jumpAtom);
  return {
    jump,
    setJump
  };
}

import { vec3 } from '@react-three/rapier';
import { atom, useAtom } from 'jotai';
import * as THREE from 'three';

export type moveProps = {
  impulse: THREE.Vector3;
  direction: THREE.Vector3;
  accelation: THREE.Vector3;
  velocity: THREE.Vector3;
  dragForce: THREE.Vector3;
  VinDi: THREE.Vector3;
  delta: THREE.Vector3;
  velocityToLinev: THREE.Vector3;
  accelTimeDirection: number;
};

export const moveAtom = atom<moveProps>({
  impulse: vec3(),
  direction: vec3(),
  accelation: vec3(),
  velocity: vec3(),
  dragForce: vec3(),
  VinDi: vec3(),
  delta: vec3({ x: 0, y: 0.5, z: 0 }),
  velocityToLinev: vec3(),
  accelTimeDirection: 10
});

moveAtom.debugLabel = 'move';

export default function useMoveInit() {
  const [move, setMove] = useAtom(moveAtom);
  return {
    move,
    setMove
  };
}

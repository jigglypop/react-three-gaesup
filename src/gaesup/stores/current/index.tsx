import { currentType } from '@gaesup/type';
import { euler, quat, vec3 } from '@react-three/rapier';
import { atom } from 'jotai';

export const currentAtom = atom<currentType>({
  position: vec3(),
  standPosition: vec3(),
  velocity: vec3(),
  reverseVelocity: vec3(),
  quat: quat(),
  euler: euler()
});

currentAtom.debugPrivate = true;

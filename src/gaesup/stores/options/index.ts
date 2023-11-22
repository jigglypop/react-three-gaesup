import { optionsType } from '@gaesup/type';
import { atom } from 'jotai';

export const optionsAtom = atom<optionsType>({
  debug: false,
  mode: 'normal',
  controllerType: 'none',
  cameraCollisionType: 'transparent',
  camera: 'orbit',
  minimap: true,
  minimapRatio: 1,
  orbitCamera: {
    isFront: true,
    XZDistance: 5,
    YDistance: 1
  }
});

optionsAtom.debugLabel = 'options';

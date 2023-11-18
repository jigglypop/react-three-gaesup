import { optionsType } from '@gaesup/type';
import { atom } from 'jotai';

export const optionsAtom = atom<optionsType>({
  debug: false,
  mode: 'normal',
  controllerType: 'none',
  cameraCollisionType: 'transparent',
  minimap: true,
  minimapRatio: 1
});

optionsAtom.debugLabel = 'options';

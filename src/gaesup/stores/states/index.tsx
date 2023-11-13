import { atom } from 'jotai';

export type statesType = {
  isMoving: boolean;
  isNotMoving: boolean;
  isOnTheGround: boolean;
  isOnMoving: boolean;
  isRotated: boolean;
  isRunning: boolean;
  isJumping: boolean;
};

export const statesAtom = atom<statesType>({
  isMoving: false,
  isNotMoving: false,
  isOnTheGround: false,
  isOnMoving: false,
  isRotated: false,
  isRunning: false,
  isJumping: false
});
statesAtom.debugPrivate = true;

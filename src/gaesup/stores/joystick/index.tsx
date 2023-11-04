import { atom, useAtom } from 'jotai';

export type joyStickBallType = {
  x: string;
  y: string;
  position: string;
  background: string;
  boxShadow: string;
};

export type joyStickOriginType = {
  x: number;
  y: number;
  angle: number;
};

export type joyStickType = {
  ball: joyStickBallType;
  origin: joyStickOriginType;
};

export const JoyStickAtom = atom<joyStickType>({
  ball: {
    x: '50%',
    y: '50%',
    position: 'absolute',
    background: 'rgba(0, 0, 0, 0.5)',
    boxShadow: '0 0 10px  rgba(0, 0, 0, 0.5)'
  },
  origin: {
    x: 0,
    y: 0,
    angle: Math.PI / 2
  }
});
JoyStickAtom.debugLabel = 'JoyStick';

export default function useJoyStick() {
  const [JoyStick, setJoyStick] = useAtom(JoyStickAtom);
  const setBall = (ball: joyStickBallType) => {
    setJoyStick((JoyStick) => ({ ...JoyStick, ball: { ...ball } }));
  };

  const setOrigin = (origin: joyStickOriginType) => {
    setJoyStick((JoyStick) => ({ ...JoyStick, origin: { ...origin } }));
  };
  return {
    JoyStick,
    setJoyStick,
    setBall,
    setOrigin
  };
}

import { MouseEventHandler, useRef, useState } from 'react';
import * as style from './style.css';
import { vars } from '@styles/theme.css';
import useJoyStick from '@gaesup/stores/joystick';
import { useAtom } from 'jotai';
import { statesAtom } from '@gaesup/stores/states';

export default function JoyStick() {
  return (
    <div className={style.joyStick}>
      <JoyBall />
    </div>
  );
}

export function JoyBall() {
  const outerRef = useRef<HTMLDivElement>(null);
  const { JoyStick, setJoyStick, setBall, setOrigin } = useJoyStick();
  const { ball, origin } = JoyStick;
  const [states, setStates] = useAtom(statesAtom);

  const handleMouseOver: MouseEventHandler = (e) => {
    const outer = e.target as HTMLDivElement;
    const parent = outer.parentElement as HTMLDivElement;
    const { top, left, bottom, right, x, y, width, height } =
      parent.getBoundingClientRect();
    if (
      top > e.clientY ||
      bottom < e.pageY ||
      left > e.pageX ||
      right < e.pageX
    )
      return;
    setOrigin({
      x: left + width / 2,
      y: bottom - height / 2,
      angle: Math.atan2(
        e.pageY - (bottom - height / 2),
        e.pageX - (left + width / 2)
      )
    });

    setBall({
      x: `${e.pageX}px`,
      y: `${e.pageY}px`,
      position: 'fixed',
      background: vars.gradient.green,
      boxShadow: '0 0 10px rgba(99,251,215,1)'
    });
    setStates({
      ...states,
      isOnMoving: true
    });
  };
  const handleMouseOut = () => {
    setBall({
      x: '50%',
      y: '50%',
      position: 'absolute',
      background: 'rgba(0, 0, 0, 0.5)',
      boxShadow: '0 0 10px  rgba(0, 0, 0, 0.5)'
    });
    setStates({
      ...states,
      isOnMoving: false
    });
    console.log(states);
  };
  return (
    <div
      className={style.joyStickInner}
      ref={outerRef}
      onMouseOver={handleMouseOver}
      onMouseMove={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div
        style={{
          position: 'fixed',
          zIndex: 100000000000,
          width: '2px',
          height: '2px',
          background: 'red',
          top: origin.y,
          left: origin.x
        }}
      />
      {/* <h3>{JoyStick.origin.angle}</h3> */}
      <div
        className={`${style.joystickBall}`}
        style={{
          position: ball.position as 'fixed' | 'absolute',
          background: ball.background,
          boxShadow: ball.boxShadow,
          top: ball.y,
          left: ball.x
        }}
      />
    </div>
  );
}

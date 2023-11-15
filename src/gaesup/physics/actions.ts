import usePlay from '@gaesup/stores/animation';
import { currentAtom } from '@gaesup/stores/current';
import { statesAtom } from '@gaesup/stores/states';
import { propType } from '@gaesup/type';
import { useFrame } from '@react-three/fiber';
import { useAtomValue } from 'jotai';

/**
 * Actions for managing animations
 */

export default function calcActions(prop: propType) {
  const { outerGroupRef, animations, groundRay } = prop;
  const { playIdle, playWalk, playRun, playJump, playFall } = usePlay({
    outerGroupRef,
    animations
  });
  const states = useAtomValue(statesAtom);
  const current = useAtomValue(currentAtom);
  const { isNotMoving, isMoving, isJumping, isRunning, isAnimationOuter } =
    states;
  useFrame(() => {
    if (!isAnimationOuter) {
      if (isJumping) {
        playJump();
      } else if (isNotMoving) {
        playIdle();
      } else if (isRunning) {
        playRun();
      } else if (isMoving) {
        playWalk();
      }
      if (groundRay.hit === null && current.velocity.y < 0) {
        playFall();
      }
    }
  });
}

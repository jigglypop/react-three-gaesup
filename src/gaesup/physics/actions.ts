import usePlay from '@gaesup/stores/animation';
import { currentAtom } from '@gaesup/stores/current';
import { statesAtom } from '@gaesup/stores/states';
import { propType } from '@gaesup/type';
import { useFrame } from '@react-three/fiber';
import { useAtomValue } from 'jotai';

/**
 * Actions for managing animations
 * 애니메이션을 관리하기 위한 액션들
 * @param props
 * @param props.url GLTF file url
 * @param props.outerGroupRef Ref of the outer group of the character 캐릭터의 내부 그룹의 Ref
 *
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

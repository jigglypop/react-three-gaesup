import { AnimationTag } from '../type';
import { useGLTF, useAnimations } from '@react-three/drei';
import { RefObject, useCallback, useEffect, useState } from 'react';
import { GLTF } from 'three-stdlib';

/**
 * Actions for managing animations
 * 애니메이션을 관리하기 위한 액션들
 * @param props
 * @param props.url GLTF file url
 * @param props.outerGroupRef Ref of the outer group of the character 캐릭터의 내부 그룹의 Ref
 *
 */

export default function usePlay({
  url,
  outerGroupRef
}: {
  url: string;
  outerGroupRef?: RefObject<THREE.Group>;
}) {
  const { animations } = useGLTF(url) as GLTF;
  const { actions } = useAnimations(animations, outerGroupRef);
  const [ani, setAni] = useState('');
  // Animation set state
  const playAnimation = useCallback(
    (tag: keyof AnimationTag) => {
      setAni(tag);
    },
    [ani, setAni]
  );

  const resetAni = () => playAnimation('idle');
  const playIdle = () => playAnimation('idle');
  const playWalk = () => playAnimation('walk');
  const playRun = () => playAnimation('run');
  const playJump = () => playAnimation('jump');
  const playJumpIdle = () => playAnimation('jumpIdle');
  const playJumpLand = () => playAnimation('jumpLand');
  const playFall = () => playAnimation('fall');

  useEffect(() => {
    return () => {
      resetAni();
    };
  }, []);

  useEffect(() => {
    // Play animation
    const action = actions[ani]?.reset().fadeIn(0.2).play();
    return () => {
      // Fade out previous action
      action?.fadeOut(0.2);
    };
  }, [ani]);
  return {
    ani,
    setAni,
    playAnimation,
    resetAni,
    playIdle,
    playWalk,
    playRun,
    playJump,
    playJumpIdle,
    playJumpLand,
    playFall
  };
}

import { RefObject, useEffect } from 'react';

import { AnimationTag } from '@gaesup/type';
import { useAnimations, useGLTF } from '@react-three/drei';
import { atom, useAtom } from 'jotai';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

export type animationProps = {
  current: keyof AnimationTag;
};

export const animationAtom = atom<animationProps>({
  current: 'idle'
});

animationAtom.debugLabel = 'animation';

export default function usePlay({
  url,
  outerGroupRef
}: {
  url: string;
  outerGroupRef?: RefObject<THREE.Group>;
}) {
  const { animations } = useGLTF(url) as GLTF;
  const { actions } = useAnimations(animations, outerGroupRef);
  const [animation, setAnimation] = useAtom(animationAtom);
  // Animation set state
  const playAnimation = (tag: keyof AnimationTag) => {
    setAnimation({
      current: tag
    });
  };

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
    const action = actions[animation.current]?.reset().fadeIn(0.2).play();
    return () => {
      action?.fadeOut(0.2);
    };
  }, [animation.current]);
  return {
    current: animation.current,
    setAnimation,
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

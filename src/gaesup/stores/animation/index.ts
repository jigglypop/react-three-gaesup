import { RefObject, use, useCallback, useEffect, useMemo } from 'react';

import { vec3, RapierRigidBody, useRapier } from '@react-three/rapier';
import { RayColliderToi, Collider, Ray } from '@dimforge/rapier3d-compat';
import * as THREE from 'three';
import { atom, useAtom } from 'jotai';
import { rayDefault } from '../../props';
import { unwrap } from 'jotai/utils';
import { useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { AnimationTag } from '@gaesup/type';

export type animationProps = {
  current: keyof AnimationTag;
};

export const animationAtom = atom<animationProps>({
  current: 'idle'
});

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

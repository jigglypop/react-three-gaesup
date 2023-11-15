import {
  animationTagType,
  callbackPropType,
  controllerInnerType,
  propType
} from '@gaesup/type';
import { useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { animationAtom } from './animation';
import { currentAtom } from './current';
import { statesAtom } from './states';

export default function initCallback(
  props: controllerInnerType,
  prop: propType
) {
  const {
    outerGroupRef,
    animations,
    rigidBodyRef,
    slopeRayOriginRef,
    capsuleColliderRef
  } = prop;
  const current = useAtomValue(currentAtom);
  const states = useAtomValue(statesAtom);
  const { actions } = useAnimations(animations, outerGroupRef);
  const [animation, setAnimation] = useAtom(animationAtom);

  // Animation set state
  const playAnimation = (tag: keyof animationTagType) => {
    setAnimation((animation) => ({
      ...animation,
      current: tag
    }));
  };

  const controllerProp: callbackPropType = {
    ...prop,
    current,
    states
  };

  useEffect(() => {
    if (rigidBodyRef && rigidBodyRef.current) {
      current.refs.rigidBodyRef = rigidBodyRef;
    }
    if (outerGroupRef && outerGroupRef.current) {
      current.refs.outerGroupRef = outerGroupRef;
    }
    if (capsuleColliderRef && capsuleColliderRef.current) {
      current.refs.capsuleColliderRef = capsuleColliderRef;
    }
    if (slopeRayOriginRef && slopeRayOriginRef.current) {
      current.refs.slopeRayOriginRef = slopeRayOriginRef;
    }
  }, []);

  useEffect(() => {
    if (props.onReady) {
      props.onReady(controllerProp);
    }
    return () => {
      if (props.onDestory) {
        props.onDestory(controllerProp);
      }
    };
  }, []);

  useFrame((prop) => {
    if (props.onFrame) {
      props.onFrame({ ...controllerProp, ...prop });
    }
    if (props.onAnimate) {
      props.onAnimate({
        ...controllerProp,
        ...prop,
        actions,
        animation,
        playAnimation
      });
    }
  });
}

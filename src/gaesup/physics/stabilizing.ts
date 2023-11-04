import { RapierRigidBody, vec3 } from '@react-three/rapier';
import { RefObject, useContext, useEffect } from 'react';
import * as THREE from 'three';
import { stabilizeType } from '../type';
import { useFrame } from '@react-three/fiber';
import { ControllerContext } from '../stores/context';

/**
 *
 * @param rigidBody
 * @param stabilize
 * @returns
 *
 */

export type stabilizingType = {
  rigidBodyRef: RefObject<RapierRigidBody | null>;
};

export default function stabilizing({ rigidBodyRef }: stabilizingType) {
  const { stabilize } = useContext(ControllerContext);
  useFrame(() => {
    if (!rigidBodyRef || !rigidBodyRef.current) return null;
    const {
      strength,
      damping: { rotational, vertical }
    } = stabilize;
    const { x, y, z } = rigidBodyRef.current.rotation();
    const { x: avx, y: avy, z: avz } = rigidBodyRef.current.angvel();

    rigidBodyRef.current.applyTorqueImpulse(
      vec3().set(
        -strength * x - avx * rotational,
        -strength * y - avy * vertical,
        -strength * z - avz * rotational
      ),
      false
    );
  });

  useEffect(() => {
    if (rigidBodyRef.current)
      rigidBodyRef.current.setEnabledRotations(true, true, true, false);
  }, [stabilize]);
}
